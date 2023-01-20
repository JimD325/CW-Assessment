import Table from 'react-bootstrap/Table';
import './Table.css'
import React, { useState, useEffect } from "react";
import starwars from '../../APIs/starwars';

export function TableComponent(props) {
  const [lengthUnits, setLengthUnits] = useState(['cm'])
  const [lengthMultiplier, setLengthMultiplier] = useState([1])
  const [weightUnits, setWeightUnits] = useState(['kg'])
  const [weightMultiplier, setWeightMultiplier] = useState([1])
  const [sortedData, setSortedData] = useState([]);


  useEffect(() => {
    setSortedData(props.data)
  });


  const ascendingHandler = (param) => {
    let holder = sortedData.sort((a, b) => a[param] - b[param])
    console.log(`ascending ${param}`)
    setSortedData([...holder]);
  }

  const descendingHandler = (param) => {
    let holder = sortedData.sort((a, b) => 
    b[param] - a[param]
   
    );
    console.log(`descending ${param}`)
    setSortedData([...holder]);
  }

  const alphabeticalHandler = (param) => {
    setSortedData([sortedData.sort((a,b) => a[param]>b[param] ? 1 : -1)])
  }

  const revAlphabeticalHandler = (param) => {
    setSortedData([sortedData.sort((a,b) => a[param]>b[param] ? -1 : 1)])
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


  return (
    <div id='TableContainer'>
      <div>
        <h1>Star Wars Characters</h1>
      </div>
      <Table striped bordered hover variant="dark"
        id="Table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Height ({lengthUnits}) </th>
            <th>Weight ({weightUnits})</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((obj, index) =>
            <tr key={index}>
              <td>{obj.name}</td>
              <td>{

                (obj.height !== 'unknown') ? Math.round(obj.height * lengthMultiplier) : obj.height
              }
              </td>
              <td>

                {
                  (obj.mass !== 'unknown') ?
                    Math.round(obj.mass * weightMultiplier) : obj.mass}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div id="ChangeUnitsContainer"> <button onClick={handleUnits} aria-label="Change Units" id="Button">Change Units</button>

        <button onClick={() => ascendingHandler("height")} aria-label="Short To Tall" id="Button">Short To Tall</button>

        <button
          onClick={() => descendingHandler("height")}
          aria-label="Tall to Short" id="Button">Tall to Short</button>

<button
          onClick={() => descendingHandler("mass")}
          aria-label="heavy to light" id="Button">heavy to light</button>

<button
          onClick={() => ascendingHandler("mass")}
          aria-label="light to heavy" id="Button">light to heavy</button>

<button
          onClick={() => revAlphabeticalHandler("name")}
          aria-label="Z-A" id="Button">Z-A</button>

<button
          onClick={() => alphabeticalHandler("name")}
          aria-label="A-Z" id="Button">A-Z</button>
      </div>
    </div>
  )
}
