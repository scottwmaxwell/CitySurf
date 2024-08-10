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
import Cookies from 'js-cookie';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('token'));

  return (
    <div className="App">
      {modalOpen && <Modal setModalOpen={setModalOpen} setLoggedIn={setLoggedIn} />}
      <BrowserRouter>
        <Nav modalOpen={modalOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setModalOpen={setModalOpen} />
        <Routes>
          <Route path='/' element={ <Home modalOpen={modalOpen} />}/>
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
