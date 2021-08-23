import { TezosToolkit } from '@taquito/taquito';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';
const CONTRACT_ADDRESS = 'KT1Mn8ogydUu3NpB1tztJ2QpPC9ms4MbJi5m';

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/granadanet');

const ContractProvider = Tezos.contract;

// Tezos.setProvider({ signer: new TezBridgeSigner() });

export { CONTRACT_ADDRESS, Tezos, ContractProvider };
