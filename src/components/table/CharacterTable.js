import Table from 'react-bootstrap/Table';
import './Table.css'
import React, { useState, useEffect } from "react";
import { CharacterModal } from '../modal/CharacterModal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Spinner } from 'react-bootstrap';
import { SearchForm } from '../search/SearchForm';
export function CharacterTable(props) {
  const [lengthUnits, setLengthUnits] = useState('cm')
  const [lengthMultiplier, setLengthMultiplier] = useState([1])
  const [weightUnits, setWeightUnits] = useState('kg')
  const [weightMultiplier, setWeightMultiplier] = useState([1])

  const [sortedData, setSortedData] = useState([]);
  const [heightSorted, setHeightSorted] = useState([''])
  const [weightSorted, setWeightSorted] = useState([''])
  const [nameSorted, setNameSorted] = useState([''])

  const [selectedItem, setSelectedItem] = useState([])
  const [modalShow, setModalShow] = useState(false);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showAllItems, setShowAllItems] = useState(false)

  useEffect(() => {
    //takes props and cleans mass/height propertyes and sets sorted data
    let sortedDataArr = props.data.map(obj => handleMass(obj)).map(obj => handleHeight(obj))
    setSortedData(sortedDataArr);
  }, [props.data]);




  const handleMass = (obj) => {
    let mass = obj.mass
    if (mass.toLowerCase() === "unknown") {
      obj.mass = "0";
    } else {
      obj.mass = mass.replace(/[^\d]/g, "");
    }
    return obj;
  }

  const handleHeight = (obj) => {
    let height = obj.height
    if (height.toLowerCase() === "unknown") {
      obj.height = "0";
    } else {
      obj.height = height.replace(/[^\d]/g, "");
    }
    return obj;
  }

  const ascendingHandler = (param) => {
    setPage[1];
    let holder = sortedData.sort((a, b) => a[param] - b[param])
  
    if (param === 'height') {
      setHeightSorted(['ascend'])
      setWeightSorted([''])
      setNameSorted([''])
    } else if (param === 'mass') {
      setWeightSorted(['ascend'])
      setNameSorted([''])
      setHeightSorted([''])
    } else {
      setWeightSorted([''])
      setNameSorted([''])
      setHeightSorted([''])
    }
    setSortedData([...holder]);

  }

  const descendingHandler = (param) => {
    setPage[1];
    let holder = sortedData.sort((a, b) =>
      b[param] - a[param]);
    // saves in state if and how parameters are sorted. This will conditionally change the sort buttons on the table.
  
    if (param === 'height') {
      setHeightSorted(['descend'])
      setWeightSorted([''])
      setNameSorted([''])

    } else if (param === 'mass') {
      setWeightSorted(['descend'])
      setNameSorted([''])
      setHeightSorted([''])
    } else {
      setWeightSorted([''])
      setNameSorted([''])
      setHeightSorted([''])
    }
    setSortedData([...holder]);

  }

  const alphabeticalHandler = (param) => {
    setPage[1];
    setSortedData([...sortedData.sort((a, b) => a[param] > b[param] ? 1 : -1)])
    setWeightSorted([''])
    setNameSorted(['descend'])
    setHeightSorted([''])

  }

  const revAlphabeticalHandler = (param) => {
    setPage[1];
    setSortedData([...sortedData.sort((a, b) => a[param] > b[param] ? -1 : 1)])
    setWeightSorted([''])
    setNameSorted(['ascend'])
    setHeightSorted([''])

  }

  const handleWeightUnits = () => {
    if (weightUnits === 'kg') {
      setWeightUnits('lb')
      setWeightMultiplier(2.205)
    }
    else if (weightUnits === 'lb') {
      setWeightUnits('kg')
      setWeightMultiplier(1)
    }
    else {
      setWeightUnits('kg')
      setWeightMultiplier(1)
    }
  }

  const handleLengthUnits = () => {
    if (lengthUnits === 'cm') {
      setLengthUnits('in')
      setLengthMultiplier(1 / 2.54)
    }
    else if (lengthUnits === 'in') {
      setLengthUnits('cm')
      setLengthMultiplier(1)
    }
    else {
      setLengthUnits('cm')
      setLengthMultiplier(1)
    }
  }

  const handleUnits = () => {
    handleWeightUnits();
    handleLengthUnits();
  }

  const handleremove = (index) => {
    sortedData.splice(index, 1)
    setSortedData([...sortedData])
  }

  const handleFilterUnkowns = () => {
    let holder = sortedData.filter(obj => obj.mass != 0).filter(obj => obj.height != 0);
    
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
      {modalShow ? <CharacterModal
        selecteditem={selectedItem}
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> : ''}
      <div id='TableContainer'>
        <h1 id='TableTitle'>Characters</h1>
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
                <th>Height ({lengthUnits})
                </th>
                <th>Weight ({weightUnits})
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
                          id="SettingsButton"
                          onClick={() => alphabeticalHandler("name")}
                        >
                          Sort A-Z</button> :
                        <button 
                        id="SettingsButton"
                        onClick={() => revAlphabeticalHandler("name")}
                        > Sort Z-A</button>
                      }</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">{(heightSorted[0] !== 'descend') ?
                        <button 
                        id="SettingsButton"
                        onClick={() => descendingHandler("height")}
                        >
                          Tallest to Shortest</button> :
                        <button onClick={() => ascendingHandler("height")}
                        id="SettingsButton"
                        >
                          Shortest to Tallest
                        </button>
                      }</Dropdown.Item>
                      <Dropdown.Item href="#/action-3"> {(weightSorted[0] !== 'descend') ?
                        <button onClick={() => descendingHandler("mass")}
                          id="SettingsButton"
                        >
                          Heaviest to Lightest</button> :
                        <button
                          onClick={() => ascendingHandler("mass")}
                          id="SettingsButton"
                        >
                          Lightest to Heaviest
                        </button>
                      } </Dropdown.Item>
                      <Dropdown.Item href="#/action-3"> <button onClick={handleUnits}
                        id="SettingsButton"
                        aria-label="Change Units">Change Units</button> </Dropdown.Item>
                      <Dropdown.Item href="#/action-3"> <button onClick={handleFilterUnkowns}
                        id="SettingsButton"
                        aria-label="Filter Unknowns">Remove Unknowns</button> </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </th>
              </tr>
            </thead>
            <tbody>
              {showAllItems == false ?
                // paginated
                sortedData.slice((page * itemsPerPage - itemsPerPage), (page * itemsPerPage)).map((obj, index) =>
                  <tr key={index}>
                    <td>
                      <button id='SelectDataButton'
                        onClick={() => handleSelectItem(obj)}>
                        {obj.name}
                      </button>
                    </td>
                    <td>{
                      (obj.height != 0) ? Math.round(obj.height * lengthMultiplier) : 'unknown'
                    }
                    </td>
                    <td>
                      {(obj.mass != 0) ? Math.round(obj.mass * weightMultiplier) : 'unknown'}</td>
                    <td id="removeButtonContainer">
                      <button id="removeButton"
                        onClick={() => handleremove(index)}>
                        X
                      </button>
                    </td>
                  </tr>
                ) :
                // see all
                sortedData.map((obj, index) =>
                  <tr key={index}>
                    <td>
                      <button id='SelectDataButton'
                        onClick={() => handleSelectItem(obj)}>
                        {obj.name}
                      </button>
                    </td>
                    <td>{
                      (obj.height != 0) ? Math.round(obj.height * lengthMultiplier) : 'unknown'
                    }
                    </td>
                    <td>
                      {(obj.mass != 0) ? Math.round(obj.mass * weightMultiplier) : 'unknown'}</td>
                    <td id="removeButtonContainer">
                      <button id="removeButton"
                        onClick={() => handleremove(index)}>
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
        {props.fetchingData ? '' :
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
    </>
  )
}
