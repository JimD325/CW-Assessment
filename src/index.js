import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainFunctional from "./components/mainFunctional";
class App extends Component {
  render() {
    return (
      <div className="App">
        <MainFunctional />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
//render(<App />, document.getElementById("root"));
