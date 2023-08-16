const { books, games, authors, reviews } = require("./_db");

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Game{
    id: ID!
    title:String!
    platform: [String!]!
    reviews: [Review!]
  }
  
  type Review{
   id:ID!
   rating:Int!
   content: String
   game: Game!
   author: Author!
 }

 type Author{
   id: ID!
   name: String!
   verified: Boolean!
   reviews: [Review!]
 }

 type Query{
   books: [Book]
   welcomeMessage(name:String, day:String):String
   reviews: [Review]
   review(id: ID!): Review
   games: [Game]
   game(id: ID!): Game
   authors: [Author]
   author(id: ID!): Author
}
 type Mutation{
   deleteGame(id:ID!):[Game]
}
`;

const resolvers = {
  Query: {
    books: () => books,
    welcomeMessage: (parent, args) => {
      console.log(args);
      return `Welcome to GraphQL, ${args.name}! Today is ${args.day}`;
    },
    games: () => games,
    game: (_, args) => games.find((g) => g.id === args.id),
    authors: () => authors,
    author: (_, args) => authors.find((a) => a.id === args.id),
    reviews: () => reviews,
    review: (_, args) => reviews.find((r) => r.id === args.id),
  },
  Game: {
    reviews(parent) {
      return reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return games.find((g) => g.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      games = games.filter((g) => g.id !== args.id);
      return games;
    },
  },
};

module.exports = { typeDefs, resolvers };
