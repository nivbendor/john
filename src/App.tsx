import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import './styles/ProductTabs.css';
import './styles/App.css';
import Home from './pages/Home';
import Business from './pages/Business';
import StickyProductCostSummary from './components/StickyProductCostSummary';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CostViewProvider } from './components/CostView';
import { Product } from './utils/insuranceTypes';
import './styles/background.css';


const App: React.FC = () => {
  const [products, setProducts] = useState<Record<Product, boolean>>({} as Record<Product, boolean>);
  const [totalCost, setTotalCost] = useState(0);

  return (
    <CostViewProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
          path="/john" 
          element={
            <Business 
              setProducts={setProducts} 
              setTotalCost={setTotalCost} 
            />
            } />
          </Routes>
          <StickyProductCostSummary products={products} totalCost={totalCost} />
        </div>
      </Router>
    </CostViewProvider>
  );
};

export default App;