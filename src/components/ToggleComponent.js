import React, { useState } from 'react';
import CreateSessionComponent from './CreateSessionComponent';
import InputInterestsComponent from './InputInterestsComponent';
import { Switch } from '@chakra-ui/react';

const ToggleComponent = () => {
  const [showCreateSession, setShowCreateSession] = useState(false);

  const handleToggleClick = () => {
    setShowCreateSession(!showCreateSession);
  };

  return (
    <div>
      <Switch size='lg' onChange={handleToggleClick} />
      {showCreateSession ? <CreateSessionComponent /> : <InputInterestsComponent />}
    </div>
  );
};
export default ToggleComponent;