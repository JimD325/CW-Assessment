import Table from 'react-bootstrap/Table';
import './Table.css'
import React, { useState, useEffect } from "react";
import { PlanetModal } from '../modal/PlanetModal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Spinner } from 'react-bootstrap';
import { SearchForm } from '../search/SearchForm';
export function PlanetTable(props) {
  const [sortedData, setSortedData] = useState([]);
  const [populationSorted, setPopulationSorted] = useState([''])
  const [climateSorted, setClimateSorted] = useState([''])
  const [nameSorted, setNameSorted] = useState([''])

  const [selectedItem, setSelectedItem] = useState([])
  const [modalShow, setModalShow] = useState(false);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showAllItems, setShowAllItems] = useState(false)

  useEffect(() => {

    setSortedData(props.data.map(obj => handlePopulation(obj)))
  }, [props.data]);



  const handlePopulation = (obj) => {
    let population = obj.population
    if (population.toLowerCase() === "unknown") {
      obj.population = "0";
    } else {
      obj.population = population.replace(/[^\d]/g, "");
    }
    return obj;
  }

  const ascendingHandler = (param) => {
    setPage[1];
    let holder = sortedData.sort((a, b) => a[param] - b[param])

    if (param === 'population') {
      setPopulationSorted(['ascend'])
      setClimateSorted([''])
      setNameSorted([''])
    } else if (param === 'climate') {
      setClimateSorted(['ascend'])
      setNameSorted([''])
      setPopulationSorted([''])
    } else {
      setClimateSorted([''])
      setNameSorted([''])
      setPopulationSorted([''])
    }
    setSortedData([...holder]);
  }

  const descendingHandler = (param) => {
    setPage[1];
    let holder = sortedData.sort((a, b) =>
      b[param] - a[param]);
    // saves in state if and how parameters are sorted. This will conditionally change the sort buttons on the table.

    if (param === 'population') {
      setPopulationSorted(['descend'])
      setClimateSorted([''])
      setNameSorted([''])
    } else if (param === 'climate') {
      setClimateSorted(['descend'])
      setNameSorted([''])
      setPopulationSorted([''])
    } else {
      setClimateSorted([''])
      setNameSorted([''])
      setPopulationSorted([''])
    }
    setSortedData([...holder]);
  }

  const alphabeticalHandler = (param) => {
    setPage[1];
    setSortedData([...sortedData.sort((a, b) => a[param] > b[param] ? 1 : -1)])

    if (param === 'name') {
      setClimateSorted([''])
      setNameSorted(['descend'])
      setPopulationSorted([''])
    } else if (param === 'climate') {
      setClimateSorted(['descend'])
      setNameSorted([''])
      setPopulationSorted([''])
    } else {
      setClimateSorted([''])
      setNameSorted([''])
      setPopulationSorted([''])
    }


  }

  const revAlphabeticalHandler = (param) => {
    setPage[1];
    setSortedData([...sortedData.sort((a, b) => a[param] > b[param] ? -1 : 1)])
    if (param === 'name') {
      setClimateSorted([''])
      setNameSorted(['ascend'])
      setPopulationSorted([''])
    } else if (param === 'climate') {
      setClimateSorted(['ascend'])
      setNameSorted([''])
      setPopulationSorted([''])
    } else {
      setClimateSorted([''])
      setNameSorted([''])
      setPopulationSorted([''])
    }
  }

  const handleremove = (index) => {
    sortedData.splice(index, 1)
    setSortedData([...sortedData])
  }

  const handleFilterUnkowns = () => {
    let holder = sortedData.filter(obj => obj.population != 0).filter(obj => obj.climate != 'unknown');

    setSortedData([...holder])
  }

  const handleSelectItem = (obj) => {
    if (selectedItem.name) {
      setSelectedItem([])
      setModalShow([false])
    } else {
      setSelectedItem([obj]);
      setModalShow([true])
    }

  }

  const handlePageChange = (string) => {
    let holder = page
    if (string === '+' && (page * itemsPerPage) < sortedData.length) {
      holder = page + 1
    }
    else if (string === '-' && page > 1) {
      holder = page - 1
    }

    setPage(holder);
  }

  return (
    <>
      <SearchForm
        sortedData={sortedData}
        dataParam={props.dataParam}
        handleSelectItem={handleSelectItem}
        setSelectedItem={setSelectedItem}
      />
      {modalShow ? <PlanetModal
        selecteditem={selectedItem}
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleremove={() => handleremove()}
      /> : ''}
      <div id='TableContainer'>
        <div>

          <h1 id='TableTitle'>Planets</h1>
          {props.fetchingData ? <Spinner animation="border" variant="warning" /> :
            <Table
              id="Table">
              <thead>
                <tr>
                  <th>
                    <div id='TableHeaderTitle'>
                      Name
                    </div>
                  </th>
                  <th>Population
                  </th>
                  <th>Climate
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
                            onClick={() => alphabeticalHandler("name", "name")}
                           id="SettingsButton"
                          >
                            Sort A-Z</button> :
                          <button onClick={() => revAlphabeticalHandler("name", "name")}
                           id="SettingsButton"
                          > Sort Z-A</button>
                        }</Dropdown.Item>

                        <Dropdown.Item href="#/action-3"> {(populationSorted[0] !== 'descend') ?
                          <button onClick={() => descendingHandler("population")}
                           id="SettingsButton"
                          >
                            Most to Least</button> :
                          <button
                            onClick={() => ascendingHandler("population")}
                           id="SettingsButton"
                          >
                            Least to Most
                          </button>
                        } </Dropdown.Item>

                        <Dropdown.Item href="#/action-2">{(climateSorted[0] !== 'descend') ?
                          <button onClick={() => alphabeticalHandler("climate")}
                           id="SettingsButton"
                          >
                            Climate A-Z</button> :
                          <button onClick={() => revAlphabeticalHandler("climate")}
                           id="SettingsButton"
                          >
                            Climate Z-A
                          </button>
                        }</Dropdown.Item>


                        {/* <Dropdown.Item href="#/action-3"> <button onClick={handleUnits}
                       id="SettingsButton"
                        aria-label="Change Units">Change Units</button> </Dropdown.Item> */}
                        <Dropdown.Item href="#/action-3"> <button onClick={handleFilterUnkowns}
                         id="SettingsButton"
                          aria-label="Filter Unknowns">Remove Unknowns</button> </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </th>
                </tr>
              </thead>
              <tbody>
                {showAllItems == false ? sortedData.slice((page * itemsPerPage - itemsPerPage), (page * itemsPerPage)).map((obj, index) =>
                  <tr key={index}>
                    <td>
                      <button id='SelectDataButton'
                        onClick={() => handleSelectItem(obj)}>
                        {obj.name}
                      </button>
                    </td>
                    <td>{
                      (obj.population != 0) ? obj.population : 'unknown'
                    }
                    </td>
                    <td>
                      {obj.climate}</td>
                    <td id="removeButtonContainer">
                      <button id="removeButton"
                        onClick={() => handleRemove(index)}>
                        X
                      </button>
                    </td>
                  </tr>
                ) :
                  sortedData.map((obj, index) =>
                    <tr key={index}>
                      <td>
                        <button id='SelectDataButton'
                          onClick={() => handleSelectItem(obj)}>
                          {obj.name}
                        </button>
                      </td>
                      <td>{
                        (obj.population != 0) ? obj.population : 'unknown'
                      }
                      </td>
                      <td>
                        {obj.climate}</td>
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
          {/* pagination/show all buttons, conditionally rendered */} 
          {
              props.fetchingData ? '' :
               <div id="PageButtonsContainer">{page <= 1 || showAllItems ?
            <button id="PageButton" style={{ pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }}>
              Previous Page</button> :
            <button id="PageButton" onClick={() => handlePageChange('-')}>
              Previous Page
            </button>
          }
            {showAllItems ? <button id="PageButton" onClick={() => setShowAllItems(false)}>
              Page View
            </button> :
              <button id="PageButton" onClick={() => setShowAllItems(true)}>
                Show All
              </button>
            }
           
            {(page * itemsPerPage) > sortedData.length || showAllItems ?
              <button id="PageButton" style={{ pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }}>
                Next Page
              </button>
              :
              <button id="PageButton" onClick={() => handlePageChange('+')}>
                Next Page
              </button>

            }
          </div>
            }
         

        </div>
      </div>
    </>
  )
}
