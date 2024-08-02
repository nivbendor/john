// utils/insuranceConfig.ts

import { Product, EligibilityOption, USState, Plan } from './insuranceTypes';

export const PRODUCTS: Product[] = ['LTD', 'STD', 'Life / AD&D', 'Accident', 'Dental', 'Vision', 'Critical Illness/Cancer'];

export const ELIGIBILITY_OPTIONS: EligibilityOption[] = ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'];

export const US_STATES: USState[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const PRODUCT_ELIGIBILITY_OPTIONS: Record<Product, EligibilityOption[]> = {
  LTD: ['Individual'],
  STD: ['Individual'],
  'Life / AD&D': ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Accident: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Dental: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  Vision: ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
  'Critical Illness/Cancer': ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'],
};

export const AGE_BANDED_RATES = [
  { minAge: 0, maxAge: 29, rate: 0.25 },
  { minAge: 30, maxAge: 34, rate: 0.25 },
  { minAge: 35, maxAge: 39, rate: 0.25 },
  { minAge: 40, maxAge: 44, rate: 0.25 },
  { minAge: 45, maxAge: 49, rate: 0.30 },
  { minAge: 50, maxAge: 54, rate: 0.38 },
  { minAge: 55, maxAge: 59, rate: 0.46 },
  { minAge: 60, maxAge: 64, rate: 0.55 },
  { minAge: 65, maxAge: 120, rate: 0.66 }
];

export const AGE_BANDED_RATES_LIFE = [
  { minAge: 0, maxAge: 29, rate: 0.11 },
  { minAge: 30, maxAge: 34, rate: 0.13 },
  { minAge: 35, maxAge: 39, rate: 0.15 },
  { minAge: 40, maxAge: 44, rate: 0.18 },
  { minAge: 45, maxAge: 49, rate: 0.26 },
  { minAge: 50, maxAge: 54, rate: 0.40 },
  { minAge: 55, maxAge: 59, rate: 0.59 },
  { minAge: 60, maxAge: 64, rate: 0.89 },
  { minAge: 65, maxAge: 69, rate: 1.68 },
  { minAge: 70, maxAge: Infinity, rate: 2.71 },
];

export const ACCIDENT_PREMIUMS: Record<Plan, Record<EligibilityOption, number>> = {
  Basic: { Individual: 7.94, 'Individual + Spouse': 15.07, 'Individual + Children': 18.89, Family: 22.27 },
  Premium: { Individual: 11.74, 'Individual + Spouse': 23.05, 'Individual + Children': 27.68, Family: 32.67 }
};

export const VISION_PREMIUMS: Record<string, Record<Plan, Record<EligibilityOption, number>>> = {
  AK: {
    Basic: { Individual: 9.86, 'Individual + Spouse': 19.78, 'Individual + Children': 16.74, Family: 27.61 },
    Premium: { Individual: 12.23, 'Individual + Spouse': 24.52, 'Individual + Children': 20.75, Family: 34.23 }
  },
  'CA,CT,HI,NJ,NV,WA': {
    Basic: { Individual: 8.43, 'Individual + Spouse': 16.91, 'Individual + Children': 14.32, Family: 23.60 },
    Premium: { Individual: 10.51, 'Individual + Spouse': 21.07, 'Individual + Children': 17.84, Family: 29.41 }
  },
  Other: {
    Basic: { Individual: 7.56, 'Individual + Spouse': 15.15, 'Individual + Children': 12.83, Family: 21.15 },
    Premium: { Individual: 9.48, 'Individual + Spouse': 19.00, 'Individual + Children': 16.08, Family: 26.52 }
  }
};

export const DENTAL_PREMIUMS: Record<Plan, Record<number, Record<EligibilityOption, number>>> = {
  Basic: {
    1: { Individual: 20.53, 'Individual + Spouse': 40.82, 'Individual + Children': 45.42, Family: 70.37 },
    2: { Individual: 22.29, 'Individual + Spouse': 44.32, 'Individual + Children': 49.2, Family: 76.29 },
    3: { Individual: 23.6, 'Individual + Spouse': 46.94, 'Individual + Children': 52.39, Family: 81.14 },
    4: { Individual: 25, 'Individual + Spouse': 49.71, 'Individual + Children': 55.29, Family: 85.69 },
    5: { Individual: 28.29, 'Individual + Spouse': 56.25, 'Individual + Children': 62.64, Family: 97.06 },
    6: { Individual: 29.38, 'Individual + Spouse': 58.39, 'Individual + Children': 64.83, Family: 100.5 },
    7: { Individual: 31.97, 'Individual + Spouse': 63.54, 'Individual + Children': 70.54, Family: 109.37 },
    8: { Individual: 34.09, 'Individual + Spouse': 67.77, 'Individual + Children': 75.24, Family: 116.65 },
    9: { Individual: 38.03, 'Individual + Spouse': 75.56, 'Individual + Children': 84.01, Family: 130.19 },
    10: { Individual: 39.75, 'Individual + Spouse': 79.03, 'Individual + Children': 87.81, Family: 136.13 }
  },
  Premium: {
    1: { Individual: 25.62, 'Individual + Spouse': 50.95, 'Individual + Children': 60.29, Family: 92.13 },
    2: { Individual: 29.12, 'Individual + Spouse': 57.93, 'Individual + Children': 68.96, Family: 104.95 },
    3: { Individual: 31.92, 'Individual + Spouse': 63.44, 'Individual + Children': 73.24, Family: 112.55 },
    4: { Individual: 34.51, 'Individual + Spouse': 68.63, 'Individual + Children': 79.38, Family: 121.93 },
    5: { Individual: 39.26, 'Individual + Spouse': 78.07, 'Individual + Children': 89.58, Family: 137.84 },
    6: { Individual: 41.63, 'Individual + Spouse': 82.82, 'Individual + Children': 94.55, Family: 145.69 },
    7: { Individual: 45.92, 'Individual + Spouse': 91.33, 'Individual + Children': 104.93, Family: 161.42 },
    8: { Individual: 50.35, 'Individual + Spouse': 100.12, 'Individual + Children': 114.26, Family: 176.06 },
    9: { Individual: 56.31, 'Individual + Spouse': 111.99, 'Individual + Children': 125.54, Family: 194.25 },
    10: { Individual: 63.18, 'Individual + Spouse': 125.63, 'Individual + Children': 140.87, Family: 217.93 }
  }
};

export const CRITICAL_ILLNESS_RATES: {
  [K in '<24' | '25-29' | '30-34' | '35-39' | '40-44' | '45-49' | '50-54' | '55-59' | '60-64' | '65-69' | '70-74' | '75+']: {
    [E in EligibilityOption]: number
  }
} = {
  '<24': { Individual: 5.55, 'Individual + Spouse': 9.15, 'Individual + Children': 8.10, Family: 11.70 },
  '25-29': { Individual: 6.45, 'Individual + Spouse': 10.35, 'Individual + Children': 8.85, Family: 12.90 },
  '30-34': { Individual: 7.65, 'Individual + Spouse': 12.30, 'Individual + Children': 10.20, Family: 14.85 },
  '35-39': { Individual: 10.05, 'Individual + Spouse': 15.75, 'Individual + Children': 12.45, Family: 18.30 },
  '40-44': { Individual: 13.50, 'Individual + Spouse': 21.00, 'Individual + Children': 16.05, Family: 23.25 },
  '45-49': { Individual: 18.45, 'Individual + Spouse': 28.35, 'Individual + Children': 21.00, Family: 30.90 },
  '50-54': { Individual: 24.30, 'Individual + Spouse': 37.20, 'Individual + Children': 26.85, Family: 39.60 },
  '55-59': { Individual: 33.60, 'Individual + Spouse': 51.15, 'Individual + Children': 36.15, Family: 53.70 },
  '60-64': { Individual: 44.55, 'Individual + Spouse': 67.50, 'Individual + Children': 47.10, Family: 70.05 },
  '65-69': { Individual: 58.95, 'Individual + Spouse': 89.25, 'Individual + Children': 61.50, Family: 91.80 },
  '70-74': { Individual: 77.85, 'Individual + Spouse': 117.60, 'Individual + Children': 80.40, Family: 120.15 },
  '75+': { Individual: 109.05, 'Individual + Spouse': 164.25, 'Individual + Children': 111.60, Family: 166.80 }
};


export const ZIP_CODE_REGIONS: Record<number, string[]> = {
  1: ['350', '351', '354', '355', '360', '361', '363', '364', '366', '367', '368', '369', '716', '717', '718', '719', '720', '721', '723', '728', '335', '400', '401', '402', '403', '405', '406', '407', '408', '409', '411', '412', '413', '414', '415', '416', '417', '418', '425', '426', '427', '150', '151', '153', '154', '155', '156', '157', '158', '159', '160', '161', '166', '248', '255', '257', '260', '265', '454', '456', '376', '380', '381', '382', '383', '384', '780', '783', '784', '785', '794', '798'],
  2: ['352', '356', '357', '358', '359', '362', '365', '856', '722', '724', '725', '726', '727', '729', '404', '410', '420', '421', '322', '323', '324', '325', '326', '327', '328', '336', '337', '346', '347', '349', '470', '471', '473', '474', '700', '701', '704', '713', '714', '080', '082', '444', '445', '447', '453', '455', '457', '744', '748', '766', '767', '779', '781', '782', '793', '797', '799'],
  3: ['853', '855', '857', '859', '833', '835', '838', '612', '619', '620', '622', '623', '625', '626', '460', '461', '462', '466', '472', '476', '478', '479', '508', '514', '515', '516', '508', '514', '515', '516', '660', '661', '664', '665', '666', '670', '671', '673', '310', '312', '313', '314', '317', '318', '319', '283', '120', '121', '128', '140', '141', '142', '143', '148', '854', '856', '617', '713', '010', '011', '012', '027', '386', '387', '388', '389', '390', '391', '392', '394', '395', '396', '397', '635', '638', '639', '640', '644', '645', '646', '647', '653', '654', '655', '657', '862', '863', '864', '310', '312', '313', '314', '317', '318', '319', '283', '120', '121', '128', '140', '141', '142', '143', '148', '854', '856', '617', '713', '168', '170', '171', '171', '733', '811', '113', '809', '804', '805', '806', '807'],
  4: ['850', '851', '852', '863', '864', '612', '619', '620', '622', '623', '625', '626', '460', '461', '462', '466', '472', '476', '478', '479', '508', '514', '515', '516', '833', '835', '838', '609', '610', '611', '613', '614', '615', '616', '617', '618', '624', '627', '628', '629', '836', '837', '833', '835', '838', '470', '471', '473', '474', '502', '503', '507', '509', '510', '512', '513', '520', '522', '523', '524', '525', '526', '527', '528', '244', '245', '246', '244', '245', '246', '500', '501', '504', '505', '506', '521', '620', '460', '461', '462', '466', '472', '476', '478', '479', '460', '461', '462', '466', '472', '476', '478', '479', '300', '301', '302', '303', '304', '305', '306', '307', '308', '309', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186', '187', '188', '191', '192', '193', '194', '195', '196', '197', '198', '199', '200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258', '259', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '270', '271', '272', '273', '274', '275', '276', '277', '278', '279', '280', '281', '282', '283', '284', '285', '286', '287', '288', '289', '290', '291', '292', '293', '294', '295', '296', '297', '298', '299'],
  5: ['967', '968', '670', '671', '673', '680', '681', '683', '684', '685', '686', '687', '688', '689', '690', '691', '692', '693', '720', '721', '723', '724', '725', '726', '727', '728', '729', '730', '731', '732', '733', '734', '735', '736', '737', '738', '739', '740', '741', '742', '743', '744', '745', '746', '747', '748', '749', '750', '751', '752', '753', '754', '755', '756', '757', '758', '759', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769', '770', '771', '772', '773', '774', '775', '776', '777', '778', '779', '780', '781', '782', '783', '784', '785', '786', '787', '788', '789', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799'],
  6: ['600', '601', '603', '605', '606', '608', '702', '703', '704', '706', '707', '708', '709', '710', '711', '712', '713', '714', '715', '716', '717', '718', '719', '720', '721', '722', '723', '724', '725', '726', '727', '728', '729', '730', '731', '732', '733', '734', '735', '736', '737', '738', '739', '740', '741', '742', '743', '744', '745', '746', '747', '748', '749', '750', '751', '752', '753', '754', '755', '756', '757', '758', '759', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769', '770', '771', '772', '773', '774', '775', '776', '777', '778', '779', '780', '781', '782', '783', '784', '785', '786', '787', '788', '789', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799'],
  7: ['602', '607', '619', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '631', '632', '633', '634', '635', '636', '637', '638', '639', '640', '641', '642', '643', '644', '645', '646', '647', '648', '649', '650', '651', '652', '653', '654', '655', '656', '657', '658', '659', '660', '661', '662', '663', '664', '665', '666', '667', '668', '669', '670', '671', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '684', '685', '686', '687', '688', '689', '690', '691', '692', '693', '694', '695', '696', '697', '698', '699'],
  8: ['006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016', '017', '018', '019', '020', '021', '022', '023', '024', '025', '026', '027', '028', '029', '030', '031', '032', '033', '034', '035', '036', '037', '038', '039', '040', '041', '042', '043', '044', '045', '046', '047', '048', '049', '050', '051', '052', '053', '054', '055', '056', '057', '058', '059', '060', '061', '062', '063', '064', '065', '066', '067', '068', '069', '070', '071', '072', '073', '074', '075', '076', '077', '078', '079', '080', '081', '082', '083', '084', '085', '086', '087', '088', '089', '090', '091', '092', '093', '094', '095', '096', '097', '098', '099', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119'],
  9: ['006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016', '017', '018', '019', '020', '021', '022', '023', '024', '025', '026', '027', '028', '029', '030', '031', '032', '033', '034', '035', '036', '037', '038', '039', '040', '041', '042', '043', '044', '045', '046', '047', '048', '049', '050', '051', '052', '053', '054', '055', '056', '057', '058', '059', '060', '061', '062', '063', '064', '065', '066', '067', '068', '069', '070', '071', '072', '073', '074', '075', '076', '077', '078', '079', '080', '081', '082', '083', '084', '085', '086', '087', '088', '089', '090', '091', '092', '093', '094', '095', '096', '097', '098', '099', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119'],
  10: ['006', '007', '008', '009', '010', '011', '012', '013', '014', '015', '016', '017', '018', '019', '020', '021', '022', '023', '024', '025', '026', '027', '028', '029', '030', '031', '032', '033', '034', '035', '036', '037', '038', '039', '040', '041', '042', '043', '044', '045', '046', '047', '048', '049', '050', '051', '052', '053', '054', '055', '056', '057', '058', '059', '060', '061', '062', '063', '064', '065', '066', '067', '068', '069', '070', '071', '072', '073', '074', '075', '076', '077', '078', '079', '080', '081', '082', '083', '084', '085', '086', '087', '088', '089', '090', '091', '092', '093', '094', '095', '096', '097', '098', '099', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119']
};



export const STATE_CATEGORIES: Record<string, USState[]> = {
  AK: ['AK'],
  'CA,CT,HI,NJ,NV,WA': ['CA', 'CT', 'HI', 'NJ', 'NV', 'WA'],
  Other: US_STATES.filter(state => !['AK', 'CA', 'CT', 'HI', 'NJ', 'NV', 'WA'].includes(state))
};

export const PRODUCT_BULLET_POINTS: Record<Product, Record<Plan, string[]>> = {
  'LTD': {
    'Basic': [
      "Income protection",
      "Protects Gross 1099 income",
      "Benefit maximum of $8,333.33 per month",
      "Guaranteed Issue"
    ],
    'Premium': [
      "Protect your ability to earn an income",
      "Protects Gross 1099 income",
      "Benefit maximum of $15,000 per month",
      "Guaranteed Issue"
    ]
  },
  'STD': {
    'Basic': [
      "Income protection",
      "Covers pregnancy",
      "Benefit maximum of $1,200 per week",
      "Guaranteed Issue"
    ],
    'Premium': []
  },
  'Life / AD&D': {
    'Basic': [
      "$150,000 of coverage",
      "Guaranteed issue",
      "Coverage for spouse and children"
    ],
    'Premium': [
      "$150,000 of coverage",
      "Guaranteed issue",
      "Coverage for spouse and children"
    ]
  },
  'Accident': {
    'Basic': [
      "Pays on and off job",
      "Large benefit payouts",
      "25% organized sport bonus"
    ],
    'Premium': [
      "Pays on and off job",
      "Large benefit payouts",
      "25% organized sport bonus"
    ]
  },
  'Vision': {
    'Basic': [
      "Frames and lenses every year",
      "VSP Network"
    ],
    'Premium': [
      "Frames and lenses every year",
      "VSP Network"
    ]
  },
  'Dental': {
    'Basic': [
      "Great benefit if your dentist is in network",
      "$1000 annual maximum per person",
      "Root canals covered in basic at 80% (typically root canals are major coverage)"
    ],
    'Premium': [
      "If your dentist is out-of-network it doesn't matter",
      "Pays the same percentage for out-of-network",
      "$1,500 annual maximum per person",
      "Root canals covered in basic at 80% (typically root canals are major coverage)",
      "$1,000 child ortho (lifetime max)"
    ]
  },
  'Critical Illness/Cancer': {
    'Basic': [
      "Pays a lump sum amount for initial diagnosis",
      "Pays same lump sum for reoccurrence",
      "Pays 100% on the initial diagnosis of invasive cancer",
      "Dozens of covered illnesses"
    ],
    'Premium': [
      "Pays a lump sum amount for initial diagnosis",
      "Pays same lump sum for reoccurrence",
      "Pays 100% on the initial diagnosis of invasive cancer",
      "Dozens of covered illnesses"
    ]
  }
};

export const STD_CONFIG = {
  benefitAmountKey: 0.6,
  unitsKey: 10,
  maxCoverageAmount: 1100,
  maxUnits: 110,
  weeks: 52,
  ageBandRates: [
    { minAge: 0, maxAge: 29, rate: 0.25 },
    { minAge: 30, maxAge: 34, rate: 0.25 },
    { minAge: 35, maxAge: 39, rate: 0.25 },
    { minAge: 40, maxAge: 44, rate: 0.25 },
    { minAge: 45, maxAge: 49, rate: 0.30 },
    { minAge: 50, maxAge: 54, rate: 0.38 },
    { minAge: 55, maxAge: 59, rate: 0.46 },
    { minAge: 60, maxAge: 64, rate: 0.55 },
    { minAge: 65, maxAge: Infinity, rate: 0.66 }
  ],
  plan: 'Basic' as Plan // Add this line to explicitly set the plan for STD
};

export const LTD_CONFIG = {
  unitKey: 100,
  costPerHundred: {
    Basic: 0.209,
    Premium: 0.305
  },
  maxBenefitAmount: {
    Basic: 8333.33,
    Premium: 15000
  },
  maxUnits: {
    Basic: 83.33,
    Premium: 250
  },
  weeks: 52
};

export const LIFE_ADD_CONFIG = {
  max_coverage_amount_individual: 150000,
  max_coverage_amount_spouse: 20000,
  max_coverage_amount_spouse_conditional: 0.5, // 50% of individual coverage
  max_number_of_children: 4,
  units: 1000,
  units_max_individual: 150,
  units_max_spouse: 20,
  children_rate: 2.50,
  ageBandRates: [
    { minAge: 0, maxAge: 29, rate: 0.11 },
    { minAge: 30, maxAge: 34, rate: 0.13 },
    { minAge: 35, maxAge: 39, rate: 0.15 },
    { minAge: 40, maxAge: 44, rate: 0.18 },
    { minAge: 45, maxAge: 49, rate: 0.26 },
    { minAge: 50, maxAge: 54, rate: 0.40 },
    { minAge: 55, maxAge: 59, rate: 0.59 },
    { minAge: 60, maxAge: 64, rate: 0.89 },
    { minAge: 65, maxAge: 69, rate: 1.68 },
    { minAge: 70, maxAge: Infinity, rate: 2.71 }
  ]
};