import React from 'react';
import { ChakraProvider, Box, Center, Text } from '@chakra-ui/react';
import Card from './Card';

const Finish = () => {
  return (
    <ChakraProvider>
      <Center height="100vh">
        <Box>
          <Card />
          <Text
            mt="4"
            textAlign="center"
            color="teal.500"
            fontSize="xlg"
            fontWeight="bold"
          >
            🎉 7 friends voted YES! Join the fun now!
          </Text>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default Finish.js;