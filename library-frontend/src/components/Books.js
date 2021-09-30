import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!show) {
    return null
  }

  const allGenres = []
  
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre)
      }
    })
  })

  const filterByGenre = () => {
    if (selectedGenre) {
      return books.filter(book => {
        if (book.genres.includes(selectedGenre)) {
          return book
        } else {
          return null
        }
      })
    }

    return books
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
          {filterByGenre().map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {allGenres.map(genre =>
        <button onClick={() => setSelectedGenre(genre)} key={genre}>{genre}</button>
      )}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  )
}

export default Books