import React from 'react';
import { Box, Container, Text, useColorModeValue, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,  } from '@chakra-ui/react';
import PredictionContext from '../../helper/PredictionContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { predictionsArray } = React.useContext(PredictionContext);
  const history = useNavigate();
  const colors = {
    bg: useColorModeValue('blue.100', 'blue.900'),
    text: useColorModeValue('blue', 'white'),
  };
  const inProgressArray = predictionsArray.filter(function(prediction)
				{ return prediction.value.predictionStatus == "Prediction In-Progress"; });
  const completedArray = predictionsArray.filter(function(prediction)
				{ return prediction.value.predictionStatus != "Prediction In-Progress"; });

  return (
    <Container
      width="auto"
      maxWidth="100vw"
      bg={colors.bg}
      height="auto"
      maxHeight="1000vh"
      padding="5vh"
    >
	<Text color={colors.text} text-align = 'center'> Join the community on  <a href = 'https://t.me/+wcqQOgMRyMBkZDll' target="_blank"> <b>telegram</b></a> for any queries.<br/> </Text>
	<Accordion allowToggle margin="6">
        	<AccordionItem>
          	<h2>
            	<AccordionButton>
              		<Box flex="1">Read this to get familiar with Predictor Platform</Box>
            	</AccordionButton>
          	</h2>
          <AccordionPanel p="6"> "Predictor is for informational and educational purposes only. We take no custody of anyone's money or cryptocurrency. <br/> 
				  Read this <a href = 'https://medium.com/coinmonks/predictor-da7efb0163ca/' target="_blank"> <b>article</b></a> to know more about Predictor.<br/> 
				  Read this <a href = 'https://medium.com/@karthi1908/predictor-c90398056061' target= "_blank"><b>article</b></a> to get started on Predictor <br/>
				  Read this <a href = 'https://medium.com/@karthi1908/predictor-d01e6c67de0e/' target="_blank"> <b>article</b></a> to understand how to use predictor to predict events.<br/> 
				  Predictor displays existing markets live on the Tezos blockchain and is a graphical user interface for both visualizing data and market trends from on-chain activity, and interacting with said smart contracts directly via your Web 3 enabled wallet."</AccordionPanel>
        </AccordionItem>
      </Accordion>
	  
		<Box display="flex" flexDirection="column" flexWrap="wrap">
        		<Text color={colors.text}> <b>Current Predictions </b></Text>
	  		<Box display="flex" flexDirection="row" flexWrap="wrap">
        			{inProgressArray.map((pred, i) => {
          				return (
           					 <Box
              						key={i}
              						onClick={() => history('/predict/' + pred.id)}
              						display="flex"
              						maxWidth="200px"
              						border="1px solid"
			  				borderColor="purple.400"
              						borderRadius="20px"
			  				flexDirection="row"
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
		 	<Text color={colors.text}> <b>Completed Predictions </b></Text>
		 	<Box display="flex" flexDirection="row" flexWrap="wrap">
				{completedArray.map((pred, i) => {
          				return (
            					<Box
              						key={i}
             	 					onClick={() => history('/predict/' + pred.id)}
              						display="flex"
              						maxWidth="200px"
              						border="1px solid"
			  				borderColor="purple.400"
			  				flexDirection="row"
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
      		</Box>
    </Container>
  );
}
