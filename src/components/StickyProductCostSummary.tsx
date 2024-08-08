import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const StickyProductCostSummary = ({ products, totalCost }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const productSection = document.getElementById('active-products-section');
      if (productSection) {
        const rect = productSection.getBoundingClientRect();
        setIsVisible(rect.top <= window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <h2 className="text-lg font-semibold">Cost View</h2>
          <div className="flex items-center">
            <span className="mr-2 font-bold text-2xl text-[#2d5ff1]">${totalCost.toFixed(2)}</span>
            {isExpanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-2">
            {products.map((product) => (
              <div key={product.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${product.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>{product.name}</span>
                </div>
                <div className="flex items-center">
                  <select className="mr-2 border rounded px-2 py-1">
                    <option>All</option>
                    {/* Add other options as needed */}
                  </select>
                  <span className="font-semibold">${product.cost.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyProductCostSummary;