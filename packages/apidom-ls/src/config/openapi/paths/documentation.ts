import { OpenAPI2, OpenAPI30, OpenAPI31 } from '../target-specs';

const documentation = [
  {
    docs: '#### [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#paths-object)\n\nHolds the relative paths to the individual endpoints. The path is appended to the [`basePath`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerBasePath) in order to construct the full URL.\nThe Paths may be empty, due to [ACL constraints](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#securityFiltering).\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n/{path} | [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathItemObject) | A relative path to an individual endpoint. The field name MUST begin with a slash. The path is appended to the [`basePath`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#swaggerBasePath) in order to construct the full URL. [Path templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#pathTemplating) is allowed.\n^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/2.0.md#vendorExtensions) for further details.\n\n##### Paths Object Example\n\n```js\n{\n  "/pets": {\n    "get": {\n      "description": "Returns all pets from the system that the user has access to",\n      "produces": [\n        "application/json"\n      ],\n      "responses": {\n        "200": {\n          "description": "A list of pets.",\n          "schema": {\n            "type": "array",\n            "items": {\n              "$ref": "#/definitions/pet"\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\n/pets:\n  get:\n    description: Returns all pets from the system that the user has access to\n    produces:\n    - application/json\n    responses:\n      \'200\':\n        description: A list of pets.\n        schema:\n          type: array\n          items:\n            $ref: \'#/definitions/pet\'\n```',
    targetSpecs: OpenAPI2,
  },
  {
    docs: '#### [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathsObject)\n\nHolds the relative paths to the individual endpoints and their operations.\nThe path is appended to the URL from the [`Server Object`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject) in order to construct the full URL.  The Paths MAY be empty, due to [ACL constraints](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#securityFiltering).\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n/{path} | [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathItemObject) | A relative path to an individual endpoint. The field name MUST begin with a forward slash (`/`). The path is **appended** (no relative URL resolution) to the expanded URL from the [`Server Object`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#serverObject)\'s `url` field in order to construct the full URL. [Path templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#pathTemplating) is allowed. When matching URLs, concrete (non-templated) paths would be matched before their templated counterparts. Templated paths with the same hierarchy but different templated names MUST NOT exist as they are identical. In case of ambiguous matching, it\'s up to the tooling to decide which one to use.\n\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#specificationExtensions).\n\n##### Path Templating Matching\n\nAssuming the following paths, the concrete definition, `/pets/mine`, will be matched first if used:\n\n```\n  /pets/{petId}\n  /pets/mine\n```\n\nThe following paths are considered identical and invalid:\n\n```\n  /pets/{petId}\n  /pets/{name}\n```\n\nThe following may lead to ambiguous resolution:\n\n```\n  /{entity}/me\n  /books/{id}\n```\n\n##### Paths Object Example\n\n\n\\\nJSON\n```json\n{\n  "/pets": {\n    "get": {\n      "description": "Returns all pets from the system that the user has access to",\n      "responses": {\n        "200": {\n          "description": "A list of pets.",\n          "content": {\n            "application/json": {\n              "schema": {\n                "type": "array",\n                "items": {\n                  "$ref": "#/components/schemas/pet"\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\n/pets:\n  get:\n    description: Returns all pets from the system that the user has access to\n    responses:\n      \'200\':\n        description: A list of pets.\n        content:\n          application/json:\n            schema:\n              type: array\n              items:\n                $ref: \'#/components/schemas/pet\'\n```',
    targetSpecs: OpenAPI30,
  },
  {
    docs: '#### [Paths Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathsObject)\n\nHolds the relative paths to the individual endpoints and their operations. The path is appended to the URL from the [`Server Object`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) in order to construct the full URL. The Paths MAY be empty, due to [Access Control List (ACL) constraints](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#securityFiltering).\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n/{path} | [Path Item Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathItemObject) | A relative path to an individual endpoint. The field name MUST begin with a forward slash (`/`). The path is **appended** (no relative URL resolution) to the expanded URL from the [Server Object\'s](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverObject) `url` field in order to construct the full URL. [Path templating](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#pathTemplating) is allowed. When matching URLs, concrete(non-templated) paths would be matched before their templated counterparts. Templated paths with the same hierarchy but different templated names MUST NOT exist as they are identical.In case of ambiguous matching, it is up to the tooling to decide which one to use.\n\n\\\nThis object MAY be extended with [Specification Extensions](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#specificationExtensions).\n\n##### Path Templating Matching\n\n\n\\\nAssuming the following paths, the concrete definition, `/pets/mine`, will be matched first if used:\n\n\n```yaml\n  /pets/{petId}\n  /pets/mine\n```\n\n\nThe following paths are considered identical and invalid:\n\n\n```yaml\n  /pets/{petId}\n  /pets/{name}\n```\n\n\nThe following may lead to ambiguous resolution:\n\n```yaml\n  /{entity}/me\n  /books/{id}\n```\n\n##### Paths Object Example\n\n\n\\\nJSON\n```json\n{\n  "/pets": {\n    "get": {\n      "description": "Returns all pets from the system that the user has access to",\n      "responses": {\n        "200": {\n          "description": "A list of pets.",\n          "content": {\n            "application/json": {\n              "schema": {\n                "type": "array",\n                "items": {\n                  "$ref": "#/components/schemas/pet"\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n```\n\n\n\\\nYAML\n```yaml\n  /pets:\n    get:\n      description: Returns all pets from the system that the user has access to\n      responses:\n        \'200\':\n          description: A list of pets.\n          content:\n            application\\/ json:\n              schema:\n                type: array\n                items:\n                  $ref: \'#/components/schemas/pet\'\n```\n',
    targetSpecs: OpenAPI31,
  },
];

export default documentation;
