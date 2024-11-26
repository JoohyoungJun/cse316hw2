/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';  
import MainPage from './components/MainPage.js';
import FacilityList from './components/FacilityList.js';
import Reservation from './components/Reservation.js';
import UserInfo from './components/UserInfo.js';
import ReservationHistory from './components/ReservationHistory.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import ProtectRoute from './components/ProtectRoute.js';

function App() {
  return (

    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/facility-list" element={<FacilityList />} />
          <Route path="/reservation" element={<ProtectRoute><Reservation /></ProtectRoute>} />
          <Route path="/user-info" element={<ProtectRoute><UserInfo /></ProtectRoute>} />
          <Route path="/reservation-history" element={<ProtectRoute><ReservationHistory /></ProtectRoute>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
