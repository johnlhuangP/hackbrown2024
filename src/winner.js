import React, { useEffect } from 'react';
import './waiting.css'
import socket from './socket'
import { useNavigate, useLocation } from 'react-router-dom';
const Winner = () => {
    const navigate = useNavigate();
    let winner = useLocation();
    winner = winner.state.win;
    useEffect(() => {

    }, []);
    return (
        <div className='background'>
              <h1 className='waiting'>
                Winner is:
              </h1>
        </div>
    );
}

export default Winner;