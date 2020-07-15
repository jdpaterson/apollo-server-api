const { todos, users } = require("./data");
module.exports = {
  resolvers: {
    Query: {
      todos: () => todos,
      users: () => users,
    },
    Mutation: {
      login: async () => {
        return "Logged In";
      },
    },
  },
};
