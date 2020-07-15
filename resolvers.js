const { todos, users } = require("./data");
const { v4: uuidv4 } = require("uuid");
const { AuthenticationError } = require("apollo-server");
module.exports = {
  resolvers: {
    Query: {
      todos: () => todos,
      users: () => users,
    },
    Mutation: {
      login: (parent, { username, password }, context) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          user.authToken = uuidv4();
          return user.authToken;
        } else {
          throw new AuthenticationError("login incorrect");
        }
      },
    },
  },
};
