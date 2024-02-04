import React, { useState } from 'react';
import CreateSessionComponent from './CreateSessionComponent';
import { Switch } from '@chakra-ui/react';
import JoinSession from './JoinSession';

const ToggleComponent = () => {
  const [showCreateSession, setShowCreateSession] = useState(false);

  const handleToggleClick = () => {
    setShowCreateSession(!showCreateSession);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <Switch size='lg' onChange={handleToggleClick} />
      </div>
      <div>
        {showCreateSession ? <CreateSessionComponent /> : <JoinSession />}
      </div>
    </div>
  );
};

export default ToggleComponent;
