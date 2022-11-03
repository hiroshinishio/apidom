const documentation = [
  {
    docs: '#### [Security Requirement Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#securityRequirementObject)\n\nLists the required security schemes to execute this operation.\nThe name used for each property MUST correspond to a security scheme declared in the [Security Schemes](https://www.asyncapi.com/docs/reference/specification/v2.5.0#componentsSecuritySchemes) under the [Components Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#componentsObject).\n\nWhen a list of Security Requirement Objects is defined on a [Server object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#serverObject), only one of the Security Requirement Objects in the list needs to be satisfied to authorize the connection.\n\n##### Patterned Fields\n\nField Pattern | Type | Description\n---|:---:|---\n{name} | [`string`] | Each name MUST correspond to a security scheme which is declared in the [Security Schemes](https://www.asyncapi.com/docs/reference/specification/v2.5.0#componentsSecuritySchemes) under the [Components Object](https://www.asyncapi.com/docs/reference/specification/v2.5.0#componentsObject). If the security scheme is of type `"oauth2"` or `"openIdConnect"`, then the value is a list of scope names. Provide scopes that are required to establish successful connection with the server. If scopes are not needed, the list can be empty. For other security scheme types, the array MUST be empty.\n\n##### Security Requirement Object Examples\n\n###### User/Password Security Requirement\n\n\n\\\nJSON\n```json\n{\n  "user_pass": []\n}\n```\n\n\n\\\nYAML\n```yaml\nuser_pass: []\n```\n\n###### API Key Security Requirement\n\n```json\n{\n  "api_key": []\n}\n```\n\n```yaml\napi_key: []\n```\n\n###### OAuth2 Security Requirement\n\n```json\n{\n  "petstore_auth": [\n    "write:pets",\n    "read:pets"\n  ]\n}\n```\n\n```yaml\npetstore_auth:\n- write:pets\n- read:pets\n```',
  },
];
export default documentation;
