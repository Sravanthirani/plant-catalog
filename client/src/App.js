// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { GiPlantWatering } from "react-icons/gi"; // plant icon
import './App.css';

function App() {
  return (
    <Router>
      <header className="app-header">
        <nav className="navbar">
          <div className="nav-left">
            <NavLink to="/" className="nav-link">HOME</NavLink>
            <NavLink to="/admin" className="nav-link">ADMIN</NavLink>
          </div>

          <div className="nav-right">
            <GiPlantWatering className="plant-icon" />
          </div>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
