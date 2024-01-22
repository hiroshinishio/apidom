export const testTemplate = '# {{artifactId}}\n' +
    '\n' +
    '{{appName}}\n' +
    '- API version: {{appVersion}}\n' +
    '{{^hideGenerationTimestamp}}\n' +
    '  - Build date: {{generatedDate}}\n' +
    '{{/hideGenerationTimestamp}}\n' +
    '\n' +
    '{{#appDescription}}{{{appDescription}}}{{/appDescription}}\n' +
    '\n' +
    '{{#infoUrl}}\n' +
    '  For more information, please visit [{{{infoUrl}}}]({{{infoUrl}}})\n' +
    '{{/infoUrl}}\n' +
    '\n' +
    '*Automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen)*\n' +
    '\n' +
    '\n' +
    '## Requirements\n' +
    '\n' +
    'Building the API client library requires:\n' +
    '1. Java 1.7+\n' +
    '2. Maven/Gradle\n' +
    '\n' +
    '## Installation\n' +
    '\n' +
    'To install the API client library to your local Maven repository, simply execute:\n' +
    '\n' +
    '```shell\n' +
    'mvn clean install\n' +
    '```\n' +
    '\n' +
    'To deploy it to a remote Maven repository instead, configure the settings of the repository and execute:\n' +
    '\n' +
    '```shell\n' +
    'mvn clean deploy\n' +
    '```\n' +
    '\n' +
    'Refer to the [OSSRH Guide](http://central.sonatype.org/pages/ossrh-guide.html) for more information.\n' +
    '\n' +
    '### Maven users\n' +
    '\n' +
    'Add this dependency to your project\'s POM:\n' +
    '\n' +
    '```xml\n' +
    '<dependency>\n' +
    '  <groupId>{{{groupId}}}</groupId>\n' +
    '  <artifactId>{{{artifactId}}}</artifactId>\n' +
    '  <version>{{{artifactVersion}}}</version>\n' +
    '  <scope>compile</scope>\n' +
    '</dependency>\n' +
    '```\n' +
    '\n' +
    '### Gradle users\n' +
    '\n' +
    'Add this dependency to your project\'s build file:\n' +
    '\n' +
    '```groovy\n' +
    'compile "{{{groupId}}}:{{{artifactId}}}:{{{artifactVersion}}}"\n' +
    '```\n' +
    '\n' +
    '### Others\n' +
    '\n' +
    'At first generate the JAR by executing:\n' +
    '\n' +
    '```shell\n' +
    'mvn clean package\n' +
    '```\n' +
    '\n' +
    'Then manually install the following JARs:\n' +
    '\n' +
    '* `target/{{{artifactId}}}-{{{artifactVersion}}}.jar`\n' +
    '* `target/lib/*.jar`\n' +
    '\n' +
    '## Getting Started\n' +
    '\n' +
    'Please follow the [installation](#installation) instruction and execute the following Java code:\n' +
    '\n' +
    '```java\n' +
    '{{#apiInfo}}{{#apis}}{{#@first}}{{#operations}}{{#operation}}{{#contents}}{{#@first}}\n' +
    'import {{{invokerPackage}}}.*;\n' +
    'import {{{invokerPackage}}}.auth.*;\n' +
    '{{#hasModel}}import {{modelPackage}}.*;{{/hasModel}}\n' +
    'import {{{package}}}.{{{classname}}};\n' +
    '\n' +
    'import java.io.File;\n' +
    'import java.util.*;\n' +
    '\n' +
    'public class {{{classname}}}Example {\n' +
    '\n' +
    '    public static void main(String[] args) {\n' +
    '        {{#hasAuthMethods}}ApiClient defaultClient = Configuration.getDefaultApiClient();\n' +
    '        {{#authMethods}}{{#isBasic}}\n' +
    '        // Configure HTTP basic authorization: {{{name}}}\n' +
    '        HttpBasicAuth {{{name}}} = (HttpBasicAuth) defaultClient.getAuthentication("{{{name}}}");\n' +
    '        {{{name}}}.setUsername("YOUR USERNAME");\n' +
    '        {{{name}}}.setPassword("YOUR PASSWORD");{{/isBasic}}{{#isApiKey}}\n' +
    '        // Configure API key authorization: {{{name}}}\n' +
    '        ApiKeyAuth {{{name}}} = (ApiKeyAuth) defaultClient.getAuthentication("{{{name}}}");\n' +
    '        {{{name}}}.setApiKey("YOUR API KEY");\n' +
    '        // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)\n' +
    '        //{{{name}}}.setApiKeyPrefix("Token");{{/isApiKey}}{{#isOAuth}}\n' +
    '        // Configure OAuth2 access token for authorization: {{{name}}}\n' +
    '        OAuth {{{name}}} = (OAuth) defaultClient.getAuthentication("{{{name}}}");\n' +
    '        {{{name}}}.setAccessToken("YOUR ACCESS TOKEN");{{/isOAuth}}\n' +
    '        {{/authMethods}}\n' +
    '        {{/hasAuthMethods}}\n' +
    '\n' +
    '        {{{classname}}} apiInstance = new {{{classname}}}();\n' +
    '        {{#allParams}}\n' +
    '        {{{dataType}}} {{{paramName}}} = {{{example}}}; // {{{dataType}}} | {{{description}}}\n' +
    '        {{/allParams}}\n' +
    '        try {\n' +
    '            {{#returnType}}{{{returnType}}} result = {{/returnType}}apiInstance.{{{operationId}}}({{#allParams}}{{{paramName}}}{{#hasMore}}, {{/hasMore}}{{/allParams}});{{#returnType}}\n' +
    '            System.out.println(result);{{/returnType}}\n' +
    '        } catch (ApiException e) {\n' +
    '            System.err.println("Exception when calling {{{classname}}}#{{{operationId}}}");\n' +
    '            e.printStackTrace();\n' +
    '        }\n' +
    '    }\n' +
    '}\n' +
    '{{/@first}}{{/contents}}{{/operation}}{{/operations}}{{/@first}}{{/apis}}{{/apiInfo}}\n' +
    '```\n' +
    '\n' +
    '## Documentation for API Endpoints\n' +
    '\n' +
    'All URIs are relative to *{{basePath}}*\n' +
    '\n' +
    'Class | Method | HTTP request | Description\n' +
    '------------ | ------------- | ------------- | -------------\n' +
    '{{#apiInfo}}{{#apis}}{{#operations}}{{#operation}}*{{#}}* | [**{{operationId}}**]({{apiDocPath}}{{classname}}.md#{{operationId}}) | **{{httpMethod}}** {{path}} | {{#summary}}{{summary}}{{/summary}}\n' +
    '{{/operation}}{{/operations}}{{/apis}}{{/apiInfo}}\n' +
    '\n' +
    '## Documentation for Models\n' +
    '\n' +
    '{{#models}}{{#model}} - [{{classname}}]({{modelDocPath}}{{classname}}.md)\n' +
    '{{/model}}{{/models}}\n' +
    '\n' +
    '## Documentation for Authorization\n' +
    '\n' +
    '{{^authMethods}}All endpoints do not require authorization.\n' +
    '{{/authMethods}}Authentication schemes defined for the API:\n' +
    '{{#authMethods}}### {{name}}\n' +
    '\n' +
    '{{#isApiKey}}- **Type**: API key\n' +
    '- **API key parameter name**: {{keyParamName}}\n' +
    '- **Location**: {{#isKeyInQuery}}URL query string{{/isKeyInQuery}}{{#isKeyInHeader}}HTTP header{{/isKeyInHeader}}\n' +
    '{{/isApiKey}}\n' +
    '{{#isBasic}}- **Type**: HTTP basic authentication\n' +
    '{{/isBasic}}\n' +
    '{{#isOAuth}}- **Type**: OAuth\n' +
    '- **Flow**: {{flow}}\n' +
    '- **Authorization URL**: {{authorizationUrl}}\n' +
    '- **Scopes**: {{^scopes}}N/A{{/scopes}}\n' +
    '{{#each scopes}}  - {{@key}}: {{this}}\n' +
    '{{/each}}\n' +
    '{{/isOAuth}}\n' +
    '\n' +
    '{{/authMethods}}\n' +
    '\n' +
    '## Recommendation\n' +
    '\n' +
    'It\'s recommended to create an instance of `ApiClient` per thread in a multithreaded environment to avoid any potential issues.\n' +
    '\n' +
    '## Author\n' +
    '\n' +
    '{{#apiInfo}}{{#apis}}{{^hasMore}}{{infoEmail}}\n' +
    '{{/hasMore}}{{/apis}}{{/apiInfo}}\n';