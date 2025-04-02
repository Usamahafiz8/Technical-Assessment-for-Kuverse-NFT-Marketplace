import { Contract } from '@ethersproject/contracts';
import KoreTokenABI from '../contracts/KORE.json';
import CollectorABI from '../contracts/Ku_Collector.json';
import BackpackABI from '../contracts/Ku_Backpack.json';
import KuABI from '../contracts/Ku_Ku.json';
import ItemABI from '../contracts/Ku_Item.json';
import KuverMarketABI from '../contracts/KuverseMarket.json';
import PlayerCardABI from '../contracts/PlayerCard.json';

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;
export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    KoreToken: {
      address: '0x8fFaf4d46cBC847E7D573B929297cD004DFe324b',
      abi: KoreTokenABI,
    },
    CollectorNFT: {
      address: '0xEc60ACbC8827aA170A397CDc210C389159ff8698',
      abi: CollectorABI,
    },
    BackpackNFT: {
      address: '0x189A6D39559f9272771724e08D28375f7C18A1A9',
      abi: BackpackABI,
    },
    KuNFT: {
      address: '0xdD95Ba0418CA46677f11c9FBf915Caa4b210bD99',
      abi: KuABI,
    },
    ItemNFT: {
      address: '0xE0eA8631C65da0cb2D768ACBadb9257d58ac6fF1',
      abi: ItemABI,
    },
    KuverseMarket: {
      address: "0x9A4F724de858Ad4376f9b183D0D226c3bA88366E",
      abi: KuverMarketABI
    },
    PlayerCard: {
      address: "0xe555a2b565F203b329357f6D1Eaa8D9C2689a172",
      abi: PlayerCardABI
    },
  },
}
export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}
export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}
export function getCollectionInfo(address, chainId) {
  if (!chainId) chainId = currentNetwork;
  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    if (contracts['CollectorNFT'].address.toLowerCase() === address.toLowerCase()) return contracts['CollectorNFT'];
    else if (contracts['BackpackNFT'].address.toLowerCase() === address.toLowerCase()) return contracts['BackpackNFT'];
    else if (contracts['KuNFT'].address.toLowerCase() === address.toLowerCase()) return contracts['KuNFT'];
    else if (contracts['ItemNFT'].address.toLowerCase() === address.toLowerCase()) return contracts['ItemNFT'];
    else return null;
  } else {
    return null;
  }
}
export function getCollectionContract(address, chainId, provider) {
  let info = getCollectionInfo(address, chainId);
  return !!info && new Contract(address, info.abi, provider);
}
export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
export const shorter1 = (str) =>
  str?.length > 8 ? str.slice(0, 4) + '...' + str.slice(-4) : str

export function formatNum(value) {
  let intValue = Math.floor(value)
  if (intValue < 10) {
    return '' + parseFloat(value).toFixed(2)
  } else if (intValue < 1000) {
    return '' + intValue
  } else if (intValue < 1000000) {
    return parseFloat(intValue / 1000).toFixed(1) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(intValue / 1000000).toFixed(1) + 'M'
  } else {
    return parseFloat(intValue / 1000000000).toFixed(1) + 'G'
  }
}
