const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Todo {
    id: Int
    title: String
    description: String
    author: String
    ownerId: Int
    owner: User
  }

  input TodoInput {
    id: Int
    title: String
    description: String
    author: String
    ownerId: Int
    owner: UserInput
  }

  type User {
    id: Int
    username: String
    password: String
    todos: [Todo]
    authToken: String #remove this, for testing only
  }

  input UserInput {
    id: Int
    username: String
    password: String
    todos: [TodoInput]
  }

  type Query {
    todos(todoAttributes: TodoInput): [Todo]
    users: [User]
  }

  type Mutation {
    login(username: String!, password: String!): String
    createTodo(todo: TodoInput!): Todo
    updateTodo(todo: TodoInput!): Todo
    deleteTodo(todoId: Int): Boolean
  }
`;

module.exports = {
  typeDefs,
};
