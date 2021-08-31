import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
const CONTRACT_ADDRESS = 'KT1PQAiwKLQKN5CsPKvJeT2hbyKSQHKVjeVG';

const Tezos = new TezosToolkit('https://api.tez.ie/rpc/granadanet');

const ContractProvider = Tezos.contract;

const beaconWallet = new BeaconWallet({
  name: 'tezasia-hack',
  preferredNetwork: NetworkType.GRANADANET,
});

Tezos.setWalletProvider(beaconWallet);

const wallet = Tezos.wallet;

export { CONTRACT_ADDRESS, Tezos, ContractProvider, wallet, beaconWallet };
