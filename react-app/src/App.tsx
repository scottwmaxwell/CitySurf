import React from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './pages/home/Home';
import CityView from './pages/cityview/CityView';
import Discover from './pages/map/Discover';
import Nav from './components/Navbar/Nav';
import Modal from './components/Modal/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <Nav modalOpen={modalOpen} setModalOpen={setModalOpen} />
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/discover' element={<Discover />} />
          <Route path='/city/' element={<CityView />} />
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
