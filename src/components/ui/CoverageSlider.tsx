import React from 'react';
import { Slider, Box, Typography } from '@mui/material';
import { Card, CardContent } from "./card";
import { EligibilityOption, IndividualInfo } from '../../utils/insuranceTypes';
import { LIFE_ADD_CONFIG } from '../../utils/insuranceConfig';
import { getLifeADDRate } from '../../utils/insuranceUtils';

interface CoverageSliderProps {
  individualInfo: IndividualInfo;
  onCoverageChange: (employee: number, spouse: number) => void;
}

const CoverageSlider: React.FC<CoverageSliderProps> = ({
  individualInfo,
  onCoverageChange,
}) => {
  const { employeeCoverage, spouseCoverage, eligibility, age } = individualInfo;
  const maxEmployeeCoverage = LIFE_ADD_CONFIG.max_coverage_amount_individual;
  const maxSpouseCoverage = Math.min(
    employeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional,
    LIFE_ADD_CONFIG.max_coverage_amount_spouse
  );

  const handleEmployeeCoverageChange = (event: Event, newValue: number | number[]) => {
    const newEmployeeCoverage = Array.isArray(newValue) ? newValue[0] : newValue;

    let newSpouseCoverage = spouseCoverage;
    if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
      newSpouseCoverage = Math.min(spouseCoverage, newEmployeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional);
    } else {
      newSpouseCoverage = 0;
    }

    onCoverageChange(newEmployeeCoverage, newSpouseCoverage);
  };

  const handleSpouseCoverageChange = (event: Event, newValue: number | number[]) => {
    const newSpouseCoverage = Array.isArray(newValue) ? newValue[0] : newValue;

    const constrainedSpouseCoverage = Math.min(newSpouseCoverage, maxSpouseCoverage);

    onCoverageChange(employeeCoverage, constrainedSpouseCoverage);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const showSpouseCoverage = eligibility === 'Individual + Spouse' || eligibility === 'Family';

  const rate = getLifeADDRate(age);
  const employeePremium = (employeeCoverage / LIFE_ADD_CONFIG.units) * rate;
  const spousePremium = showSpouseCoverage ? (spouseCoverage / LIFE_ADD_CONFIG.units) * rate : 0;

  return (
    <Card className="w-full max-w-md mx-auto lg:max-w-sm"> {/* Responsive width adjustment */}
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Typography gutterBottom>Individual Coverage</Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
          </Box>
          <Slider
            getAriaLabel={() => 'Individual Coverage'}
            value={employeeCoverage}
            onChange={handleEmployeeCoverageChange}
            valueLabelDisplay="on" // Always show the value
            getAriaValueText={formatCurrency}
            valueLabelFormat={formatCurrency}
            min={0}
            max={maxEmployeeCoverage}
            step={10000} // Increment by 10,000
          />
          {showSpouseCoverage && (
            <>
              <Typography gutterBottom>Spouse Coverage</Typography>
              <Box display="flex" alignItems="center" justifyContent="space-between">
              </Box>
              <Slider
                getAriaLabel={() => 'Spouse coverage amount'}
                value={spouseCoverage}
                onChange={handleSpouseCoverageChange}
                valueLabelDisplay="on" // Always show the value
                getAriaValueText={formatCurrency}
                valueLabelFormat={formatCurrency}
                min={0}
                max={maxSpouseCoverage}
                step={10000} // Increment by 10,000
              />
            </>
          )}
         
        </Box>
      </CardContent>
    </Card>
  );
};

export default CoverageSlider;
