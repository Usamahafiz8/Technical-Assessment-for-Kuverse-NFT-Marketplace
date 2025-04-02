import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import { SubstraHooksProvider } from "@substra-hooks/core";

const apiProviderConfig = {
  kusama: {
    id: "kusama",
    wsProviderUrl: "wss://kusama-rpc.polkadot.io",
  },
};
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthProvider>
        <ThemeProvider>
          <SubstraHooksProvider
            apiProviderConfig={apiProviderConfig}
            defaultApiProviderId="kusama"
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SubstraHooksProvider>
        </ThemeProvider>
      </AuthProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
