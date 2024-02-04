import React, { useEffect } from 'react';
import yes from './images/yes.png';
import no from './images/no.png';
import Card from './Card';
import socket from './socket'
import {useOutletContext, Outlet, useNavigate} from 'react-router-dom';

/**
 * To represent a potential activity and buttons that allow the user to indicate whether they approve or disapprove of the location.
 * @returns A component representing the current suggested location and buttons to approve or disapprove of the location.
 */
const CurrentLocation = () => {
  const navigate = useNavigate();
  const {locs, index, sessionId} = useOutletContext()
  console.log(useOutletContext());
  console.log('Locs from child: ' + locs)
  const handleClick = function() {
    socket.emit('makeVote', { placeId: index, joinCode: sessionId, made: true});
    if (index == locs.length - 1) {
      console.log(index)
      navigate('/waiting', {state: {id : sessionId, locs: locs}});
    }
    else navigate('/card/' + (parseInt(index) + 1), {state: {id : sessionId, locs: locs}})
}
  const handleClick2 = function () {
    socket.emit('makeVote', { placeId: index, joinCode: sessionId, made: false});
    if (index == locs.length - 1) navigate('/waiting', {state: {id : sessionId, locs: locs}});
    else navigate('/card/' + (parseInt(index) + 1), {state: {id : sessionId, locs: locs}})
  }
  useEffect(() => {
    document.getElementById('yes').addEventListener('click', handleClick);
if (!(index == locs.length - 1)) return () => {
  document.getElementById('yes').removeEventListener('click', handleClick);
}; 
  }, [index, locs, sessionId]);
    return (
        <div className='current-location'>
              <Outlet context= {{locs, index}}/>
              <div className="yes-no-bar">
                <img src={yes} id='yes' className="option" alt="yes"/>
                <img src={no} className="option" alt="no" onClick={handleClick2} />
              </div>
            </div>
    );
}

export default CurrentLocation;