import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { Product, IndividualInfo, Plan, USState, ToggleState, CostView } from '../utils/insuranceTypes';
import { calculatePremiums } from '../utils/insuranceUtils';
import ProductDetails from '../components/ProductDetails';
import ActiveProductsToggle from '../components/checkout';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../components/ui/select';
import ProductSelector from '../components/ProductSelector';
import { PRODUCTS } from '../utils/insuranceConfig';
import { useCostView } from '../components/CostView';
import IndividualInfoForm from '../components/IndividualInfoForm';
import '../styles/iconSettings.css';
import { parseUrlParams, showCostPerHour } from 'utils/parseUrlParams';
import InsuranceResources from '../components/Resource';
import Funnel from '../components/Funnel';

// Define all necessary types and constants
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
  isExpanded: undefined
};

const initialProducts: Record<Product, boolean> = {
  LTD: true, STD: true, 'Life / AD&D': true, Accident: true, Vision: true, Dental: true, 'Critical Illness/Cancer': true
};

const initialPremiums: PremiumResult = {
  LTD: 0, STD: 0, 'Life / AD&D': 0, Accident: 0, Vision: 0, Dental: 0, 'Critical Illness/Cancer': 0
};

type BusinessProps = {
  setProducts: React.Dispatch<React.SetStateAction<Record<Product, boolean>>>;
  setTotalCost: React.Dispatch<React.SetStateAction<number>>;
  funnelData?: {
    zipCode: string;
    age: string;
    coverage: string;
  };
};

const Business: React.FC<BusinessProps> = ({ setProducts, setTotalCost, funnelData }) => {
  const [individualInfo, setIndividualInfo] = useState<IndividualInfo>(() => {
    const urlParams = parseUrlParams();
     // Convert age to a number if it's a string
     const normalizedFunnelData = {
      ...funnelData,
      age: funnelData?.age ? parseInt(funnelData.age, 10) : initialIndividualInfo.age,
    };
    return { ...initialIndividualInfo, ...urlParams, ...normalizedFunnelData };
  });
  const [showCostPerHour] = useState(() => {
    const { showCostPerHour } = parseUrlParams();
    return showCostPerHour;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>('LTD');
  const { costView, setCostView } = useCostView();
  const [localProducts, setLocalProducts] = useState<Record<Product, boolean>>(initialProducts);
  const [premiums, setPremiums] = useState<PremiumResult>(initialPremiums);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [productPlans, setProductPlans] = useState<Record<Product, Plan>>(() =>
    PRODUCTS.reduce((acc, product) => ({
      ...acc,
      [product]: 'Basic'
    }), {} as Record<Product, Plan>)
  );

  const calculateAllPremiums = useCallback(() => {
    const allPremiums: PremiumResult = { ...initialPremiums };
    PRODUCTS.forEach(product => {
      allPremiums[product] = calculatePremiums(individualInfo, productPlans[product], product, costView);
    });
    return allPremiums;
  }, [individualInfo, productPlans, costView]);

  const recalculatePremium = useCallback((product: Product, plan: Plan) => {
    const newPremium = calculatePremiums(individualInfo, plan, product, costView);
    setPremiums(prev => ({
      ...prev,
      [product]: newPremium
    }));
  }, [individualInfo, costView]);

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

      const newInfo = {
        ...prev,
        [name]: value,
      };

      if (name === 'annualSalary') {
        const newLTDPlan = newInfo.annualSalary >= 100000 ? 'Premium' : 'Basic';
        if (newLTDPlan !== productPlans.LTD) {
          setProductPlans(prevPlans => ({
            ...prevPlans,
            LTD: newLTDPlan,
          }));
          recalculatePremium('LTD', newLTDPlan);
        }
      }

      return newInfo;
    });
  }, [productPlans.LTD, recalculatePremium]);

  useEffect(() => {
    const newPremiums = calculateAllPremiums();
    setPremiums(newPremiums);
  }, [calculateAllPremiums]);

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value;
    const numericValue = parseFloat(rawValue.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(numericValue)) {
      handleInputChange({ name: 'annualSalary', value: numericValue });
    }
  };

  const QuoteSection = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Get My Company Benefits</h3>
      <a 
        href="https://www.jotform.com/form/241625750442150/?utm_source=John" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Get Instant Quote
      </a>
    </div>
  );

  const [showFunnel, setShowFunnel] = useState(() => {
    const { showFunnel } = parseUrlParams();
    return showFunnel;
  });

  const handleFunnelComplete = (funnelData: any) => {
    console.log('Funnel completed with data:', funnelData); // Check if this logs correctly
    setIndividualInfo(prevInfo => ({
      ...prevInfo,
      ...funnelData,
    }));
    setShowFunnel(false); // This should hide the funnel and show the calculator
    console.log('showFunnel:', showFunnel); // This should log false after the funnel completes

  };

  return (
    <div className="min-h-screen bg-gray-100 lg:px-6">
    {showFunnel ? (
      <Funnel onComplete={handleFunnelComplete} />
    ) : (
      <div className="container mx-auto px-0 lg:px-4 py-6 w-full main-container">
        {/* The calculator UI */}
        <div className="w-full lg:w-2/3 space-y-2">
          <div className="bg-white rounded-xl shadow-md p-4 lg:pl-2">
            <ProductSelector
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              products={PRODUCTS}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/3 rightrail individual-info-form-desktop lg:pl-8">
          <IndividualInfoForm
            individualInfo={individualInfo}
            handleIndividualInfoChange={handleInputChange}
            handleSalaryChange={handleSalaryChange}
            errors={errors}
            costView={costView}
            setCostView={setCostView}
          />
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-7 px-10 sm:container mx-auto px-0 lg:px-4 py-6 w-full main-container">
        <div className="w-full lg:w-2/3 space-y-8 lg:pl-8 ">
          <div className="bg-white rounded-xl shadow-md p-6">
            <ProductDetails
              plans={productPlans}
              selectedProduct={selectedProduct}
              premium={premiums[selectedProduct]}
              costView={costView}
              individualInfo={individualInfo}
              setProductPlan={setProductPlan}
              handleIndividualInfoChange={handleInputChange}
              errors={errors}
              recalculatePremium={recalculatePremium}
              activeProducts={localProducts}
            />
          </div>
          {showCostPerHour && (
            <div className="">
              <QuoteSection />
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3">
          <div className="flex items-center justify-between px-4 lg:px-0">
            <h2 className="p-3 text-xl font-semibold mb-2">Cost View</h2>
            <Select
              value={costView}
              onValueChange={(value: CostView) => setCostView(value)}
            >
              <SelectTrigger className="w-full lg:w-[120px]">
                <SelectValue>{costView}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Semi-Monthly">Semi-Monthly</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 top-8 mb-8">
            <ActiveProductsToggle
              plan={productPlans}
              products={localProducts}
              premiums={premiums}
              costView={costView}
              individualInfo={individualInfo}
              handleToggleChange={(product, isActive) => {
                setLocalProducts(prev => ({
                  ...prev,
                  [product]: isActive,
                }));
              }}
            />
          </div>
          <span className="hidden lg:block">
            <InsuranceResources />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Business;
