import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, MichelCodecPacker, compose } from '@taquito/taquito';
//import { Tzip12Module, tzip12 } from "@taquito/tzip12";
//import { Tzip16Module, tzip16, bytes2Char } from "@taquito/tzip16";

//const CONTRACT_ADDRESS = 'KT1BavDyS4Qkv2xeRTzy5mf37oJcmHTSgtHR';
//const TOKEN_ADDRESS = 'KT19Spcv2j1ktJd5EBTkg4XbnaEeRD1tWmhW';
//const CONTRACT_ADDRESS = 'KT1DwGe6b1x3iqCGMgrFykasxEErt986Rgox';
//const TOKEN_ADDRESS = 'KT1BvYkPGPau7xDSRxLVz7DQpuWZfrXBLL27';

const CONTRACT_ADDRESS = 'KT1QM2Drh18w6fnU13fwxBCDAToWjKfcgZm5'; //-- Mainnet 
const TOKEN_ADDRESS = 'KT1U8jQyUkwsYVpgogrjSAKyQXi8kWengpzp';

//const Tezos = new TezosToolkit('https://hangzhounet.smartpy.io');
//const Tezos = new TezosToolkit('https://ithacanet.smartpy.io');
//const Tezos = new TezosToolkit('https://mainnet.smartpy.io');
const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
Tezos.setPackerProvider(new MichelCodecPacker());

const ContractProvider = Tezos.contract;

const beaconWallet = new BeaconWallet({
  name: 'Predictor',
  preferredNetwork: "mainnet"
});

Tezos.setWalletProvider(beaconWallet);

const wallet = Tezos.wallet;

export { CONTRACT_ADDRESS,TOKEN_ADDRESS, Tezos, ContractProvider, wallet, beaconWallet };
