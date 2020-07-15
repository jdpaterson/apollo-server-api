const { todos, users } = require("./data");
const { v4: uuidv4 } = require("uuid");
const { AuthenticationError, ForbiddenError } = require("apollo-server");
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
      updateTodo: (parent, { todo }, { user }) => {
        if (!user) throw new AuthenticationError("You must be logged in");
        const dbTodoIndex = todos.findIndex((t) => t.id == todo.id);
        if (todos[dbTodoIndex].ownerId != user.id)
          throw new ForbiddenError("A Todo can only be updated by its owner");
        todos[dbTodoIndex] = { ...todos[dbTodoIndex], ...todo };
        return todos[dbTodoIndex];
      },
    },
  },
};
