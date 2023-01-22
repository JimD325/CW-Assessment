import React, { useState, useEffect } from "react";
import starwars from "../APIs/starwars";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { TableComponent } from "./table/Table";
import { CharacterModal } from "./modal/Modal";
import './mainFunctional.css'

function MainFunctional() {
  const [data, setData] = useState([]);
 
  

  useEffect(() => {
    starwars.getAllEntities('people').then((response) => {
      setData(response);

      console.log("data on mainFunctional", data)
    });
    
  }, []);



  return (
      <div id="App">
        <Header />
        <TableComponent data={data} />
        <Footer />
      </div>
  );
}

export default MainFunctional;
