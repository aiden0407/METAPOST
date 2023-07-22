//React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Join from './pages/Join';
import Home from './pages/Home';
import Workout from './pages/Workout';
import Food from './pages/Food';
import Feedback from './pages/Feedback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/food" element={<Food />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
