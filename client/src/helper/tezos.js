import { NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, MichelCodecPacker, compose } from '@taquito/taquito';
import { Tzip12Module, tzip12 } from "@taquito/tzip12";
//import { Tzip16Module, tzip16, bytes2Char } from "@taquito/tzip16";

//const CONTRACT_ADDRESS = 'KT1BBsZasAeivA6gh7VHDC6WtiyFScv3sSpz';
const CONTRACT_ADDRESS = 'KT1NgQTehmVZEqUV6j7Qjzmnq3VKhd6e6o3B';
const TOKEN_ADDRESS = 'KT1JxbHQNs8gVVQfHV9LyMNhQJCbNXfr7moy';

const Tezos = new TezosToolkit('https://hangzhounet.smartpy.io');
Tezos.setPackerProvider(new MichelCodecPacker());

const ContractProvider = Tezos.contract;

const beaconWallet = new BeaconWallet({
  name: 'Predictor',
  preferredNetwork: "hangzhounet"
});

Tezos.setWalletProvider(beaconWallet);

const wallet = Tezos.wallet;

export { CONTRACT_ADDRESS,TOKEN_ADDRESS, Tezos, ContractProvider, wallet, beaconWallet };
