import React, { useEffect } from 'react';
import './waiting.css'
import socket from './socket'
import { useNavigate } from 'react-router-dom';
const Waiting = () => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('gameEnded', (winner) => {
            console.log(winner);
            navigate('/winner', {state: {win: winner}})
        })
    }, []);
    return (
        <div className='background'>
              <h1 className='waiting'>
                Waiting for others to finish...
              </h1>
        </div>
    );
}

export default Waiting;