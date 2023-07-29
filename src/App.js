//React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { AppProvider } from 'context/AppContext';

//Components
import Layout from 'components/Layout';

//Pages
import Home from 'pages/Home';
import Post from 'pages/Post';
import Write from 'pages/Write';
import Notice from 'pages/Notice';

import Login from 'pages/Login';
import SignUpEmail from 'pages/SignUp/Email';
import SignUpWallet from 'pages/SignUp/Wallet';

import Profile from 'pages/Profile';
import ProfileSettings from 'pages/Profile/Settings';

import Community from 'pages/Community';
import CommunityRanking from 'pages/Community/Ranking';
import CommunityCreate from 'pages/Community/Create';
import CommunitySettings from 'pages/Community/Settings';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<Post />} />
              <Route path="/write" element={<Write />} />
              <Route path="/notice" element={<Notice />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup/email" element={<SignUpEmail />} />
              <Route path="/signup/wallet" element={<SignUpWallet />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/settings" element={<ProfileSettings />} />
              
              <Route path="/community" element={<Community />} />
              <Route path="/community/ranking" element={<CommunityRanking />} />
              <Route path="/community/create" element={<CommunityCreate />} />
              <Route path="/community/settings" element={<CommunitySettings />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
