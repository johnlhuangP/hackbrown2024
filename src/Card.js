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
        <h1>Location Title</h1>
        <br></br>
        <p>Location Image</p>
        <br></br>
        <br></br>
        <p>Card Description</p>
        <p>Stars</p>
    </div>
    );
};

export default Card;
