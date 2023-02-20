export {
  isRefElement,
  isLinkElement,
  isMemberElement,
  isObjectElement,
  isArrayElement,
  isBooleanElement,
  isNullElement,
  isElement,
  isNumberElement,
  isStringElement,
} from '@swagger-api/apidom-core';

export { default as mediaTypes, JSONSchemaDraft7MediaTypes } from './media-types';

// eslint-disable-next-line no-restricted-exports
export { default } from './namespace';

export { default as refractorPluginReplaceEmptyElement } from './refractor/plugins/replace-empty-element';

export { default as refract, createRefractor } from './refractor';
export { default as specificationObj } from './refractor/specification';

export {
  isJSONReferenceElement,
  isJSONSchemaElement,
  isLinkDescriptionElement,
} from './predicates';

export {
  isJSONReferenceLikeElement,
  SpecificationVisitor,
  FallbackVisitor,
  FixedFieldsVisitor,
  PatternedFieldsVisitor,
  MapVisitor,
  AlternatingVisitor,
  ParentSchemaAwareVisitor,
} from '@swagger-api/apidom-ns-json-schema-draft-6';

export { keyMap, getNodeType } from './traversal/visitor';

/**
 * JSON Schema Draft 7 specification elements.
 */
export { JSONSchemaElement, LinkDescriptionElement } from './refractor/registration';
export { JSONReferenceElement } from '@swagger-api/apidom-ns-json-schema-draft-6';
