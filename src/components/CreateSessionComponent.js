import React, { useState } from 'react';
import axios from 'axios';

const CreateSessionComponent = () => {
  const [sessionCode, setSessionCode] = useState('');

  const handleGenerateCode = async () => {
    try {
      // Make a request to your backend API to generate a new session code
      const response = await axios.post('/api/generate-session-code');
      setSessionCode(response.data.code);
    } catch (error) {
      console.error('Error generating session code:', error.response.data.message);
      // Handle errors, such as displaying an error message
    }
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '20px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    justifyContent: 'center',
  };

  const containerStyle = {
    padding: '20px',
    borderRadius: '8px',
  };

  return (
    <div style={containerStyle}>
      <h2>Create a Session</h2>
      <button style={buttonStyle} onClick={handleGenerateCode}>
        Generate Session Code
      </button>
      {sessionCode && <p>Your Session Code: {sessionCode}</p>}
      {/* Add your create session form or content here */}
    </div>
  );
};

export default CreateSessionComponent;
