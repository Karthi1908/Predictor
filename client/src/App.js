import React from 'react';
import { BrowserRouter, Routes, Route, useParams  } from 'react-router-dom';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import Header from './components/Header';
import Predict from './components/Predict';
import './App.css';
import Home from './components/Home';
import { ContractProvider, CONTRACT_ADDRESS } from './helper/tezos';
import PredictionContext from './helper/PredictionContext';
import Loading from './helper/Loading';
import MyPreds from './components/Mypreds';

function App() {
  const [predictions, setPredictions] = React.useState(null);
  const [predictionsArray, setPredictionsArray] = React.useState([]);
  const updatePredictions = (preds, predArray) => {
    setPredictions(preds);
    setPredictionsArray(predArray);
  };
  const { id } = useParams();

  React.useEffect(() => {
    ContractProvider.at(CONTRACT_ADDRESS).then(async (contract) => {
      const storage = await contract.storage();
      const predictions = storage.predictions;
	  const counter = storage.Id;
	  const predList = [];
      // for (let key of storage.predictTokenDetails.keys()) {
      //   console.log(key);
      //   console.log(storage.predictTokenDetails.get(key));
      // }
      for (let pred =10; pred < counter; pred++  ) {
	  	 await predictions.get(pred).then(value => { predList.push({ id: pred, value }) });
		 
      
      }
      updatePredictions(predictions, predList);
	
    });
  }, []);

  return (
    <ChakraProvider>
      <ColorModeProvider
        options={{
          initialColorMode: 'dark',
          useSystemColorMode: true,
        }}
      >
        {predictions ? (
          <>
            <PredictionContext.Provider
              value={{
                predictions,
                predictionsArray,
                updatePredictions,
              }}
            >
              <BrowserRouter>
                <Header />
				<Routes>
                <Route exact path="/"  element = {<Home />} />  
				
				
                <Route
                  path="/predict/:id"
                  element = {<Predict />}
                />

                <Route path="/mypreds" element ={<MyPreds />} />
				</Routes>
              </BrowserRouter>
            </PredictionContext.Provider>
          </>
        ) : (
          <Loading />
        )}
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
