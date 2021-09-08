# Predictor

## Introduction :

In the age of information overload, it has become very difficult to distinguish between real and fake news as there is no incentive to stand with the truth other than going with the popular narrative. Also with the advent of social media, all people with or without knowledge are able to provide expert opinions on all subjects ranging from politics, sports, medical and space technologies. It is good to have a variety of opinions but the issue comes up with the veracity of the opinions.to solve this issue we have the Prediction Markets which act as a gauge to assimilate different opinions and find out the most reliable one.

## Prediction Markets

A prediction market is a place to buy and sell predictions /opinions/forecasts etc. Or to be precise, shares in predictions. In the stock market, you get shares in a company that you believe will perform good and provide returns in form of dividends and capital appreciation. Similarly in a prediction market, you buy shares in an event outcome that you believe to happen. This could be any future event like whether Cuffe parade, Mumbai will submerge in the Arabian sea by Jan 2030 or who will win the IPL2021 or will the price of carbon in European Carbon market will breach 100 by Jan 2022.

## Predictor:

Predictor is a decentralized prediction market on Tezos with aim of becoming a trustless oracle for data that is not actively available like climate change, carbon prices, the spread of infectious disease. The main aim of Predictor is to democratize and decentralize the true knowledge for actionable inputs. 

## Mission:

1. To become Universal Forecasting Tool so that it is preferred paltform for any or all kinds of predictions

2. To enable all users to monetize knowledge and gain reputation so that people can identify the real experts in the crowd.

3. To create awareness on Social and Environmental Issues by running predictions on climate changes incidents, temperatures, carbon prices, covid counts so that people are aware of the seriousness of the prevailing conditions

4. To provide unbiased value discovery .

## Design:

* Prediction Market - [Parimutuel Markets](https://web.stanford.edu/~yyye/scpmfinal.pdf)

* Trustless Oracle – [Schelling Points](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)

## Users:

Predictor plans to benefit from the wisdom of the crowd. There are two sets of non mutually exclusive crowds in the Predictor Ecosystem. They are Predictors and Reporters.

#### Reporters:
  Reporters need to self-whitelist in the platform before performing any reporter related tasks. Initially, it is free but later the reporters need to post a stake. Reporters are the ones who post the predictions and they help also in checking the quality of others predictions posted. they need to be  If there are any duplicates or errors, they can vote to hold the predictions from being seen by others.  They also vote for the results for each prediction once the results are out. The result will be the options that get a supermajority of 80% of the votes of reporters within 24 hours of the result event has happened.

#### Predictors:
  Predictors engage with the platform by buying the prediction tokens for the predictions. As prediction tokens are FA2 compliant, Predictors can trade in any DEXes in Tezos. Once the prediction results are out, they redeem their tokens for the winning amount in Tez.

## Process:

Predictor follows the Parimutuel way of betting. So the odds for each option is not known in the beginning and can be deduced only after the prediction is closed. The workflow is as follows

#### Proposal Stage
1. A Reporter enters a prediction
2. Other Reporters validate the prediction 
3. If there is no issue, prediction is opened for trading

#### Prediction Stage
4. Predictors pick their favourite option for the given prediction by buying the corresponding tokens (by paying tez)
5. All the tez get accumulated in the pool.
6. After the scheduled the prediction is closed. The odds of each option is calculated. 

#### Trading Stage
7. However, the Predictor trade their tokens in any DEX any time before or after the prediction are closed.
8. Prediction event occurs and the results are known.

#### Reporting Stage
9. Reporters report the result by voting on the results. 
10. The option with supermajority is declared the final result

#### Redemption Stage
11. Predictors with the winning tokens redeem their tokens for tez.


## Next Steps

Following steps are planned for future

1. Integrating with Stablecoin ( Plenty USD, USDtz, kUSD) - Tezos based stablecoins
2. Integrating with oracle for market data. So the any prediction on market data will be reolved by the oracle iteslef.
3. Introduce the staking for Reporters.
4. Option to create scalar predictions
5. Add Reputation only Prediction Contracts. Here only non-tradable/ non - transferable tokens instead of tez will be provided to the winners which will represent their reputation.
6. Closed group Predictions - an option to people and organisations to bet on an event only among their acquaintances or clients. The people outside group are restricted from trading the same contract. It will enable Prediciton as a Service concept so that existing offline bookmakers can use Predictor's Platform for their use. 

### Smart Contracts

Current Smart contract : [KT19UD96tNFP8bq7u6Wk4x4R5sEyfXTu6ETx](https://smartpy.io/explorer.html?address=KT19UD96tNFP8bq7u6Wk4x4R5sEyfXTu6ETx)

Current Token Contract : [KT1CFyf7vzF3EGT5UAvgNPtzkxoeLoQJf6qu](https://smartpy.io/explorer.html?address=KT1CFyf7vzF3EGT5UAvgNPtzkxoeLoQJf6qu)

Older Smart Contract - [KT1Mn8ogydUu3NpB1tztJ2QpPC9ms4MbJi5m](https://smartpy.io/explorer.html?address=KT1Mn8ogydUu3NpB1tztJ2QpPC9ms4MbJi5m)

Older Token Contract - [KT1Hi7QVB3zV7tG4hNHE36vC8LuMywvtUJA6](https://smartpy.io/explorer.html?address=KT1Hi7QVB3zV7tG4hNHE36vC8LuMywvtUJA6)



