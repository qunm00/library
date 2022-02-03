const Book = require('../models/book')
const Author = require('../models/author')
const User = require('../models/user')
const { UserInputError, AuthenticationError } = require('apollo-server-errors')
const jwt = require('jsonwebtoken')


const resolvers = {
  Author: {
    bookCount: async (root) => {
        return await Book.find({author: root._id}).countDocuments()
    }
  },

  Query: {
    me: async (root, args, context) => {
        console.log(context.currentUser)
        return await context.currentUser
    },
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        let filter = {}

        if (args.author) {
            console.log(args.author)
            await Author
                .find({name: args.author})
                .then(result => {
                    filter.author = result[0]._id
                })
        }

        if (args.genre) {
            filter.genres = args.genre
        }

        return await Book.find(filter).populate('author')
    },
    allAuthors: async () => await Author.find({}),
    allGenres: async () => {
        const books = await Book.find({})
        let genres = []
        books.forEach(book => {
            book.genres.forEach(genre => {
                if (!genres.includes(genre)) {
                    genres.push(genre)
                }
            })
        })
        return genres
    }
  },

  Mutation: {
    createUser: async (root, args) => {
        const user = new User({
            username: args.username,
            favoriteGenre: args.favoriteGenre
        })

        return await user.save()
            .catch(error => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            })
    },

    login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== 'secret') {
            throw new UserInputError('wrong credentials')
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },

    addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
            throw new AuthenticationError('not authenticated')
        }

        await Author
            .find({name: args.author})
            .then(result => args.author = result[0]._id)
        const book = new Book({ ...args})

        try {
            await book.save()
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
  
        return book.populate('author')
    },

    editAuthor: async (root, args) => {
        const currentUser = context.currentUser
        if (!currentUser) {
            throw new AuthenticationError('not authenticated')
        }

        const author = await Author.findOne({name: args.name})
        author.born = args.setBornTo
        
        try {
            await author.save()
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }

        return author
    }
  }
}

module.exports = resolvers