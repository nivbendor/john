import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import colors from '../styles/colors';
import { IndividualInfo, CostView } from '../utils/insuranceTypes';

const useColorFromUrl = () => {
  const [color, setColor] = useState(colors.default);

  useEffect(() => {
    const updateColor = () => {
      const params = new URLSearchParams(window.location.search);
      const colorParam = params.get('color');
      if (colorParam === '1') setColor(colors.color1);
      else if (colorParam === '2') setColor(colors.color2);
      else if (colorParam === '3') setColor(colors.color3);
      else setColor(colors.default);
    };

    updateColor();

    window.addEventListener('popstate', updateColor);
    return () => window.removeEventListener('popstate', updateColor);
  }, []);

  return color;
};

interface IndividualInfoFormProps {
  individualInfo: IndividualInfo;
  handleIndividualInfoChange: (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: number | string }) => void;
  errors: Record<string, string>;
  costView: CostView;
  setCostView: (value: CostView) => void;
}

const IndividualInfoForm: React.FC<IndividualInfoFormProps> = ({
  individualInfo,
  handleIndividualInfoChange,
  errors,
  costView,
  setCostView
}) => {
  const ageOptions = Array.from({ length: 100 }, (_, i) => i); // Create age options from 1 to 100
  const costViewOptions: CostView[] = ['Monthly', 'Semi-Monthly', 'Bi-Weekly', 'Weekly'];
  const borderColor = useColorFromUrl();

  // Function to display the age field, showing a dash if age is 0 (unset)
  const displayAge = () => {
    if (individualInfo.age === 0) {
      return '-'; // Display dash if age is unset
    }
    return individualInfo.age.toString(); // Display the actual age if set
  };

  return (
    <div className="w-full bg-white">
      {/* Blue wavy borders */}
      <div className="h-1 rounded-b-full" style={{ backgroundColor: borderColor }}> </div>
      
      <div className="py-2 pl-0.5">
        <h3 className="text-lg font-semibold mb-1 text-left">Individual Information</h3>
        
        {/* Form Fields */}
        <div className="flex flex-col space-y-4">
          
          {/* Mobile layout */}
          <div className="lg:hidden xl:hidden 2xl:hidden">
            {/* First row: Age, Zip Code */}
            <div className="flex justify-between items-end mb-2">
              {/* Age Field */}
              <div className="flex flex-col items-center w-1/2 pt-2 px-6">
                <Label htmlFor="age" className="font-normal text-gray-600 mb-3">
                  Age
                </Label>
                <Select
                  value={individualInfo.age.toString()}
                  onValueChange={(value) =>
                    handleIndividualInfoChange({
                      target: { name: 'age', value: parseInt(value) },
                    } as any)
                  }
                >
                  <SelectTrigger className="w-full h-10 bg-white rounded-lg border border-gray-300 text-center px-2">
                    <SelectValue>{individualInfo.age}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-px h-10" style={{ backgroundColor: borderColor }}></div>
              
              {/* Zip Code Field */}
              <div className="flex flex-col items-center w-1/2 px-8">
                <Label htmlFor="zipCode" className="font-normal text-gray-600 mb-1">
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={individualInfo.zipCode}
                  onChange={(e) => {
                    console.log(`Zip Code input change: ${e.target.value}`);
                    handleIndividualInfoChange(e);
                  }}
                  className="w-full h-10 bg-white-100 rounded-lg border border-gray-300 text-center px-2"
                />
              </div>
            </div>

            {/* Second row: Divider line */}
            <div className="w-full h-px bg-gray-300 my-3"></div>

            {/* Third row: Cost View */}
            <div className="flex flex-row items-center justify-center mt-2">
              <Label htmlFor="costView" className="font-normal text-gray-600 mb-1">
                Cost View
              </Label>
              <Select className="w-3/4" value={costView} onValueChange={setCostView}>
                <SelectTrigger className="justify-center">
                  <SelectValue>{costView}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {costViewOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
  
          {/* Desktop layout */}
          <div className="hidden lg:flex lg:items-center lg:space-y-0">
            <div className="hidden lg:block lg:mr-4">    
              <img
                src={`${process.env.PUBLIC_URL}/profile_avatar.png`}
                alt="Profile Avatar"
                className="w-16 h-16 rounded-full"
              />
            </div>
            {/* Age Field */}
            <div className="flex flex-col items-center flex-1 pr-2 pl-1" >
              <Label htmlFor="age" className="font-normal text-gray-600 pb-2">
                Age
              </Label>
              <Select
                value={individualInfo.age !== 0 ? individualInfo.age.toString() : '-'}
                onValueChange={(value) =>
                  handleIndividualInfoChange({
                    target: { name: 'age', value: parseInt(value) },
                  } as any)
                }
              >
                <SelectTrigger className="w-24 h-10 bg-white rounded-lg border border-gray-300 text-center">
                  <SelectValue>{displayAge()}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
    
            <div className="w-px h-10" style={{ backgroundColor: borderColor }}></div>
    
            {/* Zip Code Field */}
            <div className="flex flex-col items-center flex-1 pr-2 pl-1">
              <Label htmlFor="zipCode" className="font-normal text-gray-600">
                Zip Code
              </Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={individualInfo.zipCode}
                onChange={handleIndividualInfoChange}
                className="w-24 h-10 bg-white-100 rounded-lg border-0 text-center"
              />
            </div>
    
            <div className="w-px h-10" style={{ backgroundColor: borderColor }}></div>
    
            {/* Cost View for Large Screens */}
            <div className="flex flex-col items-center flex-1 pr-2 pl-1">
              <Label htmlFor="costView" className="font-normal text-gray-600 pb-2">
                Pay Period
              </Label>
              <Select className="w-28" value={costView} onValueChange={setCostView}>
                <SelectTrigger>
                  <SelectValue>{costView}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {costViewOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
  
      {/* Blue wavy borders */}
      <div className="h-1 rounded-t-full" style={{ backgroundColor: borderColor }}></div>
    </div>
  );
};

export default IndividualInfoForm;