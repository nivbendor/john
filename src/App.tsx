import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/global.css';
import './styles/ProductTabs.css';
import './styles/App.css';
import Home from './pages/Home';
import Business from './pages/Business';
import StickyProductCostSummary from './components/StickyProductCostSummary';
import totalPremium from './components/ActiveProductsToggle';
import products from './components/ActiveProductsToggle';
import 'bootstrap/dist/css/bootstrap.min.css';


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
          <Route path="/john" element={<Business />} />
        </Routes>
                <StickyProductCostSummary products={products} totalCost={totalPremium} />

      </div>
    </Router>
  );
};

export default App;