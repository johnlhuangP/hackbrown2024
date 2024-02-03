import React from 'react';
import {
  Card as ChakraCard,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import Confetti from 'react-confetti';

const CardComponent = () => {
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <ChakraCard maxW="xs">
        <CardBody>
          <Image
            src="https://www.sunvalley.com/azure/sunvalley/media/sunvalley/activities/bowling/svr_lodge_bowling_alley_hero_winter_2023_hayden_1.jpg?w=475&h=475&mode=crop&scale=both&anchor=middle-center&quality=75"
            alt="Bowling Alley"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">City Bowling Alley</Heading>
            <Text>
              Enjoy a fantastic bowling experience at City Bowling Alley! We
              offer state-of-the-art facilities and a fun atmosphere for
              bowlers of all skill levels.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              Visit us today!
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Book a Lane
            </Button>
            
          </ButtonGroup>
        </CardFooter>
      </ChakraCard>
    </>
  );
};



export default CardComponent;