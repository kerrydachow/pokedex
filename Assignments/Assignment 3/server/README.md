# Requirements
## .env
- Create a .env file in the root directory that contains:
    - `ACCESS_TOKEN_SECRET= <any-string>`
    - `REFRESH_TOKEN_SECRET= <any-string>`
    - `MONGO_CONNECTION_STRING= <mongodb-atlas-connection-string>`
# API Info
## Making API requests
- Currently only done through an API platform such as
    - ThunderClient
    - .rest file
    - Postman
## Getting Started
- Frontend server must be set to port `3000` to ensure proper user login and API analytics
- Set server.js line 28 `connectDatabase(stalePokemon=true);` stalePokemon=true to populate your database with Pokemon.
- Authentication / Login server is set to port `4001`
- API server is set to port `4000`
- After login use the auth-token-access JWT and set it in the requests' Headers as `auth-token-access`
    - `auth-token-access` expires in 30 seconds so you have to be quick!
    - createNewAccessToken request can be used with the `auth-token-refresh` provided after login to create a new `auth-token-access` without logging in again