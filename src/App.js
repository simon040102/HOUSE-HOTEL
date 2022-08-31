import React from 'react';
import './App.css';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import ReserveSingleRoom from './ReserveSingleRoom';
import NotFount from './notFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":Id" element={<ReserveSingleRoom />} />
      <Route path="*" element={<NotFount />} />
    </Routes>
  );
}

export default App;
