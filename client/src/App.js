import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  Box,
  ChakraProvider,
  ColorModeProvider,
  useColorModeValue,
} from '@chakra-ui/react';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import Header from './components/Header';
import Predict from './components/Predict';
import './App.css';
import Home from './components/Home';

function App() {
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
          <Header />
          <Router>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/predict/:id"
              component={(props) => <Predict id={props.match.params.id} />}
            />
          </Router>
        </WalletProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
