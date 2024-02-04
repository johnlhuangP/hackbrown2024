import React, { useState } from 'react';
import axios from 'axios';

const JoinSession = ({ onJoin }) => {
  const [groupCode, setGroupCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setGroupCode(e.target.value);
  };

  const handleJoinSession = async () => {
    try {
      const response = await axios.post('/api/join-session', { groupCode });
      console.log(response.data);

      // Call the callback function provided by the parent component
      onJoin(response.data);
    } catch (error) {
      console.error('Error joining session:', error.response.data.message);
      setErrorMessage('Invalid group code. Please try again.');
    }
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '20px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '0 auto',  // Center the button horizontally
    display: 'block',  // Ensure it takes the full width available
  };
  

  const containerStyle = {
    padding: '15px',
    borderRadius: '8px',
  };

  return (
    <div>
      <h2>Join Session</h2>
      <div style={containerStyle}>
        <label htmlFor="groupCode">Group Code: </label>
        <input
          type="text"
          id="groupCode"
          value={groupCode}
          onChange={handleInputChange}
          style={{ color: 'black',width: '100px', fontSize: '16px', padding: '8px', align: 'center' }}
        />
      </div>

      {errorMessage && <p style={{ color: 'red' , padding: '10px'}}>{errorMessage}</p>}

      <button style={buttonStyle} onClick={handleJoinSession}>
        Join
      </button>
    </div>
  );
};

export default JoinSession;
