const { v4: uuidv4 } = require("uuid");
const { AuthenticationError, ForbiddenError } = require("apollo-server");
const { User, Todo } = require("./models");

module.exports = {
  resolvers: {
    Todo: {
      owner: async (parent, {}, context) => await parent.getOwner(),
    },
    User: {
      todos: async (parent, {}, context) => await parent.getTodos(),
    },
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
    Mutation: {
      login: async (parent, { username, password }, context) => {
        const user = await User.findOne({
          username: username,
          password: password,
        });
        if (user) {
          await user.update({ authToken: uuidv4() });
          return user.authToken;
        } else {
          throw new AuthenticationError("login incorrect");
        }
      },
      updateTodo: async (parent, { todo }, { user }) => {
        if (!user) throw new AuthenticationError("You must be logged in");
        const dbTodo = await Todo.findByPk(todo.id);
        if (dbTodo.ownerId != user.id)
          throw new ForbiddenError("A Todo can only be updated by its owner");
        await dbTodo.update({ ...todo });
        return dbTodo;
      },
    },
  },
};
