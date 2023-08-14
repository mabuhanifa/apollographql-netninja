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
};

module.exports = { typeDefs, resolvers };
