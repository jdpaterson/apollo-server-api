// export * from "./todo-type";
const { Query } = require("./query");
const { Todo } = require("./todo");
const { User } = require("./user");
const { Mutation } = require("./mutation");
module.exports = {
  Query,
  Mutation,
  Todo,
  User,
};
