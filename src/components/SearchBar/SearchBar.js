import React, { useState } from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
  const { onSearch = () => {} } = props

  const [searchTerm, setSearchTerm] = useState('')
  const [printType, setPrintType] = useState('all')
  const [bookType, setBookType] = useState('no-filter')

  const handleSearch = e => {
    e.preventDefault()

    onSearch(searchTerm, printType, bookType)

    setSearchTerm('')
  }

  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={e => handleSearch(e)}>
        <div className="search-form__input">
          <input
            type="text"
            name="search-term"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </div>

        <div className="search-form__print-type">
          <label htmlFor="print-types">Print Types: </label>
          <select
            name="print-types"
            value={printType}
            onChange={e => setPrintType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="magazines">Magazines</option>
          </select>
        </div>

        <div className="search-form__book-type">
          <label htmlFor="book-types">Book Types: </label>
          <select
            name="book-types"
            value={bookType}
            onChange={e => setBookType(e.target.value)}
          >
            <option value="no-filter">No Filter</option>
            <option value="free-ebooks">Free eBooks</option>
            <option value="paid-ebooks">Paid eBooks</option>
            <option value="ebooks">Paid or Free eBooks</option>
          </select>
        </div>
      </form>
    </div>
  )
}
