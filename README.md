# VITALam Identity Service

## Description

A `Node.js` API to support communication to the [Substrate-based](https://www.substrate.io/) [`vitalam-node`](https://github.com/digicatapult/vitalam-node) (via [`polkadot-js/api`](https://www.npmjs.com/package/@polkadot/api)) and an [`IPFS`](https://ipfs.io/) node.

## Getting started

First, ensure you're running the correct [version](.node-version) of `npm`, then install dependencies using:

```
npm install
```

The API requires instances of [`vitalam-node`](https://github.com/digicatapult/vitalam-node).
To bring this up locally:

### `vitalam-node`

Clone [vitalam-node](https://github.com/digicatapult/vitalam-node) and follow the README to setup and build a local node. Then run the following in its root directory:

```
./target/release/vitalam-node --dev
```

## Environment Variables

`vitalam-identity-service` is configured primarily using environment variables as follows:

| variable                          | required |  default  | description                                                                                                          |
|:----------------------------------| :------: |:---------:|:---------------------------------------------------------------------------------------------------------------------|
| SERVICE_TYPE                      |    N     |  `info`   | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]                                 |
| PORT                              |    N     |  `3001`   | The port for the API to listen on                                                                                    |
| LOG_LEVEL                         |    N     |  `info`   | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]                                 |
| API_VERSION                       |    N     |     -     | API version                                                                                                          |
| API_MAJOR_VERSION                 |    N     |     -     | API major version                                                                                                    |
| API_HOST                          |    Y     |     -     | The hostname of the `vitalam-node` the API should connect to                                                         |
| API_PORT                          |    N     |  `9944`   | The port of the `vitalam-node` the API should connect to                                                             |
| LOG_LEVEL                         |    N     |  `info`   | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]                                 |
| USER_URI                          |    Y     |     -     | The Substrate `URI` representing the private key to use when making `vitalam-node` transactions                      |
| AUTH_JWKS_URI                     |    Y     |     -     | JSON Web Key Set containing public keys used by the Auth0 API e.g. `https://test.eu.auth0.com/.well-known/jwks.json` |
| AUTH_AUDIENCE                     |    Y     |     -     | Identifier of the Auth0 API                                                                                          |
| AUTH_ISSUER                       |    Y     |     -     | Domain of the Auth0 API e.g. `https://test.eu.auth0.com/`                                                            |
| AUTH_TOKEN_URL                    |    Y     |     -     | Auth0 API endpoint that issues an Authorisation (Bearer) access token e.g. `https://test.auth0.com/oauth/token`      |
| DB_HOST                           |    Y     |     -     | Hostname for the db                                                                                                  |
| DB_PORT                           |    N     |   5432    | Port to connect to the db                                                                                            |
| DB_NAME                           |    N     | `vitalam` | Name of the database to connect to                                                                                   |
| DB_USERNAME                       |    Y     |     -     | Username to connect to the database with                                                                             |
| DB_PASSWORD                       |    Y     |     -     | Password to connect to the database with                                                                             |

## Running the API

Having ensured dependencies are installed and running + the relevant environment variables are set, the API can be started in production mode with:

```
npm start
```

## API specification

### Authenticated endpoints

The rest of the endpoints in `vitalam-api` require authentication in the form of a header `'Authorization: Bearer YOUR_ACCESS_TOKEN'`:

1. [GET /members/](#GET-/members)
2. [GET /members/:address](#PUT-/members/:address)

The following endpoints are maintained for backwards compatibility:

### GET /members

The `address` parameter identifies the user running this process, and the `alias` representing a more friendly name version of this. The default value of the latter is null, and is optionally set.

```json
[
  {
    "address": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    "alias": "ALICE"
  }
]
```

### PUT /members/:address

The `address` parameter identifies the user running this process, and the `alias` representing a more friendly name version of this. The default value of the latter is null, and is optionally set.

```json
{
"address": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
"alias": "ALICE_UPDATED"
}
```