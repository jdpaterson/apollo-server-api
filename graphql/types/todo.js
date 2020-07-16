const DataLoader = require("dataloader");
const { User } = require("../../models");

const batchUsers = async (keys) => {
  const users = await User.findAll({
    where: {
      id: keys,
    },
  });
  return keys.map((key) => users.find((user) => user.id === key));
};

module.exports = {
  Todo: {
    owner: async (todo, args, { loaders }) =>
      await loaders.user.load(todo.ownerId),
  },
};
