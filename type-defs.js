const { gql } = require("apollo-server-express");
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Todo {
    id: Int
    title: String
    description: String
    author: String
    ownerId: Int
  }

  type User {
    id: Int
    username: String
    password: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    todos: [Todo]
    users: [User]
  }
  type Mutation {
    login(username: String!, password: String!): String
    updateTodo(todo: TodoInput!): Todo
  }

  input TodoInput {
    id: Int
    title: String
    description: String
    author: String
    ownerId: Int
  }
`;

module.exports = {
  typeDefs,
};
