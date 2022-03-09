import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
const CONTRACT_ADDRESS = 'KT1NGjzawHFbwFGBdYJWvPbQ7QHLnthvLkqV';

const Tezos = new TezosToolkit('https://hangzhounet.smartpy.io');

const ContractProvider = Tezos.contract;

const beaconWallet = new BeaconWallet({
  name: 'Predictor',
  preferredNetwork: "hangzhounet"
});

Tezos.setWalletProvider(beaconWallet);

const wallet = Tezos.wallet;

export { CONTRACT_ADDRESS, Tezos, ContractProvider, wallet, beaconWallet };
