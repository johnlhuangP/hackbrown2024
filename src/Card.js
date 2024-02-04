import React from 'react';
import './Card.css';
import yes from './images/yes.png';
import {useOutletContext, Outlet} from 'react-router-dom'
  /**
   * To represent a card component that can displayed in order to be approved or denied of by the user.
   * @returns A component representing a card.
   */
const Card = () => {
    const locs = useOutletContext()
    console.log(locs[0].rating)
    return (
    <div className="card">
        <h1>{locs[0].name}</h1>
        {/* <img src= "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png" alt="location"/> */}
        <img src="https://lh3.googleusercontent.com/p/AF1QipO9rpIMu80fHfYogE17u35ZC5r5WEhT47mHqSr7=s1360-w1360-h1020" alt="location"/>
        <p>{locs[0].types[0]}, {locs[0].types[1]},{locs[0].types[2]} </p>
        <p>Address: {locs[0].vicinity}</p>
        <p>Rating: {locs[0].rating} / 5.0</p>
        
    </div>
    );
};

export default Card;
