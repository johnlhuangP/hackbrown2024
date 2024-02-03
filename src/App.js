import React from "react";
import yes from './images/yes.png';
import no from './images/no.png';

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
        <h2>
         
        </h2>
      </header>
            <div className='landing-page'>
              <h2>
                Welcome to the project web application!
              </h2>
              <p>
                This will be the landing page for the project web application.
              </p>
              <CurrentLocation />
              <div className="yes-no-bar">
                <h3>[include location entry here]</h3>
                <img src={yes}className="option" alt="yes" onClick={() => alert("Clicked yes")}/>
                <img src={no} className="option" alt="no" onClick={() => alert("Clicked no")} />
              </div>
            </div>
    </div>
  );
}

export default App;
