import Table from 'react-bootstrap/Table';
import './Table.css'
import React, { useState, useEffect } from "react";
import { FilmsModal } from '../modal/FilmsModal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Spinner } from 'react-bootstrap';
import { SearchForm } from '../search/SearchForm';
export function FilmsTable(props) {
  const [sortedData, setSortedData] = useState([]);
  const [ReleaseSorted, setReleaseSorted] = useState(['descend'])
  const [ChronologicalSorted, setChronologicalSorted] = useState([''])
  const [nameSorted, setNameSorted] = useState([''])

  const [selectedItem, setSelectedItem] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showAllItems, setShowAllItems] = useState(false)

  useEffect(() => {

    setSortedData(props.data)
  }, [props.data]);



  const ascendingHandler = (param) => {
    let holder = sortedData.sort((a, b) => a[param] - b[param])

    if (param === 'release_date') {
      setReleaseSorted(['ascend'])
      setChronologicalSorted([''])
      setNameSorted([''])
    } else if (param === 'episode_id') {
      setChronologicalSorted(['ascend'])
      setNameSorted([''])
      setReleaseSorted([''])
    } else {
      setChronologicalSorted([''])
      setNameSorted([''])
      setReleaseSorted([''])
    }
    setSortedData([...holder]);
  }

  const descendingHandler = (param) => {
    let holder = sortedData.sort((a, b) =>
      b[param] - a[param]);
    // saves in state if and how parameters are sorted. This will conditionally change the sort buttons on the table.

    if (param === 'release_date') {
      setReleaseSorted(['descend'])
      setChronologicalSorted([''])
      setNameSorted([''])
    } else if (param === 'episode_id') {
      setChronologicalSorted(['descend'])
      setNameSorted([''])
      setReleaseSorted([''])
    } else {
      setChronologicalSorted([''])
      setNameSorted([''])
      setReleaseSorted([''])
    }
    setSortedData([...holder]);
  }

  const alphabeticalHandler = (param) => {
    setSortedData([...sortedData.sort((a, b) => a[param] > b[param] ? 1 : -1)])

    if (param === 'title') {
      setChronologicalSorted([''])
      setNameSorted(['descend'])
      setReleaseSorted([''])
    } else if (param==='release_date'){
      setChronologicalSorted([''])
      setNameSorted([''])
      setReleaseSorted(['descend'])
    }
  }

  const revAlphabeticalHandler = (param) => {
    setSortedData([...sortedData.sort((a, b) => a[param] > b[param] ? -1 : 1)])
    if (param === 'title') {
      setChronologicalSorted([''])
      setNameSorted(['ascend'])
      setReleaseSorted([''])
    } else if (param==='release_date'){
      setChronologicalSorted([''])
      setNameSorted([''])
      setReleaseSorted(['ascend'])
    }
  }

  const handleRemove = (index) => {
    
      sortedData.splice(index, 1)
    setSortedData([...sortedData])
    
   
  }



  const handleSelectItem = (obj) => {
      setSelectedItem([obj]);
      setModalShow([true]);
  }

  return (
    <>
      <SearchForm
      sortedData={sortedData}
      dataParam={props.dataParam}
      handleSelectItem={handleSelectItem}
      setSelectedItem={setSelectedItem}
      />
      {modalShow ? <FilmsModal
        selecteditem={selectedItem}
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> : ''}
      <div id='TableContainer'>
        <div>

          <h1 id='TableTitle'>Films</h1>
          {props.fetchingData ? <Spinner animation="border" variant="warning" /> :
            <Table
              id="Table">
              <thead>
                <tr>
                  <th>
                    <div id='TableHeaderTitle'>
                      Title
                    </div>
                  </th>
                  <th>Chronological Order
                  </th>
                  <th>Released
                  </th>
                  <th>
                    {/* Settings Icon with sorts/filters */}
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="SettingsDropdown">
                        ⚙️
                      </Dropdown.Toggle>
                      <Dropdown.Menu>

                        <Dropdown.Item href="#/action-1">{(nameSorted[0] !== 'descend') ?
                          <button
                            onClick={() => alphabeticalHandler("title")}
                            id="SettingsButton"
                          >
                            Title: Sort A-Z</button> :
                          <button onClick={() => revAlphabeticalHandler("title")}
                            id="SettingsButton"
                          > Title: Sort Z-A</button>
                        }</Dropdown.Item>

                        <Dropdown.Item href="#/action-3"> {(ChronologicalSorted[0] !== 'descend') ?
                          <button onClick={() => descendingHandler("episode_id")}
                            id="SettingsButton"
                          >
                            Reverse Chronological Order</button> :
                          <button
                            onClick={() => ascendingHandler("episode_id")}
                            id="SettingsButton"
                          >
                            Chronological Order
                          </button>
                        } </Dropdown.Item>

                        <Dropdown.Item href="#/action-2">{(ReleaseSorted[0] !== 'descend') ?
                          <button onClick={() => alphabeticalHandler('release_date')}
                            id="SettingsButton"
                          >
                            Release : Oldest to Newest</button> :
                          <button onClick={() => revAlphabeticalHandler('release_date')}
                            id="SettingsButton"
                          >
                            Release: Newest to Oldest
                          </button>
                        }</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((obj, index) =>
                  <tr key={index}>
                    <td>
                      <button id='SelectDataButton'
                        onClick={() => handleSelectItem(obj)}>
                        {obj.title}
                      </button>
                    </td>
                    <td>{
                      (obj.episode_id != 0) ? obj.episode_id : 'unknown'
                    }
                    </td>
                    <td>
                      {obj.release_date}</td>
                    <td id="removeButtonContainer">
                      <button id="removeButton"
                        onClick={() => handleRemove(index)}>
                        X
                      </button>
                    </td>
                  </tr>
                )
                }
              </tbody>
            </Table>
          }
        </div>
      </div>
    </>
  )
}
