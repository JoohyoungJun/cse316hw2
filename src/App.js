/*
Name: Joohyoung Jun
Email: joohyoung.jun@stonybrook.edu
*/
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  
import MainPage from './components/MainPage';
import FacilityList from './components/FacilityList';
import Reservation from './components/Reservation';
import UserInfo from './components/UserInfo';
import ReservationHistory from './components/ReservationHistory';

function App() {
  return (

    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/facility-list" element={<FacilityList />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/reservation-history" element={<ReservationHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
