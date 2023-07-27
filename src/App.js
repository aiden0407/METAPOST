//React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { AppProvider } from 'context/AppContext';

//Components
import Layout from 'components/Layout';

//Pages
import Login from 'pages/Login';
import SignUpEmail from 'pages/SignUp/Email';
import SignUpWallet from 'pages/SignUp/Wallet';
import Home from 'pages/Home';
import Post from 'pages/Post';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup/email" element={<SignUpEmail />} />
              <Route path="/signup/wallet" element={<SignUpWallet />} />
              <Route path="/home" element={<Home />} />
              <Route path="/post" element={<Post />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
