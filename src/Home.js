import React, { useEffect, useState } from 'react';
import socket from './socket';
import './Home.css';
import JoinSession from './components/JoinSession';
import ToggleComponent from './components/ToggleComponent';
import { Switch } from '@chakra-ui/react';

const Home = () => {
  const [sesh, setSesh] = useState(null);
  const [locs, setLocs] = useState(null);

  useEffect(() => {
    socket.on('sessionCreated', (data) => {
      console.log(data);
      setSesh(data.sessionId);
      setLocs(data.places);
    });

    socket.on('joinedSession', (data) => {
      setSesh(data.sessionId);
      setLocs(data.places);
      console.log('new session id: ' + sesh + ' locs: ' + locs);
    });

    document.getElementById('vote').addEventListener('click', function () {
      socket.emit('makeVote', { placeId: 1, joinCode: sesh });
    });

    document.getElementById('create').addEventListener('click', function () {
      socket.emit('createSession', { amt: 5, distance: 500 });
    });

    document.getElementById('join').addEventListener('click', function () {
      console.log(sesh);
      socket.emit('joinSession', { joinCode: sesh });
    });

    return () => {
      // Cleanup event listeners on component unmount
      document.getElementById('vote').removeEventListener('click', voteHandler);
      document.getElementById('create').removeEventListener('click', createHandler);
      document.getElementById('join').removeEventListener('click', joinHandler);
    };
  }, [sesh, locs]);

  useEffect(() => {
    console.log('new session id:', sesh, 'locs:', locs);
  }, [sesh, locs]);

  const voteHandler = () => {
    socket.emit('makeVote', { placeId: 1, joinCode: sesh });
  };

  const createHandler = () => {
    socket.emit('createSession', { amt: 5, distance: 500 });
  };

  const joinHandler = () => {
    console.log(sesh);
    socket.emit('joinSession', { joinCode: sesh });
  };

  return (
    <div className='current-location'>
      <h2 id="kickStyle">KickIt</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ToggleComponent />
      </div>

      
      <button id="create" onClick={createHandler}>
        Make Session
      </button>
      <button id="join" onClick={joinHandler}>
        Join Session
      </button>
      <button id="vote" onClick={voteHandler}>
        Vote
      </button>
    </div>
  );
};

export default Home;
