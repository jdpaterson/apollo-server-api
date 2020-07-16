const { Todo } = require("../../../models");
const { ForbiddenError } = require("apollo-server");

module.exports = {
  updateTodo: async (parent, { todo }, { user }) => {
    if (!user) throw new ForbiddenError("You must be logged in");
    const dbTodo = await Todo.findByPk(todo.id);
    if (dbTodo.ownerId != user.id)
      throw new ForbiddenError("A Todo can only be updated by its owner");
    await dbTodo.update({ ...todo });
    return dbTodo;
  },
};
