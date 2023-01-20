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

  const organizeData = (data) => {
      setData(data)
  }

  return (
      <div className="App">
        <Header />
        <TableComponent data={data} organizeData = {organizeData} />
        <Footer />
      </div>
  );
}

export default MainFunctional;
