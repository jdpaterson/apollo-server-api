"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Todos", [
      {
        title: "Harry Potter and the Chamber of Secrets",
        description: "J.K. Rowling",
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Jurassic Park",
        description: "Michael Crichton",
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete("Todos", null, {});
    };
  },
};
