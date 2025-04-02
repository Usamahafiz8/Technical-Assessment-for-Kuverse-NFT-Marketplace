import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { currentNetwork } from "./index"
import getNodeUrl from "./getRpcUrl"
// import Metamask from "../icons/Metamask";
// import TrustWallet from "../icons/TrustWallet";
// import WalletConnect from "../icons/WalletConnect";
import MetamaskIcon from "../icons/MetamaskIcon";
import TrustWalletIcon from "../icons/TrustWalletIcon";
import WalletConnectIcon from "../icons/WalletConnectIcon";

const POLLING_INTERVAL = 12000


export const injectedConnector = new InjectedConnector({ supportedChainIds: [+currentNetwork] });

export function getConnector(connectorId) {
  switch (connectorId) {
    case "injectedConnector":
      return injectedConnector; 
    case "walletconnect":
      return walletconnect;
    default:
      return injectedConnector;
  }
}

export const walletconnect = new WalletConnectConnector({
  rpc: {
    [+currentNetwork]: getNodeUrl()
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})


export const connectorsByName = {
  'Injected': injectedConnector,
  'WalletConnect': walletconnect,
}

export const connectors = [
  {
    title: "Metamask",
    icon: MetamaskIcon,
    connectorId: injectedConnector,
    key: "injectedConnector",
  },
  {
    title: "TrustWallet",
    icon: TrustWalletIcon,
    connectorId: injectedConnector,
    key: "injectedConnector",
  },
  {
    title: "WalletConnect",
    icon: WalletConnectIcon,
    connectorId: walletconnect,
    key: "walletconnect",
  },
]

export const connectorLocalStorageKey = "connectorId";