const { v4: uuidv4 } = require("uuid");
const { AuthenticationError, ForbiddenError } = require("apollo-server");
const { User, Todo } = require("./models");
module.exports = {
  resolvers: {
    Query: {
      todos: async () => {
        const todos = await Todo.findAll();
        return todos;
      },
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
