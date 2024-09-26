// Imports
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home/Home";
import CityView from "./pages/Cityview/CityView";
import Discover from "./pages/Discover/Discover";
import Privacy from "./pages/Privacy/Privacy";
import About from "./pages/About/About";

// Components
import Nav from "./components/Navbar/Nav";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import Toast from "./components/Toast/Toast";

import SavedCities from "./pages/SavedCities/SavedCities";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";

// Main component for displaying all other components
function App() {
  // State variables
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get("token"));

  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastShow, setToastShow] = useState(false);

  // Cities used for Search
  const [cities, setCities] = useState<any[]>([""]);

  return (
    <div className="App">
      <Toast
        message={toastMessage}
        title={toastTitle}
        show={toastShow}
        setToastShow={setToastShow}
        setToastTitle={setToastTitle}
      />
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          setLoggedIn={setLoggedIn}
          setToastShow={setToastShow}
          setToastMessage={setToastMessage}
          setToastTitle={setToastTitle}
        />
      )}
      <BrowserRouter>
        <Nav
          modalOpen={modalOpen}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setModalOpen={setModalOpen}
          show={toastShow}
          setToastShow={setToastShow}
          setToastTitle={setToastTitle}
          setToastMessage={setToastMessage}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                modalOpen={modalOpen}
                cities={cities}
                setCities={setCities}
              />
            }
          />
          <Route
            path="/discover"
            element={
              <Discover
                modalOpen={modalOpen}
                cities={cities}
                setCities={setCities}
              />
            }
          />
          <Route
            path="/city"
            element={
              <CityView
                modalOpen={modalOpen}
                cities={cities}
                setCities={setCities}
                setToastShow={setToastShow}
                setToastTitle={setToastTitle}
                setToastMessage={setToastMessage}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/savedcities"
            element={<SavedCities modalOpen={modalOpen} setCities={setCities} />}
          />
          <Route path="/about" element={<About modalOpen={modalOpen} />} />
          <Route path="/privacy" element={<Privacy modalOpen={modalOpen} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
