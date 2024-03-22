//React
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import { AppProvider } from "context/AppContext";

//Components
import Layout from "components/Layout";

//Pages
import Main from "pages/Main";
import Post from "pages/Post";
import Write from "pages/Write";
import Notice from "pages/Notice";

import Login from "pages/Login";
import SignUpEmail from "pages/SignUp/Email";
import SignUpWallet from "pages/SignUp/Wallet";

import Profile from "pages/Profile";
import ProfileSettings from "pages/Profile/Settings";

import Community from "pages/Community";
import CommunityRanking from "pages/Community/Ranking";
import CommunityCreate from "pages/Community/Create";
import CommunitySettings from "pages/Community/Settings";

//Web3
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon];
const projectId = "079ab2c771dcc68681fc2133be4e851d";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <WagmiConfig config={wagmiConfig}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/METAPOST" element={<Main />} />
                <Route path="/post" element={<Post />} />
                <Route path="/write" element={<Write />} />
                <Route path="/notice" element={<Notice />} />

                <Route path="/METAPOST/login" element={<Login />} />
                <Route
                  path="/METAPOST/signup/email"
                  element={<SignUpEmail />}
                />
                <Route
                  path="/METAPOST/signup/wallet"
                  element={<SignUpWallet />}
                />

                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/settings" element={<ProfileSettings />} />

                <Route path="/community" element={<Community />} />
                <Route
                  path="/community/ranking"
                  element={<CommunityRanking />}
                />
                <Route path="/community/create" element={<CommunityCreate />} />
                <Route
                  path="/community/settings"
                  element={<CommunitySettings />}
                />
              </Routes>
            </Layout>
          </BrowserRouter>
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
