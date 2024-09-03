import React, { useState } from 'react';
import { motion } from 'framer-motion';

type FunnelProps = {
  onComplete: (funnelData: any) => void;
};

const Funnel: React.FC<FunnelProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    zipCode: '',
    age: '',
    coverage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const steps = [
    // Step 1: Zip Code
    <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold text-center mb-4">Let's start with the hardest question</h1>
      <p className="text-center mb-6">What's your Zip?</p>
      <input
        type="text"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleInputChange}
        maxLength={5}
        className="w-full max-w-sm py-2 px-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Enter 5 digit zip code"
      />
    </motion.div>,

    // Step 2: Age
    <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold text-center mb-4">It already feels a little bit more personal, let me ask you this</h1>
      <p className="text-center mb-6">How old are you?</p>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        min="18"
        max="99"
        className="w-full max-w-sm py-2 px-3 border border-gray-300 rounded-lg mb-8"
        placeholder="Enter your age"
      />
    </motion.div>,

    // Step 3: Coverage
    <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold text-center mb-4">Last question</h1>
      <p className="text-center mb-6">Who do you have in mind to include in the coverage?</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {['Me', '+Spouse', '+Children', 'Family'].map((option) => (
          <button
            key={option}
            className={`py-3 px-4 rounded-lg border transition-colors ${
              formData.coverage === option ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300'
            }`}
            onClick={() => setFormData({ ...formData, coverage: option })}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 md:p-8">
      <div className="flex-grow flex flex-col justify-center items-center">
        {steps[step]}
        <button
          className={`w-full max-w-sm py-3 rounded-lg text-white font-semibold transition-colors ${
            (step === 0 && formData.zipCode.length === 5) ||
            (step === 1 && formData.age) ||
            (step === 2 && formData.coverage)
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handleNext}
          disabled={
            (step === 0 && formData.zipCode.length !== 5) ||
            (step === 1 && !formData.age) ||
            (step === 2 && !formData.coverage)
          }
        >
          {step < steps.length - 1 ? 'NEXT' : 'COMPLETE'}
        </button>
      </div>
    </div>
  );
};

export default Funnel;
