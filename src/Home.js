import React, { useEffect, useState } from 'react';
import socket from './socket'
const Home = () => {
    const [sesh, setSesh] = useState(null);
    const [locs, setLocs] = useState(null);
    useEffect(() => {
        socket.on('sessionCreated', (data) =>{
            console.log(data);
            setSesh(data.sessionId);
            setLocs(data.places)
        })
        socket.on('joinedSession', (data) =>{
            setSesh(data.sessionId);
            setLocs(data.places);
            console.log('new sesion id: ' + sesh + 'locs: ' + locs);
        })
    document.getElementById('vote').addEventListener('click', function() {
        // This code will be executed when the button is clicked
        socket.emit('makeVote', { placeId: 1, joinCode: sesh});
    });
    document.getElementById('create').addEventListener('click', function() {
        // This code will be executed when the button is clicked
        socket.emit('createSession', { amt: 5, distance: 500 });
    });
    document.getElementById('join').addEventListener('click', function() {
        // This code will be executed when the button is clicked
        console.log(sesh);
        socket.emit('joinSession', { joinCode: sesh });
    });
});
useEffect(() => {
    console.log('new session id:', sesh, 'locs:', locs);
  }, [sesh, locs]);
    return (
        <div className='current-location'>
              <h2>
                Welcome to the home page. Join game or create game
              </h2>
              <button id="create">Make Session</button>
        <button id="join">Join Session</button>
        <button id = "vote">Vote</button>
        </div>
    )
}

export default Home;