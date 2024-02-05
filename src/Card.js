import React, {useState, useEffect } from 'react';
import './Card.css';
import yes from './images/yes.png';
import {useOutletContext, Outle} from 'react-router-dom'
  /**
   * To represent a card component that can displayed in order to be approved or denied of by the user.
   * @returns A component representing a card.
   */
const Card = () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [details, setDetails] = useState(null)
    const {locs, index} = useOutletContext()
    let ref = 'default_value'; // Default value
if (locs[index] && locs[index].photos && locs[index].photos[0] && locs[index].photos[0].photo_reference) {
  ref = locs[index].photos[0].photo_reference;
}
    return (
    <div className="card">
        <h1>{locs[index].name}</h1>
        {/* <img src= "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png" alt="location"/> */}
        <img src={"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=" + ref + "&key=" + apiKey} alt="location"/>
        <p>{locs[index].types[0]}, {locs[index].types[1]},{locs[index].types[2]} </p>
        <p>{locs[index].vicinity}</p>
        <p>{locs[index].rating} / 5.0</p>
        <p></p>
        
    </div>
    );
};

export default Card;
