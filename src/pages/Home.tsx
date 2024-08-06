import React, { useState, useCallback, useEffect } from 'react';
import { Product, IndividualInfo, Plan, USState, CostView, ToggleState } from '../utils/insuranceTypes';
import { calculatePremiums } from '../utils/insuranceUtils';
import CostEstimate from '../components/CostEstimate';
import ProductDetails from '../components/ProductDetails';
import IndividualInfoForm from '../components/IndividualInfoForm';
import ActiveProductsToggle from '../components/ActiveProductsToggle';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from 'components/ui/select';
import Tabs from 'components/ui/tabs';
import ProductSelector from 'components/ProductSelector';
import { PRODUCTS } from '../utils/insuranceConfig';


type PremiumResult = Record<Product, number>;




const initialIndividualInfo: IndividualInfo = {
  businessZipCode: '07030',
  businessEmployees: 3,
  state: 'NJ' as USState,
  owner: {
    age: 45,
    annualSalary: 200000,
    eligibility: 'Individual',
    employeeCoverage: 150000,
    spouseCoverage: 20000,
    numberOfChildren: 2,
  },
  employee: {
    age: 35,
    annualSalary: 30000,
    eligibility: 'Individual',
    employeeCoverage: 150000,
    spouseCoverage: 20000,
    numberOfChildren: 2,
  }
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
        ...((name === 'businessZipCode' || name === 'businessEmployees') && {
          [name]: value,
        }),
      };

    });
  }, []);

  const recalculatePremium = useCallback((product: Product, plan: Plan) => {
    // For LTD, only recalculate if annualSalary or plan changes
  if (product === 'LTD') {
    const newPremium = calculatePremiums(individualInfo, plan, product, costView);
    setPremiums(prev => ({
      ...prev,
      [product]: newPremium 
    }));
  } else {
    // For other products, recalculate as before
    const newPremium = calculatePremiums(individualInfo, plan, product, costView);
    setPremiums(prev => ({
      ...prev,
      [product]: newPremium 
    }));
  }
}, [individualInfo, costView, calculatePremiums]);

const handleToggleChange = (product: Product, newState: ToggleState) => {
  setToggleStates((prevStates) => ({
    ...prevStates,
    [product]: newState,
  }));
    setForceUpdate(prev => prev + 1);
};

  const calculateAllPremiums = useCallback(() => {
    const allPremiums: PremiumResult = { ...initialPremiums };
    PRODUCTS.forEach(product => {
      allPremiums[product] = calculatePremiums(individualInfo, productPlans[product], product, costView);
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
      productPlans[product as Product],
      product as Product,
      costView
    );
  });
  setPremiums(calculateAllPremiums);
}, [individualInfo.businessEmployees, productPlans, costView, calculatePremiums]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="top-0 left-0 p-4">
        <h1 className="text-center text-2xl font-bold">John</h1>
      </div>
      <div className="container mx-auto p-4 flex flex-grow overflow-y-auto md:pr-10">
        <div className="main-container flex w-full md:gap-24">
          <div className="md:w-3/4 flex flex-col items-center">
            <div className="w-full md:mb-2 p-1 md:mt-2">
              
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <IndividualInfoForm
                individualInfo={individualInfo}
                handleIndividualInfoChange={handleInputChange}
                errors={errors}
                activeTab={activeTab}
              />
            </div>
            
            <div className="product-tabs-container w-full ">
              <ProductSelector
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                products={PRODUCTS}
              />
              <div className="w-full">
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
                   activeProducts={products}

                />
              </div>
            </div>
          </div>
          <div className="rightrail w-1/3 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Cost View</span>
              <Select
                value={costView}
                onValueChange={(value: CostView) => setCostView(value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue>{costView}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Semi-Monthly">Semi-Monthly</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CostEstimate
                 premiums={premiums}
                 costView={costView}
                 businessEmployees={individualInfo.businessEmployees}
                 toggleStates={toggleStates}
                 activeProducts={products}
            />
            <ActiveProductsToggle
              plan={productPlans}
              products={products}
              premiums={premiums}
              costView={costView}
              individualInfo={individualInfo}
              toggleStates={toggleStates}
              handleToggleChange={handleToggleChange}
            />
         </div>
        </div>
      </div>
    </div>
  );

}
export default Home;