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
import Funnel from './components/Funnel';
import './styles/funnel.css';
import { parseUrlParams } from './utils/parseUrlParams';

const App: React.FC = () => {
  const [products, setProducts] = useState<Record<Product, boolean>>({} as Record<Product, boolean>);
  const [totalCost, setTotalCost] = useState(0);
  const [funnelData, setFunnelData] = useState<any>(null); // Define funnelData state
  const { showFunnel } = parseUrlParams();

  // Function to handle the completion of the funnel
  const handleFunnelComplete = (data: any) => {
    setFunnelData(data); // Correctly set the funnelData
    console.log('Funnel completed with data:', data);
  };

  return (
    <CostViewProvider>
      <Router>
        <Routes>
          <Route path="/" element={showFunnel ? <Funnel onComplete={handleFunnelComplete} /> : <Home />} />
          <Route path="/john" element={
            showFunnel ? <Funnel onComplete={handleFunnelComplete} /> : 
            <Business setProducts={setProducts} setTotalCost={setTotalCost} funnelData={funnelData} />
          } />
          <Route path="/:step" element={<Funnel onComplete={handleFunnelComplete} />} />
        </Routes>
        {!showFunnel && <StickyProductCostSummary products={products} totalCost={totalCost} />}
      </Router>
    </CostViewProvider>
  );
};

export default App;
