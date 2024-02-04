import React, {useState, useEffect } from 'react';
import './Card.css';
import yes from './images/yes.png';
import {useOutletContext, Outle} from 'react-router-dom'
  /**
   * To represent a card component that can displayed in order to be approved or denied of by the user.
   * @returns A component representing a card.
   */
const Card = () => {
    const [details, setDetails] = useState(null)
    const {locs, index} = useOutletContext()
    const ref = locs[index].photos[0].photo_reference
    return (
    <div className="card">
        <h1>{locs[index].name}</h1>
        {/* <img src= "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png" alt="location"/> */}
        <img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" + ref + "&key=AIzaSyCgKUYmaMTeQNa1MPWS6_LO6hTVxcxMSZY"} alt="location"/>
        <p>{locs[index].types[0]}, {locs[index].types[1]},{locs[index].types[2]} </p>
        <p>Address: {locs[index].vicinity}</p>
        <p>Rating: {locs[index].rating} / 5.0</p>
        <p></p>
        
    </div>
    );
};

export default Card;
