# privacy-client

## Install

npm install -g privacy-client


## Example Usage

Set the environment variable `PRIVACY_API_KEY` and you can begin using the CLI tool.


```sh
privacy list-funding-accounts
```

You can use any API call documented here [https://privacy.com/developer/docs](https://privacy.com/developer/docs)

If you use the module as a library, you can create an instance of `new PrivacyClient(apiKey)` or `new SandboxPrivacyClient(apiKey)`

The object will expose each API method available in camelCase, the input object to the function is the camelCase variant of the parameter. The input to each function is always a single object.

If there is a REST parameter in a GET request, the camelCase variant of the key should be passed into the input object.

For POST requests, the input object to a given function should include an object with camelCase keys. Check the API docs for privacy.com to determine what those parameters can be.

The result of each API call method is the response object.

## Author
 
Raymond Pulver IV
