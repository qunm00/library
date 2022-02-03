import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendation from './components/Recommendation'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [username, setUsername] = useState('')
  const token = localStorage.getItem('user-token')

  const client = useApolloClient()
  console.log(client)
  const logout = () => {
    localStorage.clear()
    client.resetStore()
  }

  let authentication = null
  let loggedInUser = null
  if (token) {
    authentication = (
      <span>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommend</button>
        <button onClick={logout}>log out</button>
      </span>)
    loggedInUser = <p>Logged in as {username}</p>
  } else {
    authentication = <button onClick={() => setPage('log-in')}>log in</button>
  }

  return (
    <div>
      {loggedInUser}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {authentication}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'log-in'}
        setUser={setUsername}
      />

      <Recommendation
        show={page === 'recommended'}
      />

    </div>
  )
}

export default App