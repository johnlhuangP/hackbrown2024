
import React, {useState} from 'react';
import axios from 'axios';


const JoinSession = () => {
    
    // State to store the group code and error message
    const [groupCode, setGroupCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    // Event handler for input change
    const handleInputChange = (e) => {
      setGroupCode(e.target.value);
    };
  
    // Event handler for joining a session
    const handleJoinSession = async () => {
      try {
        // Make a request to your backend API to join the session
        const response = await axios.post('/api/join-session', { groupCode });
  
        // Handle the response as needed (e.g., redirect to the session page)
        console.log(response.data);
      } catch (error) {
        // Handle errors, such as displaying an error message
        console.error('Error joining session:', error.response.data.message);
        setErrorMessage('Invalid group code. Please try again.');
      }
    };
    const buttonStyle = {
        backgroundColor: '#3498db', // Background color
        color: '#fff',              // Text color
        padding: '20px 30px',       // Padding
        borderRadius: '8px',        // Border radius
        cursor: 'pointer',          // Cursor on hover
        fontSize: '16px'
        
      };
      const containerStyle = {
        padding: '20px',
        borderRadius: '8px',
      };

    return (
        <div>
          <h2>Join Session</h2>
          <div style={containerStyle}>
            {/* Input for group code */}
            <label htmlFor="groupCode">Group Code: </label>
            <input
              type="text"
              id="groupCode"
              value={groupCode}
              onChange={handleInputChange}
              style={{ width: '100px', fontSize: '16px', padding: '8px' , align: 'center'}}
            />
          </div>
    
          {/* Display error message if present */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    
          {/* Button to join session */}
          <button style={buttonStyle} onClick={handleJoinSession}>Join</button>
        </div>
      );
    }



  

export default JoinSession;
