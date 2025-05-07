import React from 'react';
import { Slider, Typography, Input, Grid } from '@mui/material';
import { Card, CardContent } from "./card";
import { IndividualInfo, Product } from '../../utils/insuranceTypes';
import { LIFE_ADD_CONFIG } from '../../utils/insuranceConfig';
import { useEmployeeAndSpouseCoverage } from '../../hooks/useEmployeeAndSpouseCoverage';
import { isDistributor } from '../../utils/isDistributor';
import { TAA } from '../../utils/config';

interface CoverageSliderProps {
  individualInfo: IndividualInfo;
  product: Product;
  onCoverageChange: (employee: number, spouse: number) => void;
}

const CoverageSlider: React.FC<CoverageSliderProps> = ({
  individualInfo,
  product,
  onCoverageChange,
}) => {

  const { eligibility } = individualInfo;
  const { employeeCoverage, spouseCoverage, maxEmployeeCoverage, maxSpouseCoverage, step, minCoverage } = useEmployeeAndSpouseCoverage(individualInfo, product);

  const handleEmployeeCoverageChange = (event: Event, newValue: number | number[]) => {
    const newEmployeeCoverage = Array.isArray(newValue) ? newValue[0] : newValue;

    let newSpouseCoverage = spouseCoverage;
    
    // TODO: critical but it looks not right how it was done initially
    // if (!isDistributor(TAA) && product === 'Critical Illness/Cancer') {
      if (eligibility === 'Individual + Spouse' || eligibility === 'Family') {
        newSpouseCoverage = Math.min(spouseCoverage, newEmployeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional);
      } else {
        newSpouseCoverage = 0;
      }
    // }

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
                  min: minCoverage,
                  max: maxEmployeeCoverage,
                  type: 'text',
                  'aria-labelledby': 'input-slider',
                }}
                sx={{ maxWidth: '80px', mb: 2 }}
              />
            </Typography>
            <Slider
              getAriaLabel={() => 'Individual Coverage'}
              value={employeeCoverage}
              onChange={handleEmployeeCoverageChange}
              min={minCoverage}
              max={maxEmployeeCoverage}
              step={step}
            />
          </Grid>
          {showSpouseCoverage && (
            <Grid item xs={12} sm={6}>
              <Typography className='m-0' gutterBottom>Spouse Coverage:
                <Input className='px-1.5 font-semibold'
                  value={formatCurrency(spouseCoverage)}
                  size="small"
                  onChange={(e) => handleInputChange(e, 'spouse')}
                  inputProps={{
                    step,
                    min: minCoverage,
                    max: maxSpouseCoverage,
                    type: 'text',
                    'aria-labelledby': 'input-slider',
                  }}
                  sx={{ maxWidth: '80px', mb: 2 }}
                />
              </Typography>
              <Slider
                getAriaLabel={() => 'Spouse coverage amount'}
                value={spouseCoverage}
                onChange={handleSpouseCoverageChange}
                min={minCoverage}
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