import React from 'react';
import { Product } from '../utils/insuranceTypes';

interface ProductSelectorProps {
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  products: Product[];
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, setSelectedProduct, products }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="grid grid-cols-4 gap-1 p-2 md:flex md:flex-wrap md:justify-start">
        {products.map((product) => (
          <button
            key={product}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors duration-150 ease-in-out
              ${selectedProduct === product
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedProduct(product)}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-1
              ${selectedProduct === product ? 'bg-white text-blue-500' : 'bg-blue-100 text-blue-500'}`}>
              {getProductIcon(product)}
            </div>
            <span className="text-xs text-center whitespace-nowrap">{getProductLabel(product)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const getProductIcon = (product: Product): React.ReactNode => {
  switch (product) {
    case 'LTD': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'STD': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
    case 'Life / AD&D': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
    case 'Accident': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>;
    case 'Vision': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
    case 'Dental': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>;
    case 'Critical Illness/Cancer': return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    default: return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>;
  }
};

const getProductLabel = (product: Product): string => {
  switch (product) {
    case 'LTD': return 'Long-Term Disability';
    case 'STD': return 'Short-Term Disability';
    case 'Life / AD&D': return 'Life / AD&D';
    case 'Accident': return 'Accident';
    case 'Vision': return 'Vision';
    case 'Dental': return 'Dental';
    case 'Critical Illness/Cancer': return 'Critical Illness';
    default: return product;
  }
};

export default ProductSelector;

// const getProductIcon = (product: Product): string => {
//   switch (product) {
//     case 'LTD': return '🛡️';
//     case 'STD': return '🏥';
//     case 'Life / AD&D': return '💼';
//     case 'Accident': return '🚑';
//     case 'Vision': return '👁️';
//     case 'Dental': return '🦷';
//     case 'Critical Illness/Cancer': return '🏥';
//     default: return '📊';
//   }
// };

