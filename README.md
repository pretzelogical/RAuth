# RAuth

RAuth (pronounced roth) is a route level auth microservice using session authentication. It supports multiple levels of authentication. Initial roles can be describes in a json file

Default behavior is to block access of all routes unless RAUTH_RISKY_ROUTES env is set to true


## Env variables
Env variables that are booleanlike will take 0 as false and nonzero as true. They may also be set as the word true or false case insensitive.

### Available variables:
  - RAUTH_PORT[default = 3000]: integer number that will be the port RAUTH uses
  - RAUTH_RISKY_ROUTES[default = false]: Accept all undefined routes


## Examples of expected use

Legend:
  - endpoint: (flow?) (payload?) (method?) (name) (method?) (payload?) (flow?)
  - flow: <- || ->
  - method: GET || POST || PUT || DELETE || PATCH
  - payload: (object || header || cookie || html)
    - multiple: [ (payload), ..., ]
  - object: { ... }
  - header: |: ... :|
  - cookie: (| ... |)
  - html: < ... />


### User registering.
```
1.
Frontend/register <- GET Client
Frontend/register <RegisterPage /> => Client

2.
RAuth <- {
  "registerRequest": {
    "credentials": "Base64EncodedCredentials",
    "loginNow": true || false
  }
} POST Frontend/register <- [
|: Authorization: Basic Base64EncodedCredentials :|,
{
  "loginNow": true || false,
}
] POST Client

3.
RAuth {
  "registerResponse": {
    "authenticated": true || false
    "reason" : authenticated ? null : <Reason for rejection>,
    "sessiontoken": SessionToken
  }
} -> Frontend/register -> client
```
Accessing a protected resource.
```
1.
RAuth <- {
  "authRequest": {
    "requested": "Resource Identifier" || [ ..."Resource Identifier" ],
    "sessionToken": "SessionToken",
  }
} GET Frontend/posts <- (| Session: Client Session Token |) GET Client

2.
RAuth {
  "authResponse": {
    "authenticated": true || false,
    "requested": "Resource Identifier" || [ ..."Resource Identifier" ],
  }
} -> Frontend/posts <Requested resource/> -> Client
```
