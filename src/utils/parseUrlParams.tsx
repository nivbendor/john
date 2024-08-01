import { IndividualInfo, EligibilityOption, PersonInfo } from '../utils/insuranceTypes';

export function parseUrlParams(): Partial<IndividualInfo> {
  const params = new URLSearchParams(window.location.search);
  const result: Partial<IndividualInfo> = {};

  // Business Information
  const businessZipCode = params.get('businessZipCode');
  if (businessZipCode) result.businessZipCode = businessZipCode;

  const businessEmployees = params.get('businessEmployees');
  if (businessEmployees) result.businessEmployees = parseInt(businessEmployees, 10);

  // Owner Information
  const ownerAge = params.get('ownerAge');
  const ownerAnnualSalary = params.get('ownerAnnualSalary');
  const ownerEligibility = params.get('ownerEligibility');
  if (ownerAge || ownerAnnualSalary || ownerEligibility) {
    const ownerInfo: Partial<PersonInfo> = {
      age: ownerAge ? parseInt(ownerAge, 10) : undefined,
      annualSalary: ownerAnnualSalary ? parseInt(ownerAnnualSalary, 10) : undefined,
      eligibility: isValidEligibility(ownerEligibility) ? ownerEligibility : undefined,
      employeeCoverage: 0,
      spouseCoverage: 0,
      numberOfChildren: 0
    };
    result.owner = ownerInfo as PersonInfo;
  }

  // Employee Information
  const employeeAge = params.get('employeeAge');
  const employeeAnnualSalary = params.get('employeeAnnualSalary');
  const employeeEligibility = params.get('employeeEligibility');
  if (employeeAge || employeeAnnualSalary || employeeEligibility) {
    const employeeInfo: Partial<PersonInfo> = {
      age: employeeAge ? parseInt(employeeAge, 10) : undefined,
      annualSalary: employeeAnnualSalary ? parseInt(employeeAnnualSalary, 10) : undefined,
      eligibility: isValidEligibility(employeeEligibility) ? employeeEligibility : undefined,
      employeeCoverage: 0,
      spouseCoverage: 0,
      numberOfChildren: 0
    };
    result.employee = employeeInfo as PersonInfo;
  }

  return result;
}

function isValidEligibility(eligibility: string | null): eligibility is EligibilityOption {
  return eligibility !== null && ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'].includes(eligibility);
}