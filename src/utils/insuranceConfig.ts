// utils/insuranceConfig.ts

import { useState } from 'react';
import { Product, EligibilityOption, USState, Plan } from './insuranceTypes';
import { getDefaultIndividualData } from './insuranceUtils';

// const [individualData, setIndividualData] = useState(getDefaultIndividualData());

export const PRODUCTS: Product[] = ['LTD', 'STD', 'Life / AD&D', 'Accident', 'Dental', 'Vision', 'Critical Illness/Cancer'];

export const ELIGIBILITY_OPTIONS: EligibilityOption[] = ['Individual', 'Individual + Spouse', 'Individual + Children', 'Family'];

export const US_STATES: USState[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
export const insuranceConfig = {
  Individual: {
    // Define properties and default values
    name: '',
    age: 0,
    // Add other necessary properties
  },
  // Add other configurations as needed
};

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

export const CRITICAL_ILLNESS_RATES: { minAge: number; maxAge: number; rate: number }[] = [
  { minAge: 0, maxAge: 24, rate: 5.55 },
  { minAge: 25, maxAge: 29, rate: 6.45 },
  { minAge: 30, maxAge: 34, rate: 7.65 },
  { minAge: 35, maxAge: 39, rate: 10.05 },
  { minAge: 40, maxAge: 44, rate: 13.50 },
  { minAge: 45, maxAge: 49, rate: 18.45 },
  { minAge: 50, maxAge: 54, rate: 24.30 },
  { minAge: 55, maxAge: 59, rate: 33.60 },
  { minAge: 60, maxAge: 64, rate: 44.55 },
  { minAge: 65, maxAge: 69, rate: 58.95 },
  { minAge: 70, maxAge: 74, rate: 77.85 },
  { minAge: 75, maxAge: 120, rate: 109.05 }
];

type ZIPCodeRegions = {
  [key: number]: string[];
};

export const ZIP_CODE_REGIONS: ZIPCodeRegions = {
  1: ['350', '351', '354', '355', '360', '361', '363', '364', '366', '367', '368', '369', '376', '380', '381', '382', '383', '384', '400', '401', '402', '403', '405', '406', '407', '408', '409', '411', '412', '413', '414', '415', '416', '417', '418', '425', '426', '427', '454', '456', '716', '717', '718', '719', '720', '721', '723', '728', '780', '783', '784', '785', '794', '798'],
    2: ['352', '356', '357', '358', '359', '362', '365', '370', '371', '373', '374', '377', '378', '379', '385', '395', '404', '410', '420', '421', '444', '445', '447', '453', '455', '457', '470', '471', '473', '474', '667', '700', '701', '704', '713', '714', '722', '724', '725', '726', '727', '729', '744', '748', '766', '767', '779', '781', '782', '793', '797', '799', '856'],
    3: ['120', '121', '128', '140', '141', '142', '143', '148', '168', '172', '173', '174', '175', '178', '180', '181', '182', '183', '184', '185', '186', '187', '188', '191', '195', '230', '231', '232', '236', '238', '240', '241', '242', '283', '290', '291', '292', '294', '297', '299', '310', '312', '313', '314', '317', '318', '319', '508', '514', '515', '516', '612', '619', '620', '622', '623', '625', '626', '635', '638', '639', '640', '644', '645', '646', '647', '653', '654', '655', '657', '660', '661', '664', '665', '666', '670', '671', '673', '703', '706', '707', '708', '710', '711', '735', '736', '739', '740', '743', '754', '755', '756', '757', '759', '765', '775', '776', '778', '786', '795', '796', '845', '853', '855', '857', '859', '890', '937'],
    4: ['122', '123', '124', '125', '126', '127', '129', '132', '133', '134', '135', '136', '144', '146', '147', '149', '169', '176', '177', '179', '189', '190', '194', '196', '224', '225', '229', '233', '234', '235', '237', '239', '243', '245', '246', '270', '278', '279', '280', '287', '293', '298', '301', '302', '306', '307', '308', '309', '315', '316', '398', '432', '433', '434', '436', '448', '449', '458', '463', '464', '465', '467', '468', '469', '475', '477', '480', '481', '483', '485', '486', '487', '502', '503', '507', '509', '510', '512', '513', '520', '522', '523', '524', '525', '526', '527', '528', '532', '546', '547', '609', '610', '611', '613', '614', '615', '616', '617', '618', '624', '627', '628', '629', '630', '633', '634', '636', '637', '641', '648', '652', '656', '658', '662', '668', '669', '672', '675', '678', '679', '705', '712', '730', '731', '734', '737', '738', '741', '745', '746', '747', '749', '750', '751', '758', '760', '761', '762', '763', '764', '770', '772', '773', '774', '788', '800', '801', '805', '806', '807', '836', '837', '840', '842', '843', '844', '847', '850', '851', '852', '863', '864', '889', '891', '936'],
    5: ['013', '014', '015', '018', '019', '023', '025', '026', '040', '042', '117', '119', '130', '131', '137', '138', '139', '145', '192', '193', '197', '199', '271', '272', '273', '274', '275', '281', '284', '285', '286', '288', '289', '296', '300', '304', '305', '330', '333', '334', '482', '484', '490', '493', '494', '495', '496', '497', '530', '531', '534', '535', '538', '539', '540', '541', '542', '544', '545', '548', '549', '570', '571', '572', '573', '574', '575', '576', '577', '590', '597', '604', '674', '676', '677', '822', '823', '824', '825', '827', '828', '829', '830', '831', '841', '846', '860', '893', '894', '922', '923', '924', '925', '930', '932', '933', '956', '957', '967', '968', '985', '990', '991', '992', '993', '994'],
    6: ['010', '011', '012', '027', '028', '029', '050', '051', '052', '053', '054', '055', '056', '057', '058', '059', '060', '061', '062', '063', '064', '067', '077', '078', '088', '089', '198', '201', '220', '221', '222', '223', '226', '227', '228', '244', '276', '282', '488', '489', '491', '492', '498', '499', '537', '543', '580', '581', '582', '583', '584', '585', '586', '587', '588', '600', '601', '603', '605', '606', '608', '752', '753', '768', '769', '771', '787', '789', '790', '791', '792', '885', '811', '812', '813', '814', '816', '820', '821', '826', '865', '895', '897', '898', '919', '920', '921', '928', '934', '935', '939', '952', '958', '980', '981', '982', '983', '984', '986', '987', '988', '989'],
    7: ['016', '017', '020', '021', '022', '039', '065', '066', '068', '069', '070', '074', '075', '085', '277', '602', '607', '803', '804', '906', '907', '908', '910', '911', '912', '913', '917', '918', '926', '927', '949', '953', '954', '955', '959', '960', '961'],
    8: ['024', '076', '079', '100', '102', '112', '113', '103', '106', '107', '108', '110', '111', '116', '118', '900', '901', '902', '905', '914', '915', '916', '931', '945', '946', '947', '948', '950'],
    9: ['101', '903', '904', '940', '941', '942', '951', '999'],
    10: ['943', '944']
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
  maxCoverageAmount: 1200,
  maxUnits: 120,
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