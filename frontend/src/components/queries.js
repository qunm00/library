import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_GENRES = gql`
    query allGenres {
        allGenres
    }
`

export const CURRENT_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            title
            published
            author {
                name
                born
            }
            genres
        }
    }
`

export const ADD_BOOK = gql`
    mutation createBook (
        $title: String!
        $published: String!
        $author: String!
        $genres: [String]!
    ) {
        addBook (
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            published
            author
            genres
        }
    }
`

export const EDIT_BIRTHYEAR = gql`
    mutation editBirthYear($name: String!,$born: String!) {
        editAuthor (
            name: $name
            setBornTo: $born
        ) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login (
            username: $username,
            password: $password
        ) {
            value
        }
    }
`
