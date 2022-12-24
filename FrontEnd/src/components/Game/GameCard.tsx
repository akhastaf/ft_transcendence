import * as React from 'react';

import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { SocketContext } from '../Services/sockets';
import { useNavigate } from 'react-router-dom';

const classic = require('../../images/classicMode.png')

const CardMode : React.FC  <{
  
  mode : string
  desc : string
}> = ({mode , desc}) => {  
  const string : string = (mode === 'Classic (PvP)') ? 'classic' : 'custom';
  const socket = useContext(SocketContext);
  const navigate = useNavigate()
  const startGame = () => {
    socket.emit('add',  string);
    navigate("/channels/GAME/1");
  }
  return (
<Card maxW='sm' className={"bg-gradient-to-r from-green-400 to-blue-500"}>
  <CardBody>
    <Image
      src={classic}
      alt={mode}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{mode} Mode</Heading>
      <Text>
       {desc}
      </Text>
      <Button onClick={startGame}>Play</Button>
    </Stack>
  </CardBody>
  <Divider />
  
</Card>
  );
}

export default CardMode;