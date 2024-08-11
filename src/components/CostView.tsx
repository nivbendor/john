import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CostView } from '../utils/insuranceTypes';

type CostViewContextType = {
  costView: CostView;
  setCostView: (costView: CostView) => void;
};

const CostViewContext = createContext<CostViewContextType | undefined>(undefined);

export const CostViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [costView, setCostView] = useState<CostView>('Monthly');

  return (
    <CostViewContext.Provider value={{ costView, setCostView }}>
      {children}
    </CostViewContext.Provider>
  );
};

export const useCostView = () => {
  const context = useContext(CostViewContext);
  if (context === undefined) {
    throw new Error('useCostView must be used within a CostViewProvider');
  }
  return context;
};