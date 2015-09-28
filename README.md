# reindex-starter-kit

Sample code to get started with Reindex, React and Relay.

Fork and clone the repository.

Install dependencies

```
npm install
```

Set `REINDEX_URL` env variable to be your be your Reindex app url. Set
`REINDEX_TOKEN` to be your Reindex admin token.

```
export REINDEX_URL="https://YOUR-REINDEX-APP.myreindex.com"
export REINDEX_TOKEN="YOUR-REINDEX-TOKEN"
```

Fetch current version of your GraphQL schema (you can add `ReindexSchema.json`)
to git after that. Also fetch Relay schema (saved as ./data/schema.json).

```
npm run schema-fetch
npm run schema-relay
```

Run and open on localhost:3000

```
npm start
```

Play with GraphiQL

```
npm run graphiql
```

Note that authentication will work only once you enable authentication providers
inside your Reindex console.

## Deploying

Build minified js and css

```
npm run build
```

You can now push `public/` directory to your favorite static page hosting.
We recommend [Divshot](https://www.divshot.com), but you can also use Github
Pages or any kind of hosting like that.

### Divshot

Initialize your app with `public/` set as a root directory and push.

```
$ divshot init
name: <YOUR APP NAME>
root directory: (current) public
clean urls: (y/n) y
error page: (error.html)
Would you like to create an app on Divshot from this app?: (y/n) y
$ divshot push
```
