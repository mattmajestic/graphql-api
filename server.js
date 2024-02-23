const { ApolloServer, gql } = require('apollo-server');

// Mock database
let mockDB = {
  items: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
};

// GraphQL schema
const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
  }

  type Mutation {
    addItem(name: String!): Item
  }
`;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  Query: {
    items: () => mockDB.items,
    item: (_, { id }) => mockDB.items.find(item => item.id == id),
  },
  Mutation: {
    addItem: (_, { name }) => {
      const newItem = { id: mockDB.items.length + 1, name };
      mockDB.items.push(newItem);
      return newItem;
    },
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
