import React from 'react';
import logo from './logo.svg';
import './App.css';


import Home from './pages/Home/Home';
import CityView from './pages/Cityview/CityView';
import Discover from './pages/Discover/Discover';
import Nav from './components/Navbar/Nav';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import Privacy from './pages/Privacy/Privacy';
import About from './pages/About/About';



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
          <Route path='/discover' element={<Discover modalOpen={modalOpen} />} />
          <Route path='/city' element={<CityView modalOpen={modalOpen}/>} />
          <Route path="/about" element={<About modalOpen={modalOpen} />} />
          <Route path="/privacy" element={<Privacy modalOpen={modalOpen} />} />
        </Routes>     
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
