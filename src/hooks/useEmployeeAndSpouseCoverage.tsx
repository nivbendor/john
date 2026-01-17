import { isDistributor } from "../utils/isDistributor";
import { LIFE_ADD_CONFIG, CRITICAL_ILLNESS_RATES, CriticalIllnessConfig } from "../utils/insuranceConfig";
import { IndividualInfo, Product } from "../utils/insuranceTypes";
import { TAA } from "../utils/config";

export function useEmployeeAndSpouseCoverage(individualInfo: IndividualInfo, product: Product) {
  const { employeeCoverage, spouseCoverage, employeeCoverageCriticalIllness, spouseCoverageCriticalIllness } = individualInfo;

  if (isDistributor(TAA) && product === 'Critical Illness/Cancer') {
    return {
      employeeCoverage: employeeCoverageCriticalIllness as number,
      spouseCoverage: spouseCoverageCriticalIllness as number,
      maxSpouseCoverage: (CRITICAL_ILLNESS_RATES as CriticalIllnessConfig).maxCoverage,
      maxEmployeeCoverage: (CRITICAL_ILLNESS_RATES as CriticalIllnessConfig).maxCoverage,
      minCoverage: (CRITICAL_ILLNESS_RATES as CriticalIllnessConfig).minCoverage,
      step: (CRITICAL_ILLNESS_RATES as CriticalIllnessConfig).step,
    }
  }

  // if (isDistributor(TAA) && product === 'Life / AD&D') {
  //   return {
  //     employeeCoverage,
  //     spouseCoverage,
  //     maxSpouseCoverage: 20000,
  //     maxEmployeeCoverage: 150000,
  //     step: 1000,
  //     minCoverage: 25000,
  //   }
  // }

  // regular Life / AD&D
  const maxEmployeeCoverage = LIFE_ADD_CONFIG.max_coverage_amount_individual;
  const maxSpouseCoverage = Math.min(
    employeeCoverage * LIFE_ADD_CONFIG.max_coverage_amount_spouse_conditional,
    LIFE_ADD_CONFIG.max_coverage_amount_spouse
  );

  return {
    employeeCoverage,
    spouseCoverage,
    maxSpouseCoverage,
    maxEmployeeCoverage,
    step: 10000,
    minCoverage: 0,
  }
}