import React from "react";

import { useLocation, Outlet, useParams } from 'react-router-dom';

import './App.css';
import CurrentLocation from "./CurrentLocation.js";

/** To represent the main block of code running our web application */
function App() {
  let {index} = useParams();
  const sessionData = useLocation();
  console.log(sessionData);
  const locs = sessionData.state.locs;
  const sessionId = sessionData.state.id;
  console.log('locs' + locs);
  console.log(sessionId)
  return (
    <div className="App">
      <div className="sesh-container"><p className="sesh">Session ID: {sessionId}</p></div>
      <Outlet context= {{locs, index, sessionId}}/>
    </div>
  );
}

export default App;
