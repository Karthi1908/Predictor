import React from 'react';
import { Container, useColorModeValue } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container
      width="auto"
      maxWidth="100vw"
      bg={useColorModeValue('gray.100', 'gray.900')}
      height="auto"
      maxHeight="100vh"
    ></Container>
  );
}
