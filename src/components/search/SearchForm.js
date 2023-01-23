import React, { useState, useEffect } from 'react';
import './search.css'
export const SearchForm = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    searchByName(searchValue);
  }


  const searchByName = () => {
    if (props.dataParam != 'films') {
      let holder = props.sortedData.find(element => element.name === searchValue);
      if (holder) {
        props.handleSelectItem(holder)
      } else {
        setSearchValue('We could not find a match')
      }
    } else {
      let holder = props.sortedData.find(element => element.title === searchValue);
      if (holder) {
        props.handleSelectItem(holder)
      } else {
        setSearchValue('We could not find a match')
      }

    }
  }

  useEffect(() => {
    if (props.dataParam === 'planets') {
      setPlaceholderText("Search for a planet")
    } else if (props.dataParam === 'films') {
      setPlaceholderText("Find a film")
    } else if (props.dataParam === 'people') {
      setPlaceholderText("Find a character")
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} id='SearchForm'>
      <div className="form-group" style={{ backgroundColor: 'black', color: 'gold' }}>
        <input
          type="text"
          className="form-control"
          placeholder={placeholderText}
          style={{ backgroundColor: 'black', color: 'gold' }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <button type="submit" id="MainButton" style={{ backgroundColor: 'gold', color: 'black' }}>Search</button>
    </form>
  )
}

