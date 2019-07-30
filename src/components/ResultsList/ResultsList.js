import React from 'react'
import './ResultsList.css'

export default function ResultsList(props) {
  const { results = [] } = props

  const renderResults = results => {
    return results.map((result, index) => {
      const { volumeInfo, saleInfo } = result
      
      const smallThumbnail = volumeInfo.imageLinks
        ? volumeInfo.imageLinks.smallThumbnail
        : 'https://via.placeholder.com/130x200?text=No+Image'

      const price =
        saleInfo.saleability === 'FOR_SALE'
          ? `$ ${saleInfo.retailPrice.amount}`
          : saleInfo.saleability

      const authors = volumeInfo.authors
        ? volumeInfo.authors.length > 1
          ? volumeInfo.authors.join(', ')
          : volumeInfo.authors
        : 'N/A'

      return (
        <li key={index}>
          <div className="volume-main">
            <img src={smallThumbnail} alt={volumeInfo.title} />
            <div className="volume-info">
              <h3 className="volume-title">{volumeInfo.title}</h3>
              <p>Author: {authors}</p>
              <p>Price: {price}</p>
              <br />
              <p className="volume-description">{volumeInfo.description}</p>
            </div>
          </div>
        </li>
      )
    })
  }

  return <ul className="results-list">{renderResults(results)}</ul>
}
