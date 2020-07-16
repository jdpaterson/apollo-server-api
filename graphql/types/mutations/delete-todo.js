const { ForbiddenError } = require("apollo-server");
const { Todo } = require("../../../models");

module.exports = {
  deleteTodo: async (parent, { todoId }, { user }) => {
    if (!user) throw new ForbiddenError("You must be logged in");
    console.log("ID: ", todoId);
    const dbTodo = await Todo.findByPk(todoId);
    if (dbTodo.ownerId != user.id)
      throw new ForbiddenError("A Todo can only be deleted by its owner");
    await dbTodo.destroy();
    return true;
  },
};
