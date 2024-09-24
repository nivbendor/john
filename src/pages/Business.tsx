import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { Product, IndividualInfo, Plan, USState, CostView, EligibilityOption, EligibilityPerProduct } from '../utils/insuranceTypes';
import { calculatePremiums, getStateFromZip, getZipCodeRegion, PRODUCT_ELIGIBILITY_OPTIONS } from '../utils/insuranceUtils';
import ProductDetails from '../components/ProductDetails';
import ActiveProductsToggle from '../components/checkout';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../components/ui/select';
import ProductSelector from '../components/ProductSelector';
import { defaultPlans, PRODUCTS } from '../utils/insuranceConfig';
import { useCostView } from '../components/CostView';
import IndividualInfoForm from '../components/IndividualInfoForm';
import '../styles/iconSettings.css';
import { parseUrlParams, zipDebug} from 'utils/parseUrlParams';
import InsuranceResources from '../components/Resource';
import Funnel from '../components/Funnel';
import ZipDebugPopup from '../components/ZipDebugPopup';
import ZipDebugPanel from '../components/ZipDebugPopup';


// Define all necessary types and constants
type PremiumResult = Record<Product, number>;

// Individual Info - Defaults
const initialIndividualInfo: IndividualInfo = {
  zipCode: '',
  businessEmployees: 3,
  state: '' as USState,
  age: 0,
  annualSalary: 0,
  eligibility: 'Individual',
  employeeCoverage: 20000,
  spouseCoverage: 10000,
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
  onZipDebug: (debugInfo: {
    zipInput: string;
    matchingPrefix: string;
    matchingRegionRate: string;
    matchingState: string;
  }) => void;
};

