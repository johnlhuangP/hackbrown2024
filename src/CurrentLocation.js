import React from 'react';
import yes from './images/yes.png';
import no from './images/no.png';
import Card from './Card';

/**
 * To represent a potential activity and buttons that allow the user to indicate whether they approve or disapprove of the location.
 * @returns A component representing the current suggested location and buttons to approve or disapprove of the location.
 */
const CurrentLocation = () => {
    return (
        <div className='current-location'>
              <h2>
                Current Location:
              </h2>
              <Card />
              <div className="yes-no-bar">
                <img src={yes}className="option" alt="yes" onClick={() => alert("Clicked yes")}/>
                <img src={no} className="option" alt="no" onClick={() => alert("Clicked no")} />
              </div>
            </div>
    );
}

export default CurrentLocation;
