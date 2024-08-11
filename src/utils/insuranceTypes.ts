// utils/insuranceTypes.ts

export type Product = 'LTD' | 'STD' | 'Life / AD&D' | 'Accident' | 'Dental' | 'Vision' | 'Critical Illness/Cancer';

export type EligibilityOption = 'Individual' | 'Individual + Spouse' | 'Individual + Children' | 'Family';

export type CostView = 'Monthly' | 'Semi-Monthly' | 'Weekly' | 'Bi-Weekly';

export type PremiumResult = Record<Product, number>;

export type Plan = 'Basic' | 'Premium';

export type USState = 
  | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'DC' | 'FL' | 'GA'
  | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD'
  | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ'
  | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC'
  | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';



export interface IndividualInfo {
  isExpanded: any;
  zipCode: string;
  businessEmployees: number;
  state: USState;
  age: number;
  annualSalary: number;
  eligibility: EligibilityOption;
  employeeCoverage: number;
  spouseCoverage: number;
  numberOfChildren: number;
}

export const PRODUCTS: Product[] = ['LTD', 'STD', 'Life / AD&D', 'Accident', 'Dental', 'Vision', 'Critical Illness/Cancer'];
export const ELIGIBILITY_OPTIONS: EligibilityOption[] = ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'];
export const US_STATES: USState[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export function calculatePremiumByCostView(premium: number, costView: CostView): number {
  switch (costView) {
    case 'Monthly':
      return premium;
    case 'Weekly':
      return premium / 4;  // Approximately 52 weeks / 12 months
    case 'Semi-Monthly':
      return premium / 2;
    case 'Bi-Weekly':
      return premium / 12;
    default:
      console.warn(`Unexpected cost view: ${costView}. Returning monthly premium.`);
      return premium;
  }
}

export function getCostViewDisplayText(view: CostView): string {
  switch (view) {
    case 'Monthly':
      return 'month';
    case 'Weekly':
      return 'week';
    case 'Bi-Weekly':
      return '26 weeks';
    case 'Semi-Monthly':
      return '2 weeks';
    default:
      return view;
  }
}

export type ToggleState = 'Owner' | 'All' | 'Employees' | 'None';