# reindex-starter-kit-react-auth0

Comprehensive Reindex starter kit with React, Relay and Auth0 for
Authentication. It also includes react-router-relay, so it's easy to add new
routes.

## Running

1. Install Reindex CLI and login

    ```sh
    npm install -g reindex-cli
    reindex login
    ```

2. Set up Auth0 in Reindex

    Open GraphiQL console

    ```sh
    reindex grapihql
    ```

    In GraphiQL create ReindexAuthenticationProvider for Auth0.

    ```graphql
    mutation {
      createReindexAuthenticationProvider(input: {
        type: auth0,
        isEnabled: true,
        domain: "YOUR-AUTH0-DOMAIN.auth0.com",
        clientId: "YOUR-AUTH0-CLIENT-ID",
        clientSecret: "YOUR-AUTH0-CLIENT-SECRET",
      }) {
        id
      }
    }
    ```

3. Install dependencies

    ```
    npm install
    ```

4. Edit `src/config.js` to include your Reindex and Auth0 credentials

    ```js
    export default {
      REINDEX_URL: 'https://YOUR-REINDEX-URL.myreindex.com',
      AUTH0_DOMAIN: 'YOUR-AUTH0-DOMAIN.auth0.com',
      AUTH0_CLIENT_ID: 'YOUR-AUTH0-CLIENT-ID',
    };
    ```

4. Get Relay JSON schema

   ```
   reindex schema-relay scripts/RelaySchema.json
   ```

5. Run development server

   ```
   npm start
   ```

    Go to `http://localhost:3000`

## Deploying

1. Build production version

    ```
    npm run build
    ```

2. You can now deploy `build/` folder to static hosting of your choice. We
recommend [surge.sh](https://surge.sh).

    ```
    npm install -g surge
    surge build/
    ```
