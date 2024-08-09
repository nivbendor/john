import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { LIFE_ADD_CONFIG } from '../../utils/insuranceConfig';
import { EligibilityOption } from '../../utils/insuranceTypes';

interface CoverageRangeSliderProps {
  employeeCoverage: number;
  spouseCoverage: number;
  eligibility: EligibilityOption;
  onCoverageChange: (employee: number, spouse: number) => void;
}

const CoverageRangeSlider: React.FC<CoverageRangeSliderProps> = ({
  employeeCoverage,
  spouseCoverage,
  eligibility,
  onCoverageChange,
}) => {
  const maxEmployeeCoverage = LIFE_ADD_CONFIG.max_coverage_amount_individual;
  const maxSpouseCoverage = Math.min(
    employeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional,
    LIFE_ADD_CONFIG.max_coverage_amount_spouse
  );

  const showSpouseCoverage = eligibility === 'Individual + Spouse' || eligibility === 'Family';

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let newEmployeeCoverage = newValue[0];
    let newSpouseCoverage = newValue[1];

    // Add logic here to respect the conditions and minimum distance

    onCoverageChange(newEmployeeCoverage, newSpouseCoverage);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Coverage amount'}
        value={[employeeCoverage, showSpouseCoverage ? spouseCoverage : employeeCoverage]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={formatCurrency}
        disableSwap
        min={0}
        max={maxEmployeeCoverage}
        step={LIFE_ADD_CONFIG.units}
        // Add custom styling here
      />
      <div>
        <p>Employee Coverage: {formatCurrency(employeeCoverage)}</p>
        {showSpouseCoverage && <p>Spouse Coverage: {formatCurrency(spouseCoverage)}</p>}
      </div>
    </Box>
  );
};

export default CoverageRangeSlider;