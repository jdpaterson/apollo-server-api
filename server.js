const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./type-defs");
const { resolvers } = require("./resolvers.js");
const { users } = require("./data");

const port = 4000;
const app = express();

const getUserByToken = (userToken) => {
  if (userToken) {
    return users.find((u) => u.token === userToken);
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Set the user to context if authorization is passed to the header
    // Resolvers that require a user will throw an error if needed
    // Throw an error if auth is passed but no user found
    if (req.headers.authToken) {
      const user = getUserByToken(req.headers.authorization);
      if (!user) throw new AuthenticationError("you must be logged in 123");
      return {
        user,
      };
    }
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
