module.exports = {
  Todo: {
    owner: async (todo, {}, context) => await todo.getOwner(),
  },
};
