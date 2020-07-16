const { ForbiddenError } = require("apollo-server");
const { Todo } = require("../../../models");

module.exports = {
  createTodo: async (parent, { todo }, { user }) => {
    if (!user) throw new ForbiddenError("You must be logged in");
    return await Todo.create({ ...todo, ownerId: user.id });
  },
};
