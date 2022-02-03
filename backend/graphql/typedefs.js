const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author  {
        name: String!
        born: Int 
        id: ID!
        bookCount: Int
    }
  
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]
    }
  
    type Query {
        me: User!
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        allGenres: [String]!
    }
  
    type Mutation {
        createUser (
            username: String!
            favoriteGenre: String!
        ): User

        login (
            username: String!
            password: String!
        ): Token

        addBook (
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book
  
        editAuthor (
            name: String!,
            setBornTo: Int!
        ): Author 
    }
`

module.exports = typeDefs