const Business: React.FC<BusinessProps> = ({ setProducts, setTotalCost, funnelData, onZipDebug }) => {
  const [individualInfo, setIndividualInfo] = useState<IndividualInfo>(() => {
    const urlParams = parseUrlParams();
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

  const [selectedEligibilityPerProduct, setSelectedEligibilityPerProduct] = useState<EligibilityPerProduct>(() => {
    return Object.entries(PRODUCT_ELIGIBILITY_OPTIONS).reduce((prev, array) => ({ ...prev, [array[0]]: array[1][0] }), {}) as EligibilityPerProduct;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>('LTD');
  const { costView, setCostView } = useCostView();
  const [localProducts, setLocalProducts] = useState<Record<Product, boolean>>(initialProducts);
  const [premiums, setPremiums] = useState<PremiumResult>(initialPremiums);
  const [productPlans, setProductPlans] = useState<Record<Product, Plan>>(() =>
    PRODUCTS.reduce((acc, product) => ({
      ...acc,
      [product]: defaultPlans[product],
    }), {} as Record<Product, Plan>)
  );

  const updateZipDebugInfo = useCallback((zipCode: string, state: USState) => {
    if (zipDebug) {
      const region = getZipCodeRegion(zipCode);
      const derivedState = getStateFromZip(zipCode);
      onZipDebug({
        zipInput: zipCode,
        matchingPrefix: zipCode.substring(0, 3),
        matchingRegionRate: region ? region.toString() : 'Not found',
        matchingState: derivedState || state || 'Not found',
      });
    }
  }, [onZipDebug]);

  useEffect(() => {
    if (zipDebug) {
      updateZipDebugInfo(individualInfo.zipCode, individualInfo.state);
    }
  }, [zipDebug, individualInfo.zipCode, individualInfo.state, updateZipDebugInfo]);

  const recalculatePremium = useCallback((product: Product, plan: Plan) => {
    const newPremium = calculatePremiums(individualInfo, product, costView, plan);
    setPremiums(prev => ({
      ...prev,
      [product]: newPremium,
    }));
  }, [individualInfo, costView]);

  const calculateAllPremiums = useCallback(() => {
    const allPremiums: PremiumResult = { ...initialPremiums };
    PRODUCTS.forEach(product => {
      allPremiums[product] = calculatePremiums(individualInfo, product, costView, productPlans[product]);
    });
    return allPremiums;
  }, [individualInfo, costView, productPlans]);

  const setProductPlan = useCallback((product: Product, plan: Plan) => {
    setProductPlans(prev => ({ ...prev, [product]: plan }));
    recalculatePremium(product, plan);
  }, [recalculatePremium]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { name: string; value: string | number },
  ) => {
    const name = 'target' in e ? e.target.name : e.name;
    let value = 'target' in e ? e.target.value : e.value;

    setIndividualInfo((prev) => {
      if (name === 'businessEmployees') {
        value = parseInt(value as string, 10);
      }

      const newInfo = { ...prev, [name]: value };

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
      
      if (zipDebug && (name === 'zipCode' || name === 'state')) {
        updateZipDebugInfo(newInfo.zipCode, newInfo.state);
      }
  
      return newInfo;
    });
  }, [zipDebug, updateZipDebugInfo, productPlans.LTD, recalculatePremium]);

  useEffect(() => {
    const newPremiums = calculateAllPremiums();
    setPremiums(newPremiums);
  }, [calculateAllPremiums]);

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value;
    const numericValue = parseFloat(rawValue.replace(/[^0-9.-]+/g, ""));
    const value = isNaN(numericValue) ? 0 : numericValue;
    handleInputChange({ name: 'annualSalary', value });
  };

  const QuoteSection = () => (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-3">Get My Company Benefits</h3>
      <a 
        href="https://www.jotform.com/form/241625750442150/?utm_source=John" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-[#2df1ac] text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Register My Company
      </a>
    </div>
  );

  const [showFunnel, setShowFunnel] = useState(() => {
    const { showFunnel } = parseUrlParams();
    return showFunnel;
  });

  const handleFunnelComplete = (funnelData: any) => {
    setIndividualInfo(prevInfo => ({
      ...prevInfo,
      ...funnelData,
    }));
    setShowFunnel(false);
  };

  
  return (
    <div className="min-h-screen bg-gray-100 lg:px-6">
      {showFunnel ? (
        <Funnel onComplete={handleFunnelComplete} />
      ) : (
        <div className="container mx-auto px-0 lg:px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-7">
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-2">
                <IndividualInfoForm
                  individualInfo={individualInfo}
                  handleIndividualInfoChange={handleInputChange}
                  handleSalaryChange={handleSalaryChange}
                  errors={{}}
                  costView={costView}
                  setCostView={setCostView}
                />
              </div>
              <div className="bg-white rounded-xl shadow-md p-2 lg:pl-2">
                <ProductSelector
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  products={PRODUCTS}
                />
              </div>
              <div className="bg-white rounded-xl shadow-md p-3">
                <ProductDetails
                  plans={productPlans}
                  selectedProduct={selectedProduct}
                  premium={premiums[selectedProduct]}
                  costView={costView}
                  individualInfo={individualInfo}
                  setProductPlan={setProductPlan}
                  selectedEligibilityPerProduct={selectedEligibilityPerProduct}
                  setSelectedEligibilityPerProduct={setSelectedEligibilityPerProduct}
                  handleIndividualInfoChange={handleInputChange}
                  errors={{}}
                  recalculatePremium={recalculatePremium}
                  activeProducts={localProducts}
                />
              </div>
              {showCostPerHour && <div>Cost per hour component would go here</div>}
            </div>

            <div className="w-full lg:w-1/3 space-y-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <ActiveProductsToggle
                  plan={productPlans}
                  products={localProducts}
                  premiums={premiums}
                  costView={costView}
                  individualInfo={individualInfo}
                  selectedEligibilityPerProduct={selectedEligibilityPerProduct}
                  handleToggleChange={(product, isActive) => {
                    setLocalProducts(prev => ({
                      ...prev,
                      [product]: isActive,
                    }));
                  }}
                />
              </div>
              <QuoteSection />
              <InsuranceResources />
            </div>
          </div>
        </div>
      )}
      {zipDebug && (
        <ZipDebugPanel
          zipInput={individualInfo.zipCode}
          matchingPrefix={individualInfo.zipCode.substring(0, 3)}
          matchingRegionRate={getZipCodeRegion(individualInfo.zipCode)?.toString() || 'Not found'}
          matchingState={getStateFromZip(individualInfo.zipCode) || individualInfo.state || 'Not found'}
        />
      )}
    </div>
  );
};

export default Business;