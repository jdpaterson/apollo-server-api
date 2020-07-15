const { AuthenticationError } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./type-defs");
const { resolvers } = require("./resolvers.js");
const { User } = require("./models");
const port = 4000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authToken = req.headers["auth-token"];
    // Set the user to context if authorization is passed to the header
    // Resolvers that require a user will throw an error if needed
    // Throw an error if auth is passed but no user found
    if (authToken) {
      const user = await User.findOne({ authToken: authToken });
      if (!user) throw new AuthenticationError("you must be logged in.");
      return {
        user,
      };
    }
  },
});

server.applyMiddleware({ app });

app.listen({ port }, async () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
