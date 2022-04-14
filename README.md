# Predictor

Please read the license file before proceeding.

## Prediction Markets

*Prediction markets* are markets created for the purpose of making predictions and/or benefiting from correct predictions. The primary purpose of these markets is to forecast future events, and the contracts are designed to facilitate extracting information used in forecasting. They have been used to accurately forecast the outcome of political contests, sporting events, and, occasionally, economic outcomes. 

## About Predictor:

Predictor is a decentralized prediction market on Tezos with aim of becoming a trustless oracle for data that is not actively available like climate change, carbon prices, weather and the spread of infectious disease. The main aim of Predictor is to democratize and decentralize the true knowledge for actionable inputs. 

## Mission:

1. To become Universal Forecasting Tool so that it is the preferred platform for any or all kinds of predictions

2. To provide a hedging market for all kinds of risks where information is publicly available such as flight delays,  weather etc.

3. To enable all users to monetize knowledge and gain reputation 

4. To create awareness of Social and Environmental Issues such as climate changes incidents, temperatures, carbon prices, covid counts etc

5. To provide unbiased value discovery.

## Design:

* Prediction Market - Pari-mutuel Mechanism without any AMM.

* Trustless Oracle – [Schelling Points](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)

## Users:

Predictor plans to benefit from the wisdom of the crowd. There are three sets of non mutually exclusive crowds in the Predictor Ecosystem. They are Creators, Predictors and Reporters.

#### Creators:
  Creators will be whitelisted. Creators will create the prediction contracts by entering the prediction statement, options, start and expiry date, There is also a fee for creating a prediction. Creators receive a share of Predictors' fee.

#### Predictors:
Predictors are the true clients of this platform. They browse through the predictions and 
buy the prediction tokens of their desire. As prediction tokens are FA2 compliant, Predictors can trade them in any Tezos DEXes. Once the prediction results are out, they redeem their tokens for the winning amount in Tez.

#### Reporters:
  Reporters mainly deal with the oracle. They are the ones who help in determining the result of the prediction. Whitelisted Reporters stake Tez as collateral and vote for the results for each prediction once the results are out. If the option, they choose, is declared as the final result of the prediction, they get a small reward and they lose 10% of the stake for each wrong reporting.  The option that gets a supermajority of 80% of the votes of reporters within 24 hours will be declared as the result of the corresponding prediction.

## Process:

Predictor follows the Parimutuel way of betting. So the odds for each option are not known in the beginning and can be deduced only after the prediction is closed. All events share have the same price 0.01 Tez. The workflow is as follows

#### Proposal Stage
1. A Creator creates a prediction
2. Admin can cancel a particular prediction if details are incomplete or misleading
3. If there is no issue, prediction is opened for trading

#### Prediction Stage
4. Predictors pick their favourite option for the given prediction by buying the corresponding tokens (by paying tez)
5. All the tez get accumulated in the pool.
6. After the scheduled the prediction is closed. The odds of each option are calculated. 

#### Trading Stage
7.  The Predictor can trade their tokens in any DEX any time before or after the prediction is closed.
8. Prediction event occurs and the results are known.

#### Reporting Stage
9. Reporters report the result by voting on the options in the Oracle. 
10. The option with supermajority is declared the final result

#### Redemption Stage
11. Predictors with the winning tokens redeem their tokens for tez.


## Future Steps

The following steps are planned for future

1. Integrating with Stablecoin ( Plenty USD, USDtz, kUSD) - Tezos based stablecoins
2. Integrating with oracle for market data. So any prediction on market data will be resolved by the oracle itself.
3. Introduce the staking for Reporters.
4. Option to create scalar predictions
5. Add Reputation only Prediction Contracts. Here only non-tradable/ non - transferable tokens instead of tez will be provided to the winners which will represent their reputation.
6. Closed group Predictions - an option for people and organisations to bet on an event only among their acquaintances or clients. The people outside the group are restricted from trading the same contract. It will enable the Prediction as a Service concept for existing offline bookmakers who want to move their work on blockchain. 


### Smart Contracts

Current Smart contract : [KT19UD96tNFP8bq7u6Wk4x4R5sEyfXTu6ETx](https://smartpy.io/explorer.html?address=KT19UD96tNFP8bq7u6Wk4x4R5sEyfXTu6ETx)

Current Token Contract : [KT1CFyf7vzF3EGT5UAvgNPtzkxoeLoQJf6qu](https://smartpy.io/explorer.html?address=KT1CFyf7vzF3EGT5UAvgNPtzkxoeLoQJf6qu)

Older Smart Contract - [KT1Mn8ogydUu3NpB1tztJ2QpPC9ms4MbJi5m](https://smartpy.io/explorer.html?address=KT1Mn8ogydUu3NpB1tztJ2QpPC9ms4MbJi5m)

Older Token Contract - [KT1Hi7QVB3zV7tG4hNHE36vC8LuMywvtUJA6](https://smartpy.io/explorer.html?address=KT1Hi7QVB3zV7tG4hNHE36vC8LuMywvtUJA6)



