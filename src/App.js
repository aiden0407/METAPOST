//React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';

//Components
import Layout from 'components/Layout';

//Pages
import Login from 'pages/Login';
import SignUpEmail from 'pages/SignUp/Email';
import SignUpWallet from 'pages/SignUp/Wallet';
import Home from 'pages/Home';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup/email" element={<SignUpEmail />} />
            <Route path="/signup/wallet" element={<SignUpWallet />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
