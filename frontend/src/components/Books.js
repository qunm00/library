import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from './queries'

const Books = (props) => {
  const { data, refetch } = useQuery(ALL_BOOKS)

  const allGenres = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  const books = data.allBooks
  const genres = allGenres.data.allGenres

  const filteredBooks = (event) => {
    refetch({
      author: null,
      genre: event.target.value 
    })
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={filteredBooks}>all genres</button>
      {genres.map(genre => 
        <button key={genre} onClick={filteredBooks} value={genre}>{genre}</button>
      )}
    </div>
  )
}

export default Books