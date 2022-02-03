const { ApolloServer } = require("apollo-server");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const mongoose = require('mongoose')
const Book = require('../models/book')
const Author = require('../models/author')
const User= require('../models/user')
const jwt = require('jsonwebtoken')
const MONGODB_URI = "mongodb://localhost/library"


console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
      console.log('connected to MongoDB')
  })
  .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
  })

const loadData = async () => {
    await Author.deleteMany({})
    await Book.deleteMany({})
    await User.deleteMany({})

    const user = new User({
        username: 'test',
        favoriteGenre: 'refactoring'
    })
    user.save()

    const rmartin = new Author({
        name: 'Robert Martin',
        born: 1952
    })

    rmartin.save((error) => {
        if (error) return handleError(error)

        const book1 = new Book ({
            title: 'Clean Code',
            published: 2008,
            author: rmartin._id,
            genres: ['refactoring']
        })
        book1.save((error) => {
            if (error) return handleError(error)
        })

        const book2 = new Book({
            title: 'Agile software development',
            published: 2002,
            author: rmartin._id,
            genres: ['agile', 'patterns', 'design']
        })
        book2.save((error) => {
            if (error) return handleError(error)
        })
    })

    const mfowler = Author({
        name: 'Martin Fowler',
        born: 1963
    })
    mfowler.save((error) => {
        if (error) return handleError(error)

        const book1 = new Book({
            title: 'Refactoring, edition 2',
            published: 2018,
            author: mfowler._id,
            genres: ['refactoring']
        })
        book1.save((error) => {
            if (error) return handleError(error)
        })
    })

    const dostoevsky = new Author({
        name: 'Fyodor Dostoevsky',
        born: 1821
    })
    dostoevsky.save((error) => {
        if (error) return handdleError(error)

        const book1 = new Book({
            title: 'Crime and Punishment',
            published: 1866,
            author: dostoevsky._id,
            genres: ['classic', 'crime']
        })
        book1.save((error) => {
            if (error) return handleError(error)
        })

        const book2 = new Book({
            title: 'The Demon',
            published: 1872,
            author: dostoevsky._id, 
            genres: ['classic', 'revolution']
        })
        book2.save((error) => {
            if (error) return handleError(error)
        })
    })

    const kerievsky = new Author({
        name: 'Joshua Kerievsky', // birthyear not known
    })
    kerievsky.save((error) => {
        if (error) return handleError(error)

        const book1 = new Book({
            title: 'Refactoring to patterns',
            published: 2008,
            author: kerievsky._id,
            genres: ['refactoring', 'patterns']
        })
        book1.save((error) => {
            if (error) return handleError(error)
        })
    })

    const smetz = new Author({
        name: 'Sandi Metz', // birthyear not known
    })
    smetz.save((error) => {
        if (error) return handleError(error)

        const book1 = new Book({
            title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
            published: 2012,
            author: smetz._id,
            genres: ['refactoring', 'design']
        })
        book1.save((error) => {
            if (error) return handleError(error)
        })
    })
}

loadData()

const typeDefs = require('./typedefs')
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )

            const currentUser = await (await User.findById(decodedToken.id))
            return { currentUser }
        }
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ] 
})

module.exports = server