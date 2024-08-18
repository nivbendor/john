import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface InsuranceSummaryProps {
  estimatedPremium: number;
  payrollPercentage: number;
  annualAmount: number;
  phoneNumber: string;
  policyPeriod: string;
  insuranceOptions: any[];
  onCallNowClick: () => void;
}

const InsuranceSummary: React.FC = () => {
  const [props, setProps] = useState<InsuranceSummaryProps | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProps({
      estimatedPremium: Number(params.get('estimatedPremium')),
      payrollPercentage: Number(params.get('payrollPercentage')),
      annualAmount: Number(params.get('annualAmount')),
      phoneNumber: params.get('phoneNumber') || '',
      policyPeriod: params.get('policyPeriod') || '',
      insuranceOptions: JSON.parse(params.get('insuranceOptions') || '[]'),
      onCallNowClick: () => window.location.href = `tel:${params.get('phoneNumber')}`,
    });
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!props) return <div>Loading...</div>;

  return (
    <motion.div 
      className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-orange-400 p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Estimated Premium</h2>
        <div className="text-5xl font-bold mb-2">{formatCurrency(props.estimatedPremium)}<span className="text-2xl">/mo</span></div>
        <p className="text-sm">Only {formatCurrency(props.annualAmount)}/yr or {props.payrollPercentage}% of payroll</p>
        <p className="text-sm mt-2">Give us a call. With a little more information, we can finalize your rate.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-white text-orange-400 py-2 px-4 rounded-full font-bold flex items-center justify-center w-full"
          onClick={props.onCallNowClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call Now {props.phoneNumber}
        </motion.button>
        <p className="text-xs text-center mt-2">Monday-Friday 9am-9pm ET</p>
      </div>
      {/* Add the rest of your component JSX here */}
    </motion.div>
  );
};

export default InsuranceSummary;
