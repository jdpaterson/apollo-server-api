const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./type-defs");
const { resolvers } = require("./resolvers.js");

const port = 4000;
const app = express();

console.log({ test: "123" });
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
