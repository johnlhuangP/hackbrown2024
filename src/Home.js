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
    const [numberOfLocations, setNumberOfLocations] = useState(10);
    const [distance, setDistance] = useState(10)
    const [joinCode, setJoinCode] = useState('')


    const handleChangeMake = (event) => {
        setMake(true)
      };

    const handleChangeJoin = (event) => {
        setMake(false)
      };

    const handleChange = (event) => {
        setNumberOfLocations(event.target.value);
      };
    
      // Handler for form submission
      const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        console.log(`Number of locations: ${numberOfLocations}`);
        // Add your logic here to use the number of locations (e.g., fetch data, update UI)
      };
      const handleSubmitCode = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        console.log(`Number of locations: ${numberOfLocations}`);
        // Add your logic here to use the number of locations (e.g., fetch data, update UI)
      };

      const handleChangeD = (event) => {
        setDistance(event.target.value);
      };
      const handleChangeCode = (event) => {
        setJoinCode(event.target.value);
      };
    
      // Handler for form submission
      const handleSubmitD = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        console.log(`Distance: ${distance}`);
        // Add your logic here to use the number of locations (e.g., fetch data, update UI)
      };
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
    if (make){
        document.getElementById('goMake').addEventListener('click', function() {
            // This code will be executed when the button is clicked
            socket.emit('createSession', { amt: numberOfLocations, distance: distance });
            setloading(true);
        });
        document.getElementById('join').addEventListener('click', handleChangeJoin)
        
    }

    if (!make){
        document.getElementById('goJoin').addEventListener('click', function() {
            // This code will be executed when the button is clicked
            console.log(sesh);
            socket.emit('joinSession', { joinCode: sesh });
            setloading(true);
        });
        document.getElementById('create').addEventListener('click', handleChangeMake)
        

    }
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
        <div className='buttons'>
        {(make) ? <button id="create" className='toggled session'>Make Session</button> : <button id="create" className='session'>Make Session</button>} 
        {(make) ? <button id="join" className='session'>Join Session</button> : <button id="join" className='toggled session'>Join Session</button>}
        <div className='make'>
    {(make) ? <form onSubmit={handleSubmit}>
        <div className='former'>
      <label htmlFor="locations" className='form'>Locations</label>
      <input
        type="number"
        id="locations"
        name="locations"
        min="1"  // Minimum number of locations
        value={numberOfLocations}
        onChange={handleChange}
      />
      <label htmlFor="DISTANCE" className='form'>DISTANCE</label>
      <input
        type="number"
        id="distance"
        name="distance"
        min="100"  // Minimum number of locations
        value={numberOfLocations}
        onChange={handleChange}
      />
      <button id='goMake' className = 'go' type="submit">GO</button>
      </div>
    </form> : 
    <form onSubmit={handleSubmitCode}>
        <div className='former'>
      <label htmlFor="code" className='form'>CODE</label>
      <input
        type="number"
        id="code"
        name="code"
        value={joinCode}
        onChange={handleChangeCode}
      />
      <button id='goJoin' className='go' type="submit">GO</button>
      </div>
    </form>
    }
        </div>
        </div>
        </div>
        </div>
    )
    }
}

function Loading() {
    return (
      <div className="App">
        {/* You can use CSS animations, SVGs, images, etc., for a better loading indicator */}
        <p>Loading...</p>
      </div>
    );
  }

export default Home;
