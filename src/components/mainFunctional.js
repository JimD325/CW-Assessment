import React, { useState, useEffect } from "react";
import starwars from "../APIs/starwars";

function MainFunctional() {
  const [data, setData] = useState([]);

  useEffect(() => {
    starwars.getPeople().then((response) => {
      console.log("response", response);
      setData(response);
    });
  }, []);

  return (
    <div className="App">
      {data.map((item, index) => {
        return <div key={index}>name: {item.name}</div>;
      })}
    </div>
  );
}

export default MainFunctional;
