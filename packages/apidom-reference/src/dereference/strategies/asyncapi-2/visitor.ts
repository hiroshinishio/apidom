import stampit from 'stampit';
import { propEq } from 'ramda';
import {
  isElement,
  isMemberElement,
  isPrimitiveElement,
  isStringElement,
  IdentityManager,
  cloneDeep,
  cloneShallow,
  visit,
  toValue,
  Element,
  BooleanElement,
  RefElement,
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  ChannelItemElement,
  getNodeType,
  isReferenceLikeElement,
  isBooleanJsonSchemaElement,
  isReferenceElement,
  keyMap,
  ReferenceElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import { Reference as IReference } from '../../../types';
import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError';
import MaximumResolveDepthError from '../../../errors/MaximumResolveDepthError';
import { AncestorLineage } from '../../util';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// initialize element identity manager
const identityManager = IdentityManager();

const AsyncApi2DereferenceVisitor = stampit({
  props: {
    indirections: [],
    namespace: null,
    reference: null,
    options: null,
    ancestors: null,
    refractCache: null,
  },
  init({
    indirections = [],
    reference,
    namespace,
    options,
    ancestors = new AncestorLineage(),
    refractCache = new Map(),
  }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
    this.refractCache = refractCache;
  },
  methods: {
    toBaseURI(uri: string): string {
      return url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));
    },

    async toReference(uri: string): Promise<IReference> {
      // detect maximum depth of resolution
      if (this.reference.depth >= this.options.resolve.maxDepth) {
        throw new MaximumResolveDepthError(
          `Maximum resolution depth of ${this.options.resolve.maxDepth} has been exceeded by file "${this.reference.uri}"`,
        );
      }

      const baseURI = this.toBaseURI(uri);
      const { refSet } = this.reference;

      // we've already processed this Reference in past
      if (refSet.has(baseURI)) {
        return refSet.find(propEq(baseURI, 'uri'));
      }

      const parseResult = await parse(url.unsanitize(baseURI), {
        ...this.options,
        parse: { ...this.options.parse, mediaType: 'text/plain' },
      });

      // register new mutable reference with a refSet
      const mutableReference = Reference({
        uri: baseURI,
        value: cloneDeep(parseResult),
        depth: this.reference.depth + 1,
      });
      refSet.add(mutableReference);

      if (this.options.dereference.immutable) {
        // register new immutable reference with a refSet
        const immutableReference = Reference({
          uri: `immutable://${baseURI}`,
          value: parseResult,
          depth: this.reference.depth + 1,
        });
        refSet.add(immutableReference);
      }

      return mutableReference;
    },

    toAncestorLineage(ancestors) {
      /**
       * Compute full ancestors lineage.
       * Ancestors are flatten to unwrap all Element instances.
       */
      const directAncestors = new Set<Element>(ancestors.filter(isElement));
      const ancestorsLineage = new AncestorLineage(...this.ancestors, directAncestors);

      return [ancestorsLineage, directAncestors];
    },

    async ReferenceElement(
      referencingElement: ReferenceElement,
      key: string | number,
      parent: Element | undefined,
      path: (string | number)[],
      ancestors: [Element | Element[]],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

      const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
      const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
      const isExternalReference = !isInternalReference;

      // ignore resolving internal Reference Objects
      if (!this.options.resolve.internal && isInternalReference) {
        // skip traversing this reference and all it's child elements
        return false;
      }
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isExternalReference) {
        // skip traversing this reference and all it's child elements
        return false;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic fragment
      let referencedElement = evaluate(jsonPointer, reference.value.result);
      referencedElement.id = identityManager.identify(referencedElement);

      /**
       * Applying semantics to a referenced element if semantics are missing.
       */
      if (isPrimitiveElement(referencedElement)) {
        const referencedElementType = toValue(referencingElement.meta.get('referenced-element'));
        const cacheKey = `${referencedElementType}-${toValue(identityManager.identify(referencedElement))}`;

        if (this.refractCache.has(cacheKey)) {
          referencedElement = this.refractCache.get(cacheKey);
        } else if (isReferenceLikeElement(referencedElement)) {
          // handling indirect references
          referencedElement = ReferenceElement.refract(referencedElement);
          referencedElement.setMetaProperty('referenced-element', referencedElementType);
          this.refractCache.set(cacheKey, referencedElement);
        } else {
          // handling direct references
          const ElementClass = this.namespace.getElementClass(referencedElementType);
          referencedElement = ElementClass.refract(referencedElement);
          this.refractCache.set(cacheKey, referencedElement);
        }
      }

      // detect direct or circular reference
      if (this.indirections.includes(referencedElement)) {
        throw new ApiDOMError('Recursive Reference Object detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // detect second deep dive into the same fragment and avoid it
      if (ancestorsLineage.includes(referencedElement)) {
        if (this.options.dereference.circular === 'error') {
          throw new ApiDOMError('Circular reference detected');
        } else if (this.options.dereference.circular !== 'ignore') {
          const refElement = new RefElement(referencedElement.id, {
            type: 'reference',
            uri: reference.uri,
            $ref: toValue(referencingElement.$ref),
          });
          const replacer =
            this.options.dereference.strategyOpts['asyncapi-2']?.circularReplacer ??
            this.options.dereference.circularReplacer;
          const replacement = replacer(refElement);

          if (isMemberElement(parent)) {
            parent.value = replacement; // eslint-disable-line no-param-reassign
          } else if (Array.isArray(parent)) {
            parent[key] = replacement; // eslint-disable-line no-param-reassign
          }

          reference.refSet.circular = true;

          return !parent ? replacement : false;
        }
      }

      /**
       * Dive deep into the fragment.
       *
       * Cases to consider:
       *  1. We're crossing document boundary
       *  2. Fragment is a Reference Object. We need to follow it to get the eventual value
       *  3. We are dereferencing the fragment lazily/eagerly depending on circular mode
       */
      if (
        isExternalReference ||
        isReferenceElement(referencedElement) ||
        ['error', 'replace'].includes(this.options.dereference.circular)
      ) {
        // append referencing reference to ancestors lineage
        directAncestors.add(referencingElement);

        const visitor = AsyncApi2DereferenceVisitor({
          reference,
          namespace: this.namespace,
          indirections: [...this.indirections],
          options: this.options,
          refractCache: this.refractCache,
          ancestors: ancestorsLineage,
        });
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        // remove referencing reference from ancestors lineage
        directAncestors.delete(referencingElement);
      }

      this.indirections.pop();

      // Boolean JSON Schemas
      if (isBooleanJsonSchemaElement(referencedElement as unknown)) {
        const booleanJsonSchemaElement: BooleanElement = cloneDeep(referencedElement);
        // annotate referenced element with info about original referencing element
        booleanJsonSchemaElement.setMetaProperty('ref-fields', {
          $ref: toValue(referencingElement.$ref),
        });
        // annotate referenced element with info about origin
        booleanJsonSchemaElement.setMetaProperty('ref-origin', reference.uri);
        // annotate fragment with info about referencing element
        booleanJsonSchemaElement.setMetaProperty(
          'ref-referencing-element-id',
          cloneDeep(identityManager.identify(referencingElement)),
        );

        return booleanJsonSchemaElement;
      }

      const mergedElement = cloneShallow(referencedElement);
      // assign unique id to merged element
      mergedElement.setMetaProperty('id', identityManager.generateId());

      // annotate referenced element with info about original referencing element
      mergedElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref),
      });
      // annotate fragment with info about origin
      mergedElement.setMetaProperty('ref-origin', reference.uri);
      // annotate fragment with info about referencing element
      mergedElement.setMetaProperty(
        'ref-referencing-element-id',
        cloneDeep(identityManager.identify(referencingElement)),
      );

      /**
       * Transclude referencing element with merged referenced element.
       */
      if (isMemberElement(parent)) {
        parent.value = mergedElement; // eslint-disable-line no-param-reassign
      } else if (Array.isArray(parent)) {
        parent[key] = mergedElement; // eslint-disable-line no-param-reassign
      }

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? mergedElement : false;
    },

    async ChannelItemElement(
      referencingElement: ChannelItemElement,
      key: string | number,
      parent: Element | undefined,
      path: (string | number)[],
      ancestors: [Element | Element[]],
    ) {
      // ignore ChannelItemElement without $ref field
      if (!isStringElement(referencingElement.$ref)) {
        return undefined;
      }

      const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

      const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
      const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
      const isExternalReference = !isInternalReference;

      // ignore resolving internal Channel Item Objects
      if (!this.options.resolve.internal && isInternalReference) {
        // skip traversing this channel item but traverse all it's child elements
        return undefined;
      }
      // ignore resolving external Channel Item Objects
      if (!this.options.resolve.external && isExternalReference) {
        // skip traversing this channel item but traverse all it's child elements
        return undefined;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic referenced element
      let referencedElement = evaluate(jsonPointer, reference.value.result);
      referencedElement.id = identityManager.identify(referencedElement);

      /**
       * Applying semantics to a referenced element if semantics are missing.
       */
      if (isPrimitiveElement(referencedElement)) {
        const cacheKey = `channel-${toValue(identityManager.identify(referencedElement))}`;

        if (this.refractCache.has(cacheKey)) {
          referencedElement = this.refractCache.get(cacheKey);
        } else {
          referencedElement = ChannelItemElement.refract(referencedElement);
          this.refractCache.set(cacheKey, referencedElement);
        }
      }

      // detect direct or indirect reference
      if (this.indirections.includes(referencedElement)) {
        throw new ApiDOMError('Recursive Channel Item Object reference detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // detect second deep dive into the same fragment and avoid it
      if (ancestorsLineage.includes(referencedElement)) {
        if (this.options.dereference.circular === 'error') {
          throw new ApiDOMError('Circular reference detected');
        } else if (this.options.dereference.circular !== 'ignore') {
          const refElement = new RefElement(referencedElement.id, {
            type: 'channel-item',
            uri: reference.uri,
            $ref: toValue(referencingElement.$ref),
          });
          const replacer =
            this.options.dereference.strategyOpts['asyncapi-2']?.circularReplacer ??
            this.options.dereference.circularReplacer;
          const replacement = replacer(refElement);

          if (isMemberElement(parent)) {
            parent.value = replacement; // eslint-disable-line no-param-reassign
          } else if (Array.isArray(parent)) {
            parent[key] = replacement; // eslint-disable-line no-param-reassign
          }

          reference.refSet.circular = true;

          return !parent ? replacement : false;
        }
      }

      /**
       * Dive deep into the fragment.
       *
       * Cases to consider:
       *  1. We're crossing document boundary
       *  2. Fragment is a Reference Object. We need to follow it to get the eventual value
       *  3. We are dereferencing the fragment lazily/eagerly depending on circular mode
       */
      if (
        isExternalReference ||
        isStringElement(referencedElement.$ref) ||
        ['error', 'replace'].includes(this.options.dereference.circular)
      ) {
        // append referencing reference to ancestors lineage
        directAncestors.add(referencingElement);

        const visitor = AsyncApi2DereferenceVisitor({
          reference,
          namespace: this.namespace,
          indirections: [...this.indirections],
          options: this.options,
          refractCache: this.refractCache,
          ancestors: ancestorsLineage,
        });
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        // remove referencing reference from ancestors lineage
        directAncestors.delete(referencingElement);
      }

      this.indirections.pop();

      // dive deep into the referenced element
      const visitor: any = AsyncApi2DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        ancestors: ancestorsLineage,
        refractCache: this.refractCache,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      // remove referencing channel item from ancestors lineage
      directAncestors.delete(referencingElement);

      this.indirections.pop();

      /**
       * Creating a new version of Channel Item by merging fields from referenced Channel Item with referencing one.
       */
      const mergedElement = new ChannelItemElement(
        [...referencedElement.content] as any,
        cloneDeep(referencedElement.meta),
        cloneDeep(referencedElement.attributes),
      );
      // assign unique id to merged element
      mergedElement.setMetaProperty('id', identityManager.generateId());
      // existing keywords from referencing ChannelItemElement overrides ones from referenced ChannelItemElement
      referencingElement.forEach((value: Element, keyElement: Element, item: Element) => {
        mergedElement.remove(toValue(keyElement));
        mergedElement.content.push(item);
      });
      mergedElement.remove('$ref');

      // annotate referenced element with info about original referencing element
      mergedElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref),
      });
      // annotate referenced with info about origin
      mergedElement.setMetaProperty('ref-origin', reference.uri);
      // annotate fragment with info about referencing element
      mergedElement.setMetaProperty(
        'ref-referencing-element-id',
        cloneDeep(identityManager.identify(referencingElement)),
      );

      /**
       * Transclude referencing element with merged referenced element.
       */
      if (isMemberElement(parent)) {
        parent.value = mergedElement; // eslint-disable-line no-param-reassign
      } else if (Array.isArray(parent)) {
        parent[key] = mergedElement; // eslint-disable-line no-param-reassign
      }

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? mergedElement : undefined;
    },
  },
});

export default AsyncApi2DereferenceVisitor;
