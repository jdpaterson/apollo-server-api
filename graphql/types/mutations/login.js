const { v4: uuidv4 } = require("uuid");
const { AuthenticationError } = require("apollo-server");
const { User } = require("../../../models");

module.exports = {
  login: async (parent, { username, password }, context) => {
    const user = await User.findOne({
      username: username,
      password: password,
    });
    if (user) {
      await user.update({ authToken: uuidv4() });
      return user.authToken;
    } else {
      throw new AuthenticationError("login incorrect");
    }
  },
};
