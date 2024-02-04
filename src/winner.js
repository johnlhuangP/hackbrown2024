import React, { useEffect } from 'react';
import './waiting.css'
import './winner.css'
import socket from './socket'
import { useNavigate, useLocation } from 'react-router-dom';
const Winner = () => {
    const navigate = useNavigate();
    let winner = useLocation();
    console.log('winner');
    const windex = winner.state.win.winningIndex;
    console.log(winner.state.win)
    const votes = winner.state.win.votes;
    console.log('windex: '+ windex)
    const winnerdata = winner.state.locs[parseInt(windex)]
    console.log('winner data' + winnerdata)
    const handleClick = (event) =>{
        navigate('/')
    }
    return (
        <div className='background'>
              <h1 className='waiting'>
                {winnerdata.name}
                <div></div>
                🎉 {votes} friends voted YES! 🎉 
                <div></div>
                <button className='butt' onClick = {handleClick}>MORE?</button>
              </h1>
        </div>
    );
}

export default Winner;