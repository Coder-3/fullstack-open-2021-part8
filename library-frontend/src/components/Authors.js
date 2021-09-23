import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTH_YEAR, ALL_AUTHORS } from '../queries'

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ setBirthYear ] = useMutation(SET_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async event => {
    event.preventDefault()

    const setBornTo = Number(born)

    setBirthYear({
      variables: { name, setBornTo }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input 
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = ({ authors, show }) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthYear />
    </div>
  )
}

export default Authors
