module.exports = {
  User: {
    // TODO: Figure out how to use DataLoader for hasMany relationships in node
    todos: async (user, args, context) => await user.getTodos(),
  },
};
