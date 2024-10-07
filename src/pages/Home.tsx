import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { Product, IndividualInfo, Plan, USState, CostView, ToggleState } from '../utils/insuranceTypes';
import { calculatePremiums } from '../utils/insuranceUtils';
import CostEstimate from '../components/CostEstimate';
import ProductDetails from '../components/ProductDetails';
import IndividualInfoForm from '../components/IndividualInfoForm';
import ActiveProductsToggle from '../components/checkout';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../components/ui/select';
import Tabs from '../components/ui/tabs';
import ProductSelector from '../components/ProductSelector';
import { PRODUCTS } from '../utils/insuranceConfig';


type PremiumResult = Record<Product, number>;

const initialIndividualInfo: IndividualInfo = {
  zipCode: '37707',
  businessEmployees: 3,
  state: 'NJ' as USState,
  age: 45,
  annualSalary: 200000,
  eligibility: 'Individual',
  employeeCoverage: 150000,
  spouseCoverage: 20000,
  numberOfChildren: 2,
  isExpanded: undefined,
  ltdPlan: 'Basic'
};

const initialProducts: Record<Product, boolean> = {
  LTD: true, STD: true, 'Life / AD&D': true, Accident: true, Vision: true, Dental: true, 'Critical Illness/Cancer': true
};

const initialPremiums: PremiumResult = {
  LTD: 0,
  STD: 0,
  'Life / AD&D': 0,
  Accident: 0,
  Vision: 0,
  Dental: 0,
  'Critical Illness/Cancer': 0
};


function Home() {
  const [individualInfo, setIndividualInfo] = useState<IndividualInfo>(initialIndividualInfo);
  const [selectedProduct, setSelectedProduct] = useState<Product>('LTD');
  const [costView, setCostView] = useState<CostView>('Monthly');
  const [products, setProducts] = useState<Record<Product, boolean>>(initialProducts);
  const [premiums, setPremiums] = useState<PremiumResult>(initialPremiums);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'business' | 'owner' | 'employees'>('business');
  const [totalEmployees, setTotalEmployees] = useState(1);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [productPlans, setProductPlans] = useState<Record<Product, Plan>>(() =>
    PRODUCTS.reduce((acc, product) => ({
      ...acc,
      [product]: product === 'STD' ? 'Basic' : 'Basic'
    }), {} as Record<Product, Plan>)
  );

  const [toggleStates, setToggleStates] = useState<Record<Product, ToggleState>>(() => {
    const initialStates: Record<Product, ToggleState> = {} as Record<Product, ToggleState>;
    Object.keys(initialProducts).forEach((product) => {
      initialStates[product as Product] = 'All';
    });
    return initialStates;
  });

  const setProductPlan = useCallback((product: Product, plan: Plan) => {
    setProductPlans(prev => ({ ...prev, [product]: plan }));
  }, []);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
  ) => {
    const name = 'target' in e ? e.target.name : e.name;
    let value = 'target' in e ? e.target.value : e.value;

    setIndividualInfo((prev) => {

      if (name === 'businessEmployees') {
        value = parseInt(value as string, 10);
      }
      const personType = "Individual"
      return {
        ...prev,
        ...(personType && {
          [personType]: {
            ...prev[personType],
            [name]: value,
          }
        }),
        ...((name === 'zipCode' || name === 'businessEmployees') && {
          [name]: value,
        }),
      };

    });
  }, []);

  const recalculatePremium = useCallback((product: Product, plan: Plan) => {
    if (product === 'LTD') {
      const newPremium = calculatePremiums(individualInfo, product, costView, plan); // Corrected order
      setPremiums(prev => ({
        ...prev,
        [product]: newPremium
      }));
    } else {
      const newPremium = calculatePremiums(individualInfo, product, costView, plan); // Corrected order
      setPremiums(prev => ({
        ...prev,
        [product]: newPremium
      }));
    }
  }, [individualInfo, costView, calculatePremiums]);

  const [activeProducts, setActiveProducts] = useState<Record<Product, boolean>>(() => {
    const initialState = PRODUCTS.reduce((acc, product) => ({
      ...acc,
      [product]: product !== 'Vision' && product !== 'Critical Illness/Cancer'
    }), {} as Record<Product, boolean>);
    return initialState;
  });

  const handleToggleChange = (product: Product, isActive: boolean) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [product]: isActive,
    }));
    setForceUpdate(prev => prev + 1);
  };

  const calculateAllPremiums = useCallback(() => {
    const allPremiums: PremiumResult = { ...initialPremiums };
    PRODUCTS.forEach(product => {
      allPremiums[product] = calculatePremiums(individualInfo, product, costView, productPlans[product]); // Corrected order
    });
    return allPremiums;
  }, [individualInfo, productPlans, costView]);

  useEffect(() => {
    if (individualInfo.businessEmployees === 0) {
      setToggleStates((prevStates) => {
        const newStates = { ...prevStates };
        Object.keys(newStates).forEach((product) => {
          if (newStates[product as Product] === 'None') { return; }
          newStates[product as Product] = 'Owner';
        });
        return newStates;
      });
    }

    const newPremiums = { ...initialPremiums };
    Object.keys(productPlans).forEach((product) => {
      newPremiums[product as Product] = calculatePremiums(
        individualInfo,
        product as Product, // Corrected order
        costView,
        productPlans[product as Product] // Corrected order
      );
    });
    setPremiums(calculateAllPremiums);
  }, [individualInfo.businessEmployees, productPlans, costView, calculatePremiums]);

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value;
    const numericValue = parseFloat(rawValue.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(numericValue)) {
      handleInputChange({ name: 'annualSalary', value: numericValue });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* JSX content */}
    </div>
  );

}
export default Home;
