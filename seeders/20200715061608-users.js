"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        username: "jbones",
        password: "1234",
        authToken: "7c9079df-bdfc-4508-9c32-af6ad1a6b12c",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "moons",
        password: "2345",
        authToken: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
