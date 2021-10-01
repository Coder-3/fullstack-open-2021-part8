import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, FAVORITE_GENRE } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const favoriteGenreResult = useQuery(FAVORITE_GENRE)
  const client = useApolloClient()
  
  if (authorsResult.loading || booksResult.loading || favoriteGenreResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        :
          <button onClick={() => setPage('login')}>login</button>}

      </div>

      <Authors
        show={page === 'authors'} authors={authorsResult.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={booksResult.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'} favoriteGenre={favoriteGenreResult.data.me.favoriteGenre} books={booksResult.data.allBooks}
      />

    </div>
  )
}

export default App