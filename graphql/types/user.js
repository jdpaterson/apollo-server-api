module.exports = {
  User: {
    todos: async (user, {}, context) => await user.getTodos(),
  },
};
