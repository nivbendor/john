// utils/insuranceTypes.ts

export type Product = 'LTD' | 'STD' | 'Life / AD&D' | 'Accident' | 'Dental' | 'Vision' | 'Critical Illness/Cancer';

export type EligibilityOption = 'Individual' | 'Individual + Spouse' | 'Individual + Children' | 'Family';

export type CostView = 'Monthly' | 'Semi-Monthly' | 'Weekly' | 'Annual';

export type PremiumResult = Record<Product, number>;

export type Plan = 'Basic' | 'Premium';

export type USState = 
  | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA'
  | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD'
  | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ'
  | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC'
  | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';

export interface PersonInfo {
  age: number;
  annualSalary: number;
  eligibility: EligibilityOption;
  employeeCoverage: number;
  spouseCoverage: number;
  numberOfChildren: number;
}

export interface IndividualInfo {
  businessZipCode: string;
  businessEmployees: number;
  state: USState;
  owner: PersonInfo;
  employee: PersonInfo;
}

export const PRODUCTS: Product[] = ['LTD', 'STD', 'Life / AD&D', 'Accident', 'Dental', 'Vision', 'Critical Illness/Cancer'];
export const ELIGIBILITY_OPTIONS: EligibilityOption[] = ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'];
export const US_STATES: USState[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];