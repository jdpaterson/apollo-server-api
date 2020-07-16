module.exports = {
  Todo: {
    owner: async (todo, args, { loaders }) =>
      await loaders.user.load(todo.ownerId),
  },
};
