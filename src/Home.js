import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from './socket'
import './home.css'
const Home = () => {
    const navigate = useNavigate()
    const [sesh, setSesh] = useState(null);
    const [locs, setLocs] = useState(null);
    const [loading, setloading] = useState(false)
    const [make, setMake] = useState(true)
    const [join, setJoin] = useState(false)
    useEffect(() => {
        socket.on('sessionCreated', (data) =>{
            console.log(data);
            setSesh(data.sessionId);
            setLocs(data.places)
            navigate('/card', {state: {id : data.sessionId, locs: data.places}})
            setloading(false)    
        })
        socket.on('joinedSession', (data) =>{
            setSesh(data.sessionId);
            setLocs(data.places);
            navigate('/card', {id : data.sessionId, locs: data.places})
            setloading(false)
            console.log('new sesion id: ' + sesh + 'locs: ' + locs);
        })
    if (!loading){
    //document.getElementById('vote').addEventListener('click', function() {
        // This code will be executed when the button is clicked
        //socket.emit('makeVote', { placeId: 1, joinCode: sesh});
    //});
    document.getElementById('create').addEventListener('click', function() {
        // This code will be executed when the button is clicked
        socket.emit('createSession', { amt: 5, distance: 500 });
        setloading(true);
    });
    document.getElementById('join').addEventListener('click', function() {
        // This code will be executed when the button is clicked
        console.log(sesh);
        socket.emit('joinSession', { joinCode: sesh });
        setloading(true);
    });
}
});
useEffect(() => {
    console.log('new session id:', sesh, 'locs:', locs);
  }, [sesh, locs]);

  if (loading) {
    return <Loading />; // Use your custom loading component
  }
    else{  
    return (
        <div className='App'>
            <header className='App-Header'>
                <h1 className='app-title'>
                    KickIT
                </h1>
            </header>
        <div>
        <button id="create">Make Session</button>
        <button id="join">Join Session</button>
        </div>
        </div>
    )
    }
}

function Loading() {
    return (
      <div className="loading-screen">
        {/* You can use CSS animations, SVGs, images, etc., for a better loading indicator */}
        <p>Loading...</p>
      </div>
    );
  }

export default Home;
