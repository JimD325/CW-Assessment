import Table from 'react-bootstrap/Table';
import './Table.css'
import React, { useState, useEffect } from "react";

export function TableComponent(data, organizeData) {
  const [lengthUnits, setLengthUnits] = useState(['cm'])
  const [lengthMultiplier, setLengthMultiplier] = useState([1])
  const [weightUnits, setWeightUnits] = useState(['kg'])
  const [weightMultiplier, setWeightMultiplier] = useState([1])
  // const [sortedData, setSortedData] = useState(data.data);
  

//   useEffect(() => {
//     console.log('useEffectRan')
//     setSortedData(data.data);
// });

 

  const ascendingHeight = () => {
    let holder = data.data.sort((a, b) => a.height - b.height)
    organizeData(holder);
  }
  const descendingHeight = () => {
    let holder = data.data.sort((a, b) => b.height - a.height);
    organizeData(holder);
  }

  const handleWeightUnits = () => {
    if(weightUnits === 'kg'){
      setWeightUnits('lb')
      setWeightMultiplier(2.205)
    }
    else if(weightUnits ==='lb'){
      setWeightUnits('kg')
      setWeightMultiplier(1)
    }
    else {
      setWeightUnits('kg')
      setWeightMultiplier(1)
    }
  }

  const handleLengthUnits = () => {
    if(lengthUnits === 'cm'){
      setLengthUnits('in')
      setLengthMultiplier(1/2.54)
    }
    else if(lengthUnits ==='in'){
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
    <div id= 'TableContainer'>
      <div>
      <h1>Star Wars Characters</h1>
    </div>
    <Table striped bordered hover variant="dark"
    id = "Table"
    >
       <>
    </>
    <thead>
      <tr>
        <th>Name</th>
        <th>Height ({lengthUnits})
        </th>
        <th>Weight ({weightUnits})
        
        </th>
      </tr>
    </thead>
    <tbody>
      {data.data.map((obj, index) => 
      <tr key = {index}>
      <td>{obj.name}</td>
      <td>{Math.round(obj.height*lengthMultiplier)}</td>
      <td>{Math.round(obj.mass*weightMultiplier)}</td>
     </tr>
      )}
    </tbody>
  </Table> 
        <div id= "ChangeUnitsContainer"> <button onClick = {handleUnits} aria-label= "Change Units" id = "Button">Change Units</button>

        <button onClick = {()=>ascendingHeight()} aria-label= "Shortest To Tallest" id = "Button">Shortest To Tallest</button>
        
        <button 
        onClick = {()=>descendingHeight()} 
        aria-label= "Tallest to Shortest" id = "Button">Tallest to Shortest</button>
    </div>
   
   </div>
    
    
   
  )
}
