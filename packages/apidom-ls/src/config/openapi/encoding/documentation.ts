const documentation = [
  {
    target: 'contentType',
    docs: 'The Content-Type for encoding a specific property. Default value depends on the property type: for `string` with `format` being `binary` – `application/octet-stream`; for other primitive types – `text/plain`; for `object` - `application/json`; for `array` – the default is defined based on the inner type. The value can be a specific media type (e.g. `application/json`), a wildcard media type (e.g. `image/*`), or a comma-separated list of the two types.',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'contentType',
    docs: 'The Content-Type for encoding a specific property. Default value depends on the property type: for `object` - `application/json`; for `array` – the default is defined based on the inner type; for all other cases the default is `application/octet-stream`. The value can be a specific media type (e.g. `application/json`), a wildcard media type (e.g. `image/*`), or a comma-separated list of the two types.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'headers',
    docs: 'Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#headerObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)]\n\\\n\\\nA map allowing additional information to be provided as headers, for example `Content-Disposition`. `Content-Type` is described separately and SHALL be ignored in this section. This property SHALL be ignored if the request body media type is not a `multipart`.',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'headers',
    docs: 'Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)]\n\\\n\\\nA map allowing additional information to be provided as headers, for example `Content-Disposition`. `Content-Type` is described separately and SHALL be ignored in this section. This property SHALL be ignored if the request body media type is not a `multipart`.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'style',
    docs: 'Describes how a specific property value will be serialized depending on its type.  See [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject) for details on the [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterStyle) property. The behavior follows the same values as `query` parameters, including default values. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded`.',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'style',
    docs: 'Describes how a specific property value will be serialized depending on its type.  See [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) for details on the [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) property. The behavior follows the same values as `query` parameters, including default values. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of [`contentType`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingContentType) (implicit or explicit) SHALL be ignored.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'explode',
    docs: 'When this is true, property values of type `array` or `object` generate separate parameters for each value of the array, or key-value-pair of the map.  For other types of properties this property has no effect. When [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#encodingStyle) is `form`, the default value is `true`. For all other styles, the default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded`.',
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'explode',
    docs: 'When this is true, property values of type `array` or `object` generate separate parameters for each value of the array, or key-value-pair of the map.  For other types of properties this property has no effect. When [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingStyle) is `form`, the default value is `true`. For all other styles, the default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of [`contentType`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingContentType) (implicit or explicit) SHALL be ignored.',
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    target: 'allowReserved',
    docs: "Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent-encoding. The default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded`.",
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    target: 'allowReserved',
    docs: "Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'() * +,;=` to be included without percent-encoding. The default value is `false`. This property SHALL be ignored if the request body media type is not `application / x - www - form - urlencoded` or `multipart / form - data`. If a value is explicitly defined, then the value of [`contentType`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingContentType) (implicit or explicit) SHALL be ignored.",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
  {
    docs: "#### [Encoding Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#encoding-object)\n\nA single encoding definition applied to a single schema property.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\ncontentType | `string` | The Content-Type for encoding a specific property. Default value depends on the property type: for `string` with `format` being `binary` – `application/octet-stream`; for other primitive types – `text/plain`; for `object` - `application/json`; for `array` – the default is defined based on the inner type. The value can be a specific media type (e.g. `application/json`), a wildcard media type (e.g. `image/*`), or a comma-separated list of the two types.\nheaders | Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#headerObject) \\| [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)] | A map allowing additional information to be provided as headers, for example `Content-Disposition`.  `Content-Type` is described separately and SHALL be ignored in this section. This property SHALL be ignored if the request body media type is not a `multipart`.\nstyle | `string` | Describes how a specific property value will be serialized depending on its type.  See [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterObject) for details on the [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#parameterStyle) property. The behavior follows the same values as `query` parameters, including default values. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded`.\nexplode | `boolean` | When this is true, property values of type `array` or `object` generate separate parameters for each value of the array, or key-value-pair of the map.  For other types of properties this property has no effect. When [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#encodingStyle) is `form`, the default value is `true`. For all other styles, the default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded`.\nallowReserved | `boolean` | Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent-encoding. The default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded`.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### Encoding Object Example\n\n\n\\\nYAML\n```yaml\nrequestBody:\n  content:\n    multipart/mixed:\n      schema:\n        type: object\n        properties:\n          id:\n            # default is text/plain\n            type: string\n            format: uuid\n          address:\n            # default is application/json\n            type: object\n            properties: {}\n          historyMetadata:\n            # need to declare XML format!\n            description: metadata in XML format\n            type: object\n            properties: {}\n          profileImage:\n            # default is application/octet-stream, need to declare an image type only!\n            type: string\n            format: binary\n      encoding:\n        historyMetadata:\n          # require XML Content-Type in utf-8 encoding\n          contentType: application/xml; charset=utf-8\n        profileImage:\n          # only accept png/jpeg\n          contentType: image/png, image/jpeg\n          headers:\n            X-Rate-Limit-Limit:\n              description: The number of allowed requests in the current period\n              schema:\n                type: integer\n```",
    targetSpecs: [
      { namespace: 'openapi', version: '3.0.0' },
      { namespace: 'openapi', version: '3.0.1' },
      { namespace: 'openapi', version: '3.0.2' },
      { namespace: 'openapi', version: '3.0.3' },
    ],
  },
  {
    docs: "#### [Encoding Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encoding-object)\n\nA single encoding definition applied to a single schema property.\n\n##### Fixed Fields\nField Name | Type | Description\n---|:---:|---\ncontentType | `string` | The Content-Type for encoding a specific property. Default value depends on the property type: for `object` - `application/json`;  for `array` – the default is defined based on the inner type; for all other cases the default is `application/octet-stream`. The value can be a specific media type (e.g. `application/json`), a wildcard media type (e.g. `image/*`), or a comma-separated list of the two types. \nheaders | Map[`string`, [Header Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#headerObject) &#124; [Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)] | A map allowing additional information to be provided as headers, for example `Content-Disposition`.  `Content-Type` is described separately and SHALL be ignored in this section. This property SHALL be ignored if the request body media type is not a `multipart`.\nstyle | `string` | Describes how a specific property value will be serialized depending on its type.  See [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterObject) for details on the [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#parameterStyle) property. The behavior follows the same values as `query` parameters, including default values. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of [`contentType`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingContentType) (implicit or explicit) SHALL be ignored.\nexplode | `boolean` | When this is true, property values of type `array` or `object` generate separate parameters for each value of the array, or key-value-pair of the map.  For other types of properties this property has no effect. When [`style`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingStyle) is `form`, the default value is `true`. For all other styles, the default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of [`contentType`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingContentType) (implicit or explicit) SHALL be ignored.\nallowReserved | `boolean` | Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent-encoding. The default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of [`contentType`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#encodingContentType) (implicit or explicit) SHALL be ignored.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Encoding Object Example\n\n\n\\\nYAML\n```yaml\nrequestBody: \n  content: \n    multipart / form - data: \n      schema: \n        type: object\n        properties: \n          id: \n            # default is text / plain\n            type: string\n            format: uuid\n          address: \n            # default is application / json\n            type: object\n            properties: { } \n          historyMetadata: \n            # need to declare XML format!\n            description: metadata in XML format\n            type: object\n            properties: { } \n          profileImage: { } \n      encoding: \n        historyMetadata: \n          # require XML Content - Type in utf - 8 encoding\n          contentType: application / xml; charset = utf - 8\n        profileImage: \n          # only accept png / jpeg\n          contentType: image / png, image / jpeg\n          headers: \n            X - Rate - Limit - Limit: \n              description: The number of allowed requests in the current period\n              schema: \n                type: integer\n```",
    targetSpecs: [{ namespace: 'openapi', version: '3.1.0' }],
  },
];

export default documentation;
