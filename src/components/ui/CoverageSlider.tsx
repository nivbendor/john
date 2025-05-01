import React from 'react';
import { Slider, Typography, Input, Grid } from '@mui/material';
import { Card, CardContent } from "./card";
import { IndividualInfo } from '../../utils/insuranceTypes';
import { LIFE_ADD_CONFIG } from '../../utils/insuranceConfig';
import { useEmployeeAndSpouseCoverage } from '../../hooks/useEmployeeAndSpouseCoverage';
import { isDistributor } from '../../utils/isDistributor';
import { TAA } from '../../utils/config';

interface CoverageSliderProps {
  individualInfo: IndividualInfo;
  onCoverageChange: (employee: number, spouse: number) => void;
}

const CoverageSlider: React.FC<CoverageSliderProps> = ({
  individualInfo,
  onCoverageChange,
}) => {

  const { eligibility } = individualInfo;
  const { employeeCoverage, spouseCoverage, maxEmployeeCoverage, maxSpouseCoverage, step } = useEmployeeAndSpouseCoverage(individualInfo);

  const handleEmployeeCoverageChange = (event: Event, newValue: number | number[]) => {
    const newEmployeeCoverage = Array.isArray(newValue) ? newValue[0] : newValue;

    let newSpouseCoverage = spouseCoverage;
    
    if (!isDistributor(TAA)) {
      if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
        newSpouseCoverage = Math.min(spouseCoverage, newEmployeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional);
      } else {
        newSpouseCoverage = 0;
      }
    }

    onCoverageChange(newEmployeeCoverage, newSpouseCoverage);
  };

  const handleSpouseCoverageChange = (event: Event, newValue: number | number[]) => {
    const newSpouseCoverage = Array.isArray(newValue) ? newValue[0] : newValue;

    const constrainedSpouseCoverage = Math.min(newSpouseCoverage, maxSpouseCoverage);

    onCoverageChange(employeeCoverage, constrainedSpouseCoverage);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    coverageType: 'employee' | 'spouse'
  ) => {
    const value = Number(event.target.value.replace(/[^0-9]/g, ''));
    if (coverageType === 'employee') {
      onCoverageChange(Math.min(value, maxEmployeeCoverage), spouseCoverage);
    } else {
      onCoverageChange(employeeCoverage, Math.min(value, maxSpouseCoverage));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const showSpouseCoverage = eligibility === 'Individual + Spouse' || eligibility === 'Family';


  return (
    <Card className="w-full max-w-md mx-auto lg:max-w-sm">
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={showSpouseCoverage ? 6 : 12}>
            <Typography className='m-0' gutterBottom>Your Coverage:
              <Input className='px-1.5'
                value={formatCurrency(employeeCoverage)}
                size="small"
                onChange={(e) => handleInputChange(e, 'employee')}
                inputProps={{
                  step,
                  min: 0,
                  max: maxEmployeeCoverage,
                  type: 'text',
                  'aria-labelledby': 'input-slider',
                }}
                sx={{ width: '50%', maxWidth: '80px', mb: 2 }}
              />
            </Typography>
            <Slider
              getAriaLabel={() => 'Individual Coverage'}
              value={employeeCoverage}
              onChange={handleEmployeeCoverageChange}
              min={0}
              max={maxEmployeeCoverage}
              step={step}
            />
          </Grid>
          {showSpouseCoverage && (
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Spouse Coverage:
                <Input className='px-1.5 font-semibold'
                  value={formatCurrency(spouseCoverage)}
                  size="small"
                  onChange={(e) => handleInputChange(e, 'spouse')}
                  inputProps={{
                    step: 5000,
                    min: 0,
                    max: maxSpouseCoverage,
                    type: 'text',
                    'aria-labelledby': 'input-slider',
                  }}
                  sx={{ width: '50%', maxWidth: '80px', mb: 2 }}
                />
              </Typography>
              <Slider
                getAriaLabel={() => 'Spouse coverage amount'}
                value={spouseCoverage}
                onChange={handleSpouseCoverageChange}
                min={0}
                max={maxSpouseCoverage}
                step={step}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CoverageSlider;