import React from 'react';
import { Box, Container, Text, useColorModeValue } from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { predictionsArray } = React.useContext(PredictionContext);
  const history = useNavigate();
  const colors = {
    bg: useColorModeValue('purple.100', 'purple.900'),
    text: useColorModeValue('black', 'white'),
  };

  return (
    <Container
      width="auto"
      maxWidth="100vw"
      bg={colors.bg}
      height="auto"
      maxHeight="100vh"
      padding="10vh"
    >
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {predictionsArray.map((pred, i) => {
          return (
            <Box
              key={i}
              onClick={() => history('/predict/' + pred.id)}
              display="flex"
              maxWidth="500px"
              border="1px solid"
              borderRadius="20px"
              padding="20px"
              margin="10px"
            >
				<Box display="flex" flexDirection="column" flexWrap="wrap">
              <Text color={colors.text}>Prediction : {pred.value.predictionName}</Text>
			  
			  <Text color={colors.text}>Status : {pred.value.predictionStatus}</Text>
			  </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
