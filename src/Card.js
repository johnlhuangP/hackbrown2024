import React from 'react';


const cardAppearance = {
    background: "skyblue",
    borderRadius: 15,
    width: "20%",
    height: "100%",
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  /**
   * To represent a card component that can displayed in order to be approved or denied of by the user.
   * @returns A component representing a card.
   
   */
const Card = () => (
    <div style={cardAppearance}>
        <h1>Card</h1>
    </div>
);

export default Card;
