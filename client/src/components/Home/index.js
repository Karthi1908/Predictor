import React from 'react';
import { Box, Container, Text, useColorModeValue } from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const { predictions } = React.useContext(PredictionContext);
  const [preds, setPreds] = React.useState([]);
  const history = useHistory();
  const colors = {
    bg: useColorModeValue('gray.100', 'gray.900'),
    text: useColorModeValue('black', 'white'),
  };

  React.useEffect(() => {
    const predList = [];
    console.log(predictions.keys());
    for (let pred of predictions.keys()) {
      predList.push({ id: pred, ...predictions.get(pred) });
    }
    setPreds(predList);
  }, []);
  console.log(preds);
  return (
    <Container
      width="auto"
      maxWidth="100vw"
      bg={colors.bg}
      height="auto"
      maxHeight="100vh"
    >
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {preds.map((pred) => {
          return (
            <Box
              onClick={() => history.push('/predict/' + pred.id)}
              display="flex"
              maxWidth="300px"
              border="1px"
            >
              <Text color={colors.text}>{pred.predictionName}</Text>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
