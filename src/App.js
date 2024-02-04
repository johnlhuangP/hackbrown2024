import React from "react";

import { useLocation, Outlet } from 'react-router-dom';

import './App.css';
import CurrentLocation from "./CurrentLocation.js";

/** To represent the main block of code running our web application */
function App() {
  const sessionData = useLocation();
  console.log(sessionData);
  const locs = sessionData.state.locs;
  const sessionId = sessionData.state.id;
  console.log('locs' + locs);
  console.log(sessionId)
  return (
    <div className="App">
      <p>Session ID: {sessionId}</p>
      <Outlet context= {locs}/>
    </div>
  );
}

export default App;
