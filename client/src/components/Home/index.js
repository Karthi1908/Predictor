import React from 'react';
import { Box, Container, Text, useColorModeValue } from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { predictionsArray } = React.useContext(PredictionContext);
  const history = useNavigate();
  const colors = {
    bg: useColorModeValue('blue.100', 'blue.900'),
    text: useColorModeValue('blue', 'white'),
  };

  return (
    <Container
      width="auto"
      maxWidth="100vw"
      bg={colors.bg}
      height="auto"
      maxHeight="1000vh"
      padding="5vh"
    >
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {predictionsArray.map((pred, i) => {
          return (
            <Box
              key={i}
              onClick={() => history('/predict/' + pred.id)}
              display="flex"
              maxWidth="200px"
              border="1px solid"
			  borderColor="purple.400"
              borderRadius="20px"
              padding="20px"
              margin="10px"
            >
				<Box display="flex" flexDirection="column" flexWrap="wrap">
              <Text color={colors.text}> <b>ID </b>: {pred.value.predictionRef}</Text>
			  <Text color='orange'>  {pred.value.predictionName} </Text>			  
			  <Text color={colors.text}><b>Status </b>: {pred.value.predictionStatus}</Text>
			  </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
