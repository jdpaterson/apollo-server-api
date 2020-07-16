const { User, Todo } = require("../../models");
module.exports = {
  Query: {
    // Gets todos, if attributes are passed it applies them to the where clause
    // Currently where clause defaults to serching by equality (=)
    // Would need some extra logic to search by LIKE, >, <, etc...
    todos: async (parent, { todoAttributes }, context) =>
      await Todo.findAll({
        where: {
          ...todoAttributes,
        },
      }),
    users: async () => await User.findAll(),
  },
};
