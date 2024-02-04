// App.js
import React from 'react';
import './App.css';
import JoinSession from './components/JoinSession';
import { Switch } from '@chakra-ui/react';
import ToggleComponent from './components/ToggleComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">
          FriendME
        </h1>
        <div className="centered-container">
          <ToggleComponent/>
          <div className="join-session-container">
            <JoinSession />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
