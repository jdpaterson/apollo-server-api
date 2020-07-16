const { Query, Todo, User, Mutation } = require("./graphql/types");

module.exports = {
  resolvers: {
    Todo,
    User,
    Query,
    Mutation,
  },
};
