# reindex-starter-kit

Sample code to get started with Reindex, React and Relay.

Fork and clone the repository.

Install Reindex CLI library

```
npm install -g reindex-cli
```

Login to Reindex with your url and token

```
reindex login
```

Add your REINDEX_URL to `./src/config.js`.

```
export default {
  REINDEX_URL: 'YOUR-REINDEX-URL',
};
```

Install dependencies

```
npm install
```

Fetch current version of your GraphQL schema (you can add `ReindexSchema.json`)
to git after that. Also fetch Relay schema (saved as ./data/schema.json).

```
reindex schema-fetch
reindex schema-relay ./data/schema.json
```

Run and open on localhost:3000

```
npm start
```

Play with GraphiQL

```
reindex graphiql
```

Note that authentication will work only once you [enable authentication providers](https://www.reindex.io/docs/security/authentication/#social-login-authentication-providers)
inside your Reindex console.

## Deploying

Build minified js and css

```
npm run build
```

You can now push `public/` directory to your favorite static page hosting.
We recommend [Surge](https://www.surge.sh), but you can also use Github
Pages or any kind of hosting like that.

### Surge

With Surge CLI you can deploy your app with just a few commands:

```sh
npm install -g surge
surge
```
