import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/global.css';
import './styles/ProductTabs.css';
import './styles/App.css';
import Home from './pages/Home';
import About from './pages/Business';

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/john">About</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/john" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;