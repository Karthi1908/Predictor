import React from 'react';

const PredictionContext = React.createContext({
  predictions: {},
  updatePredictions: () => {},
});

export default PredictionContext;
