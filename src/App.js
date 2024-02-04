import React from "react";

import './App.css';
import CurrentLocation from "./CurrentLocation.js";


/** To represent the main block of code running our web application */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Brown Hackathon 2024
        </h1>
      </header>
      <CurrentLocation/>
    </div>
  );
}

export default App;
