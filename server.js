const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./graphql/type-defs");
const { resolvers } = require("./graphql/resolvers");
const { setContext } = require("./graphql/utils");
const port = 4000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => setContext(req),
});

server.applyMiddleware({ app });

app.listen({ port }, async () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
