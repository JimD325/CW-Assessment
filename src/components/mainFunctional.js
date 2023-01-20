import React, { useState, useEffect } from "react";
import starwars from "../APIs/starwars";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { TableComponent } from "./table/Table";


function MainFunctional() {
  const [data, setData] = useState([]);
 
  

  useEffect(() => {
    starwars.getPeople().then((response) => {
      setData(response);
    });
    
  }, []);

  // const organizeData = (dataToSort) => {
  //   console.log('dataSorted on organize Data')
  //     setData(dataToSort)
  // }

  return (
      <div className="App">
        <Header />
        <TableComponent data={data} />
        <Footer />
      </div>
  );
}

export default MainFunctional;
