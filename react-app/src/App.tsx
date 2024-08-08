import React from 'react';
import logo from './logo.svg';
import './App.css';


import Home from './pages/home/Home';
import CityView from './pages/cityview/CityView';
import Discover from './pages/Discover/Discover';
import Nav from './components/Navbar/Nav';
import Modal from './components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { CookiesProvider, useCookies } from 'react-cookie';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [session, setSession] = useState(null);

  return (
    <div className="App">
      {modalOpen && <Modal setModalOpen={setModalOpen} session={session} setSession={setSession} />}
      <BrowserRouter>
        <Nav modalOpen={modalOpen} setModalOpen={setModalOpen} session={session}/>
        <Routes>
          <Route path='/' element={ <Home modalOpen={modalOpen} session={session} />}/>
          <Route path='/discover' element={<Discover />} />
          <Route path='/city/' element={<CityView />} />
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
