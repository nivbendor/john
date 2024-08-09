import React from 'react';
import { Slider, Box, Typography } from '@mui/material';
import { Card, CardContent } from "./card";
import { Label } from "./label";
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

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
  if (!Array.isArray(newValue)) {
    return;
  }

  let newEmployeeCoverage = newValue[1];
  let newSpouseCoverage = newValue[0];

  console.log('Slider Moved:', { newEmployeeCoverage, newSpouseCoverage, activeThumb });

  // Calculate the maximum spouse coverage based on employee coverage
  const maxSpouseCoverage = eligibility === 'Individual + Spouse' || eligibility === 'Family'
    ? Math.min(newEmployeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional, LIFE_ADD_CONFIG.max_coverage_amount_spouse)
    : 0;

  if (activeThumb === 1) {
    // Adjusting employee coverage
    newEmployeeCoverage = Math.min(newEmployeeCoverage, LIFE_ADD_CONFIG.max_coverage_amount_individual);
    
    if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
      // Constrain spouse coverage
      newSpouseCoverage = Math.min(newSpouseCoverage, maxSpouseCoverage);
    } else {
      newSpouseCoverage = 0;
    }
  } else if (activeThumb === 0 && (eligibility === 'Individual + Spouse' || eligibility === 'Family')) {
    // Constrain spouse coverage when adjusting spouse slider
    newSpouseCoverage = Math.min(newSpouseCoverage, maxSpouseCoverage);
    // Ensure employee coverage is sufficient to support the spouse coverage
    newEmployeeCoverage = Math.max(newEmployeeCoverage, newSpouseCoverage / LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional);
  }

  console.log('Updated Coverage Values:', { newEmployeeCoverage, newSpouseCoverage });
  onCoverageChange(newEmployeeCoverage, newSpouseCoverage);
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
    <Card className="w-[350px]">
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Typography gutterBottom>Coverage Amount</Typography>
          <Slider
            getAriaLabel={() => 'Coverage amount'}
            value={[employeeCoverage, showSpouseCoverage ? spouseCoverage : employeeCoverage]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={formatCurrency}
            valueLabelFormat={formatCurrency}
            min={0}
            max={maxEmployeeCoverage}
            step={LIFE_ADD_CONFIG.units}
            disableSwap
            sx={{
              '& .MuiSlider-thumb:first-of-type': { color: 'primary.main' },
              '& .MuiSlider-thumb:last-of-type': { color: 'secondary.main' },
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography>Employee Coverage: {formatCurrency(employeeCoverage)} (Premium: {formatCurrency(employeePremium)})</Typography>
            {showSpouseCoverage && (
              <Typography>Spouse Coverage: {formatCurrency(spouseCoverage)} (Premium: {formatCurrency(spousePremium)})</Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CoverageSlider;