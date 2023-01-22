import Table from 'react-bootstrap/Table';
import './Table.css'
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MainModal } from '../modal/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

export function TableComponent(props) {
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

  useEffect(() => {
    //takes props and cleans mass/height propertyes and sets sorted data
    setSortedData(props.data.map(obj => handleMass(obj)).map(obj => handleHeight(obj)))
  }, [props.data]);
  console.log("sortedData on table", sortedData)
  const handleMass = (obj) => {
    let mass = obj.mass || "";
    if (mass.toLowerCase() === "unknown") {
      obj.mass = "0";
    } else {
      obj.mass = mass.replace(/[^\d]/g, "");
    }
    return obj;
  }
  const handleHeight = (obj) => {
    let height = obj.height || "";
    if (height.toLowerCase() === "unknown") {
      obj.height = "0";
    } else {
      obj.height = height.replace(/[^\d]/g, "");
    }
    return obj;
  }

  const ascendingHandler = (param) => {

    let holder = sortedData.sort((a, b) => a[param] - b[param])
    // console.log(`ascending ${param}`)
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
    let holder = sortedData.sort((a, b) =>
      b[param] - a[param]);
    // saves in state if and how parameters are sorted. This will conditionally change the sort buttons on the table.
    // console.log(`descending ${param}`)
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
    setSortedData([...sortedData.sort((a, b) => a[param] > b[param] ? 1 : -1)])
    setWeightSorted([''])
    setNameSorted(['descend'])
    setHeightSorted([''])

  }

  const revAlphabeticalHandler = (param) => {
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

  const handleRemove = (index) => {
    sortedData.splice(index, 1)
    setSortedData([...sortedData])
  }
  const handleFilterUnkowns = () => {
    let holder = sortedData.filter(obj => obj.mass != 0).filter(obj => obj.height != 0);
    console.log(holder)
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
    console.log("selectedItem Table", selectedItem)
  }

  return (
    <>
      {modalShow ? <MainModal
        selecteditem={selectedItem}
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> : ''}
      <div id='TableContainer'>
        <div>
          <h1 id='TableTitle'>Star Wars Characters</h1>
          <div id="ChangeUnitsContainer">
          </div>
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
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="SettingsDropdown">
                      ⚙️
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">{(nameSorted[0] !== 'descend') ?
                        <button
                          onClick={() => alphabeticalHandler("name")}
                          id='InteractiveButton'
                        >
                          Sort A-Z</button> :
                        <button onClick={() => revAlphabeticalHandler("name")}
                          id='InteractiveButton'
                        > Sort A-Z</button>
                      }</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">{(heightSorted[0] !== 'descend') ?
                        <button onClick={() => descendingHandler("height")}
                          id='InteractiveButton'
                        >
                          Tallest to Shortest</button> :
                        <button onClick={() => ascendingHandler("height")}
                          id='InteractiveButton'
                        >
                          Shortest to Tallest
                        </button>
                      }</Dropdown.Item>
                      <Dropdown.Item href="#/action-3"> {(weightSorted[0] !== 'descend') ?
                        <button onClick={() => descendingHandler("mass")}
                          id='InteractiveButton'
                        >
                          Heaviest to Lightest</button> :
                        <button
                          onClick={() => ascendingHandler("mass")}
                          id='InteractiveButton'
                        >
                          Lightest to Heaviest
                        </button>
                      } </Dropdown.Item>
                      <Dropdown.Item href="#/action-3"> <button onClick={handleUnits}
                        id='InteractiveButton'
                        aria-label="Change Units">Change Units</button> </Dropdown.Item>
                        <Dropdown.Item href="#/action-3"> <button onClick={handleFilterUnkowns}
                        id='InteractiveButton'
                        aria-label="Filter Unknowns">Remove Unknowns</button> </Dropdown.Item>
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
                      onClick={() => handleRemove(index)}>
                      x
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
