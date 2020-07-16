const DataLoader = require("dataloader");
const { User } = require("../models");
const { batchRecords } = require("./loaders/batch-records");

module.exports = {
  setContext: async (req) => {
    const authToken = req.headers["auth-token"];
    const context = {};
    // Set the user to context if authorization is passed to the header
    // Resolvers that require a user will throw an error if needed
    // Throw an error if auth is passed but no user found
    if (authToken) {
      const user = await User.findOne({ where: { authToken: authToken } });
      context.user = user;
    }
    context.loaders = {
      user: new DataLoader((keys) => batchRecords(keys, User)),
    };
    return context;
  },
};
