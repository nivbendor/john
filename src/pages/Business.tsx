import React, { useState, useCallback, useEffect } from 'react';
import { Product, IndividualInfo, Plan, USState, CostView, ToggleState } from '../utils/insuranceTypes';
import { calculatePremiums } from '../utils/insuranceUtils';
import ProductDetails from '../components/ProductDetails';
import IndividualInfoForm from '../components/IndividualInfoForm';
import ActiveProductsToggle from '../components/ActiveProductsToggle';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from 'components/ui/select';
import ProductSelector from 'components/ProductSelector';
import { PRODUCTS } from '../utils/insuranceConfig';
import { Avatar, AvatarFallback, AvatarImage } from '../components/Avatar';
import { parseUrlParams } from '../utils/parseUrlParams';

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
};

const initialProducts: Record<Product, boolean> = {
  LTD: true, STD: true, 'Life / AD&D': true, Accident: true, Vision: true, Dental: true, 'Critical Illness/Cancer': true
};

const initialPremiums: PremiumResult = {
  LTD: 0, STD: 0, 'Life / AD&D': 0, Accident: 0, Vision: 0, Dental: 0, 'Critical Illness/Cancer': 0
};

function Business() {
  const [individualInfo, setIndividualInfo] = useState<IndividualInfo>(() => {
    const urlParams = parseUrlParams();
    return { ...initialIndividualInfo, ...urlParams };
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>('LTD');
  const [costView, setCostView] = useState<CostView>('Monthly');
  const [products, setProducts] = useState<Record<Product, boolean>>(initialProducts);
  const [premiums, setPremiums] = useState<PremiumResult>(initialPremiums);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [productPlans, setProductPlans] = useState<Record<Product, Plan>>(() => 
    PRODUCTS.reduce((acc, product) => ({
      ...acc,
      [product]: 'Basic'
    }), {} as Record<Product, Plan>)
  );
  const [toggleStates, setToggleStates] = useState<Record<Product, ToggleState>>(() => {
    const initialStates: Record<Product, ToggleState> = {} as Record<Product, ToggleState>;
    Object.keys(initialProducts).forEach((product) => {
      initialStates[product as Product] = 'All';
    });
    return initialStates;
  });

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

      // Recalculate LTD plan if annual salary changes
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

  const [activeProducts, setActiveProducts] = useState<Record<Product, boolean>>(() => {
    const initialState = PRODUCTS.reduce((acc, product) => ({
      ...acc,
      [product]: product !== 'Vision' && product !== 'Critical Illness/Cancer'
    }), {} as Record<Product, boolean>);
    return initialState;
  });


  const handleToggleChange = useCallback((product: Product, isActive: boolean) => {
    setActiveProducts(prev => ({
      ...prev,
      [product]: isActive,
    }));
  }, []);

  useEffect(() => {
    const newPremiums = calculateAllPremiums();
    setPremiums(newPremiums);
  }, [calculateAllPremiums]);

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

    const newPremiums = calculateAllPremiums();
    setPremiums(newPremiums);
  }, [individualInfo.businessEmployees, calculateAllPremiums]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 w-full lg:w-1/2 mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-bold">Howdy</h1>
              <IndividualInfoForm individualInfo={individualInfo} handleIndividualInfoChange={handleInputChange} errors={errors} />
            </div>
            
            <div className="text-right">
              <h2 className="text-xl font-semibold mb-2">Cost View</h2>
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
                  <SelectItem value="Bi-Weekly">Bi-Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <ProductSelector
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                products={PRODUCTS}
              />
            </div>
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
                activeProducts={products}
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <ActiveProductsToggle
                plan={productPlans}
                products={activeProducts}
                premiums={premiums}
                costView={costView}
                individualInfo={individualInfo}
                handleToggleChange={handleToggleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Business;