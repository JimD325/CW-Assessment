import React, { useState } from "react";
import starwars from "../APIs/starwars";
import { Header } from "./header/header";
import { CharacterTable } from "./table/CharacterTable";
import { PlanetTable } from "./table/PlanetTable";
import { FilmsTable } from "./table/FilmsTable";
import { Home } from "./home/Home";

import './mainFunctional.css'

function MainFunctional() {
  const [data, setData] = useState([]);
  const [dataParam, setDataParam] = useState('')
  const [fetchingData, setFetchingData]= useState(true)
  
  

  const handleSetParams = (param, quantity, pageNumber) => {
    setData([]);
    setDataParam(param)
    if(quantity ==='all'){
    setFetchingData(true)
    starwars.getAllEntities(param).then((response) => {
      setData(response);
      setFetchingData(false)
    });
    } else if (quantity ==='page'){
    setFetchingData(true)
    starwars.getEntityByPage(param, pageNumber).then((response) => {
      setData(response);
      setFetchingData(false)
    });
    }
    
  }

  return (
      <div id="App">
        <Header />
        <Home handleSetParams = {handleSetParams}/>
        {dataParam == 'people' ?  
          <CharacterTable data={data}
          fetchingData={fetchingData}
          dataParam={dataParam}
          handleSetParams = {handleSetParams}/> :     
        dataParam == 'planets'? 
          <PlanetTable data={data}
          fetchingData={fetchingData}
          dataParam={dataParam}
          handleSetParams = {handleSetParams}/> :     
        dataParam == 'films' ? <FilmsTable
          data={data}
          fetchingData={fetchingData}
          dataParam={dataParam}
          handleSetParams = {handleSetParams}/> 
          :
        ''
        }
      </div>
  );
}

export default MainFunctional;
