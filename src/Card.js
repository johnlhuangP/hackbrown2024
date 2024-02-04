import React from 'react';


const cardAppearance = {
    background: "#grey",
    borderRadius: 15,
    width: "20%",
    height: "500px",
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
    </div>
);

export default Card;
