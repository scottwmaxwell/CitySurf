import React from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './pages/home/Home';
import CityView from './pages/cityview/CityView';
import Discover from './pages/map/Discover';
import Nav from './components/Navbar/Nav';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Nav />
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
