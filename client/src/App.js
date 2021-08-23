import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import Header from './components/Header';
import Predict from './components/Predict';
import './App.css';
import Home from './components/Home';
import { ContractProvider, CONTRACT_ADDRESS } from './helper/tezos';
import PredictionContext from './helper/PredictionContext';
import Loading from './helper/Loading';

function App() {
  const [predictions, setPredictions] = React.useState(null);

  const updatePredictions = (preds) => {
    setPredictions(preds);
  };

  React.useEffect(() => {
    ContractProvider.at(CONTRACT_ADDRESS).then(async (contract) => {
      const storage = await contract.storage();
      const predictions = storage.predictions;
      updatePredictions(predictions);
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
        <WalletProvider
          name="wallet-provider"
          clientType="taquito"
          network="FLORENCENET"
        >
          {predictions ? (
            <>
              <Header />
              <PredictionContext.Provider
                value={{
                  predictions,
                  updatePredictions,
                }}
              >
                <Router>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route
                    path="/predict/:id"
                    component={(props) => (
                      <Predict id={props.match.params.id} />
                    )}
                  />
                </Router>
              </PredictionContext.Provider>
            </>
          ) : (
            <Loading />
          )}
        </WalletProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
