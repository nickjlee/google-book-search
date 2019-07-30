import React, { useState } from 'react'
import './App.css'
import Header from '../Header/Header'
import SearchBar from '../SearchBar/SearchBar'
import ResultsList from '../ResultsList/ResultsList'

const googleApiUrl = 'https://www.googleapis.com/books/v1/volumes'
// &filter=${this.state.printType}&bookType=${this.state.bookType}

function App() {
  const [results, setResults] = useState([])
  const [loadingText, setLoadingText] = useState('')
  const [error, setError] = useState(null)

  const buildParams = (searchTerm, printType, bookType) => {
    const q = `q=${searchTerm.split(' ').join('+')}`
    const pT = `printType=${printType}`
    const bT = bookType !== 'no-filter' ? `filter=${bookType}` : ''

    return `${q}&${pT}&${bT}`
  }

  const handleSearch = (searchTerm, printType, bookType) => {
    const params = buildParams(searchTerm, printType, bookType)

    setError(null)
    setLoadingText('Now Searching...')

    fetch(`${googleApiUrl}?${params}&key=${process.env.REACT_APP_API_KEY}`)
      .then(res =>
        res.ok ? res.json() : res.json().then(e => Promise.reject(e))
      )
      .then(data => {
        setLoadingText('')
        setResults(data.items)
      })
      .catch(err => {
        setLoadingText('')
        setError(err.error.message)
      })
  }

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {error && <p style={{ color: 'red', 'margin-top': '75px', 'font-size': '24px' }}>{error}</p>}
      <p className="loading-text">{loadingText}</p>
      <ResultsList results={results} />
    </div>
  )
}

export default App
