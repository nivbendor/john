import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { config } from './config';

interface FunnelState {
  zipCode: string;
  age: string;
  dependents: string;
}

const Funnel: React.FC = () => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FunnelState>({
    zipCode: '',
    age: '',
    dependents: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const stepFromPath = location.pathname.split('/')[1];
    setStep(parseInt(stepFromPath) || 0);
  }, [location]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      navigate(`/${step + 1}`);
    } else {
      const eligibilityMap: { [key: string]: number } = {
        'Myself': 1,
        '+Spouse': 2,
        '+Children': 3,
        'Family': 4,
      };
      const url = `https://nivbendor.github.io/john/?zipCode=${state.zipCode}&age=${state.age}&annualSalary=111000&eligibility=${eligibilityMap[state.dependents]}`;
      window.location.href = url;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleDependentSelection = (value: string) => {
    setState({ ...state, dependents: value });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{config.splash.headline}</h1>
            <div className="mb-4">
              {/* Placeholder for businesswoman animation */}
              <div className="w-64 h-64 bg-gray-200 mx-auto"></div>
            </div>
            <p className="mb-4">{config.splash.subheadline}</p>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              START
            </button>
          </div>
        );
      case 1:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{config.zipCode.headline}</h1>
            <div className="mb-4">
              {/* Placeholder for image */}
              <div className="w-64 h-64 bg-gray-200 mx-auto"></div>
            </div>
            <p className="mb-4">{config.zipCode.subheadline}</p>
            <input
              type="text"
              name="zipCode"
              value={state.zipCode}
              onChange={handleInputChange}
              placeholder="Enter zip code"
              className="border p-2 mb-4"
              maxLength={5}
              pattern="\d{5}"
            />
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={state.zipCode.length !== 5}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{config.age.headline}</h1>
            <div className="mb-4">
              {/* Placeholder for image */}
              <div className="w-64 h-64 bg-gray-200 mx-auto"></div>
            </div>
            <p className="mb-4">{config.age.subheadline}</p>
            <input
              type="number"
              name="age"
              value={state.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              className="border p-2 mb-4"
              min={21}
              max={90}
            />
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={!state.age || parseInt(state.age) < 21 || parseInt(state.age) > 90}
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{config.dependents.headline}</h1>
            <div className="mb-4">
              {/* Placeholder for image */}
              <div className="w-64 h-64 bg-gray-200 mx-auto"></div>
            </div>
            <p className="mb-4">{config.dependents.subheadline}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['Myself', '+Spouse', '+Children', 'Family'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleDependentSelection(option)}
                  className={`p-2 border ${
                    state.dependents === option ? 'bg-blue-500 text-white' : 'bg-white'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={!state.dependents}
            >
              Let's Cake
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {renderStep()}
      </div>
    </motion.div>
  );
};

export default Funnel;