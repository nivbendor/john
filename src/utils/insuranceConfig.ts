// utils/insuranceConfig.ts

import { Product, EligibilityOption, USState, PlanRecord, Plan, LTDPlan } from './insuranceTypes';
import { calculateLTDBenefit } from './insuranceUtils'; // Import the function




// const [individualData, setIndividualData] = useState(getDefaultIndividualData());

export const PRODUCTS: Product[] = ['LTD', 'STD', 'Life / AD&D', 'Accident', 'Dental', 'Vision', 'Critical Illness/Cancer'];

export const defaultPlans: Record<Product, Plan> = {
  LTD: 'Premium',
  STD: 'Premium',
  'Life / AD&D': 'Basic',
  Accident: 'Premium',
  Dental: 'Premium',
  Vision: 'Premium',
  'Critical Illness/Cancer': 'Basic',
};

export const availableLTDPlanBySalaryCpValue = {
  ken: {
    Basic: [0, 100000],
    Ultra: [100001, Infinity]
  },
  amf: {
    Basic: [0, 100000],
    Premium: [100001, Infinity],
  },
  default: {
    Basic: [0, 100000],
    Premium: [100001, Infinity],
  }
}

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
    age: '',
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


export const VISION_PREMIUMS: Record<string, PlanRecord<Record<EligibilityOption, number>>> = {
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

export const STATE_CATEGORIES: Record<string, USState[]> = {
  AK: ['AK'],
  'CA,CT,HI,NJ,NV,WA': ['CA', 'CT', 'HI', 'NJ', 'NV', 'WA', 'OR'],
  Other: US_STATES.filter(state => !['AK', 'CA', 'CT', 'HI', 'NJ', 'NV', 'WA', 'OR'].includes(state))
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

export const ACCIDENT_PREMIUMS: PlanRecord<Record<EligibilityOption, number>> = {
  Basic: { Individual: 7.94, 'Individual + Spouse': 15.07, 'Individual + Children': 18.89, Family: 22.27 },
  Premium: { Individual: 11.74, 'Individual + Spouse': 23.05, 'Individual + Children': 27.68, Family: 32.67 }
};



export const DENTAL_PREMIUMS: PlanRecord<Record<number, Record<EligibilityOption, number>>> = {
  Basic: {
    1: { Individual: 20.53, 'Individual + Spouse': 40.82, 'Individual + Children': 45.42, Family: 70.37 },
    2: { Individual: 22.29, 'Individual + Spouse': 44.32, 'Individual + Children': 49.2, Family: 76.29 },
    3: { Individual: 23.62, 'Individual + Spouse': 46.94, 'Individual + Children': 52.39, Family: 81.14 },
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
  1: ['150', '151', '153', '154', '155', '156', '157', '158', '159', '160', '161', '166', '248', '255', '257', '260', '265', '335', '350', '351', '354', '355', '360', '361', '363', '364', '366', '367', '368', '369', '376', '380', '381', '382', '383', '384', '400', '401', '402', '403', '405', '406', '407', '408', '409', '411', '412', '413', '414', '415', '416', '417', '418', '425', '426', '427', '454', '456', '716', '717', '718', '719', '720', '721', '723', '728', '780', '783', '784', '785', '794', '798'],
  2: ['152', '162', '163', '164', '165', '167', '170', '171', '212', '247', '249', '250', '251', '252', '253', '254', '256', '258', '259', '261', '263', '264', '266', '267', '268', '295', '322', '323', '324', '325', '326', '327', '328', '336', '337', '346', '347', '349', '352', '356', '357', '358', '359', '362', '365', '370', '371', '373', '374', '377', '378', '379', '385', '395', '404', '410', '420', '421', '444', '445', '447', '453', '455', '457', '470', '471', '473', '474', '667', '680', '700', '701', '704', '713', '714', '722', '724', '725', '726', '727', '729', '744', '748', '766', '767', '779', '781', '782', '793', '797', '799', '832', '834', '856'],
  3: ['028', '080', '082', '120', '121', '128', '140', '141', '142', '143', '148', '168', '172', '173', '174', '175', '178', '180', '181', '182', '183', '184', '185', '186', '187', '188', '191', '195', '210', '211', '216', '230', '231', '232', '236', '238', '240', '241', '242', '262', '272', '283', '290', '291', '292', '294', '297', '299', '310', '312', '313', '314', '317', '318', '319', '320', '321', '329', '338', '339', '341', '342', '344', '372', '386', '387', '388', '389', '390', '391', '392', '393', '394', '396', '397', '422', '423', '424', '430', '431', '435', '437', '438', '439', '440', '441', '442', '443', '446', '450', '451', '452', '460', '461', '462', '466', '472', '476', '478', '479', '508', '514', '515', '516', '612', '619', '620', '622', '623', '625', '626', '635', '638', '639', '640', '644', '645', '646', '647', '653', '654', '655', '657', '660', '661', '664', '665', '666', '670', '671', '673', '681', '683', '684', '685', '686', '687', '688', '693', '703', '706', '707', '708', '710', '711', '735', '736', '739', '740', '743', '754', '755', '756', '757', '759', '765', '775', '776', '777', '778', '786', '795', '796', '808', '810', '833', '835', '838', '845', '853', '855', '857', '859', '890', '937'],
  4: ['029', '081', '083', '084', '122', '123', '124', '125', '126', '127', '129', '132', '133', '134', '135', '136', '144', '146', '147', '149', '169', '176', '177', '179', '189', '190', '194', '196', '210', '211', '216', '224', '225', '229', '233', '234', '235', '237', '239', '243', '245', '246', '270', '278', '279', '280', '287', '293', '298', '301', '302', '306', '307', '308', '309', '315', '316', '330', '333', '334', '398', '432', '433', '434', '436', '448', '449', '458', '463', '464', '465', '467', '468', '469', '475', '477', '480', '481', '483', '485', '486', '487', '502', '503', '507', '509', '510', '511', '512', '513', '520', '522', '523', '524', '525', '526', '527', '528', '532', '546', '547', '590', '597', '609', '610', '611', '613', '614', '615', '616', '617', '618', '624', '627', '628', '629', '630', '633', '634', '636', '637', '641', '648', '652', '656', '658', '662', '668', '669', '672', '675', '678', '679', '705', '712', '730', '731', '734', '737', '738', '741', '745', '746', '747', '749', '750', '751', '758', '760', '761', '762', '763', '764', '770', '772', '773', '774', '788', '800', '801', '805', '806', '807', '836', '837', '840', '842', '843', '844', '847', '850', '851', '852', '863', '864', '889', '891', '936'],
  5: ['010', '011', '012', '027', '040', '042', '060', '061', '062', '063', '064', '071', '072', '073', '086', '087', '117', '119', '130', '131', '137', '138', '139', '145', '192', '193', '197', '199', '200', '202', '203', '204', '205', '207', '208', '209', '217', '271', '272', '273', '274', '275', '281', '284', '285', '286', '288', '289', '296', '300', '304', '305', '482', '484', '490', '493', '494', '495', '496', '497', '530', '531', '534', '535', '538', '539', '540', '541', '542', '544', '545', '548', '549', '550', '551', '553', '554', '555', '558', '559', '560', '561', '562', '563', '564', '565', '566', '567', '570', '571', '572', '573', '574', '575', '576', '577', '591', '592', '593', '594', '595', '596', '604', '631', '650', '651', '674', '676', '677', '822', '823', '824', '825', '827', '828', '829', '830', '831', '841', '846', '860', '893', '894', '922', '923', '924', '925', '930', '932', '933', '956', '957', '967', '968', '985', '990', '991', '992', '993', '994'],
  6: ['013', '014', '015', '018', '019', '023', '025', '026', '041', '043', '044', '045', '046', '047', '048', '049', '050', '051', '052', '053', '054', '055', '056', '057', '058', '059', '067', '077', '078', '088', '089', '104', '109', '198', '201', '220', '221', '222', '223', '226', '227', '228', '244', '276', '282', '303', '311', '488', '489', '491', '492', '498', '499', '537', '543', '556', '557', '580', '581', '582', '583', '584', '585', '586', '587', '588', '598', '599', '600', '601', '603', '605', '606', '608', '752', '753', '768', '769', '771', '787', '789', '790', '791', '792', '811', '812', '813', '814', '816', '820', '821', '826', '865', '885', '895', '897', '898', '919', '920', '921', '928', '934', '935', '939', '952', '958', '980', '981', '982', '983', '984', '986', '987', '988', '989', '996'],
  7: ['016', '017', '020', '021', '022', '039', '065', '066', '068', '069', '070', '074', '075', '085', '105', '114', '115', '277', '331', '332', '602', '607', '803', '804', '906', '907', '908', '910', '911', '912', '913', '917', '918', '926', '927', '949', '953', '954', '955', '959', '960', '961', '970', '971', '972', '973', '974', '975', '976', '977', '978', '979', '997'],
  8: ['024', '076', '079', '103', '106', '107', '108', '110', '111', '116', '118', '900', '901', '902', '905', '914', '915', '916', '931', '945', '946', '947', '948', '950', '995', '998'],
  9: ['100', '102', '112', '113', '903', '904', '940', '941', '942', '951', '999'],
  10: ['101', '943', '944']
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
    Premium: 0.305,
    Ultra: 0.34
  },
  maxBenefitAmount: {
    Basic: 8333.33,
    Premium: 10000,
    Ultra: 15000
  },
  maxUnits: {
    Basic: 83.33,
    Premium: 166.66,
    Ultra: 250
  },
  weeks: 52,
  incomeBrackets: {
    Basic: { min: 0, max: 100000 },
    Premium: { min: 100001, max: 200000 },
    Ultra: { min: 200001, max: 300000 }
  }
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


export const PRODUCT_CONTENT: Record<Product, PlanRecord<{
  paragraph: string;
  bulletPoints: string[];
}>> = {
  'LTD': {
    'Basic': {
      paragraph: "How would you pay your expenses if you cannot work because of injury or illness?",
      bulletPoints: [
        "LTD Insurance protects your ability to earn an income",
        "Up to $8,333 of monthly benefit",
        "Your benefit will be {calculateLTDBenefit} of lost income per month",
        "Guaranteed Issue - meaning just sign-up and you're enrolled",
        "Benefit can be paid up to your normal retirement age",
        "Available for employees only"
      ]
    },
    'Premium': {
      paragraph: "How would you pay your expenses if you cannot work because of injury or illness?",
      bulletPoints: [
        "LTD Insurance protects your ability to earn an income",
        "Up to $10,000 of monthly benefit",
        "Your benefit will be {calculateLTDBenefit} of lost income per month",
        "Guaranteed Issue - meaning just sign-up and you're enrolled",
        "Benefit can be paid up to your normal retirement age",
        "Available for employees only"
      ]
    },
    'Ultra': {
      paragraph: "How would you pay your expenses if you cannot work because of injury or illness? Our Ultra plan provides enhanced coverage for high-income earners.",
      bulletPoints: [
        "LTD Insurance protects your ability to earn an income",
        "Up to $15,000 of monthly benefit",
        "Your benefit will be {calculateLTDBenefit} of lost income per month",
        "Guaranteed Issue - meaning just sign-up and you're enrolled",
        "Benefit can be paid up to your normal retirement age",
        "Available for employees only",
        "Ideal for salaries above $200,000"
      ]
    }
  },
  'STD': {
    'Basic': {
      paragraph: "How would you pay your monthly expenses if you cannot work because of injury or illness?",
      bulletPoints: [
        "Up to $1,200 of weekly benefit",
        "Your benefit will be {weeklySTDBenefit} of lost income per week",
        "Includes missing work due to pregnancy (women only)",
        "Guaranteed Issue - meaning just sign-up and you're enrolled",
        "Available for employees only"
      ]
    },
    'Premium': {
      paragraph: "How would you pay your monthly expenses if you cannot work because of injury or illness?",
      bulletPoints: [
        "Up to $1,200 of weekly benefit",
        "Your benefit will be {weeklySTDBenefit} of lost income per week",
        "Includes missing work due to pregnancy (women only)",
        "Guaranteed Issue - meaning just sign-up and you're enrolled",
        "Available for employees only"
      ]
    }
  },
  'Life / AD&D': {
    'Basic': {
      paragraph: "Life insurance helps loved ones financially in the event of a premature death.",
      bulletPoints: [
        "Cover funeral costs (avg. $15,000), payoff credit debt or establish a college fund.",
        "Up to $150,000 of coverage.",
        "Accidental death and dismemberment (AD&D) is part of the policy at the same coverage amount.",
        "Guaranteed Issue - meaning just sign-up and you're enrolled.",
        "Spouse is eligible for up to $20,000 of coverage.",
        "$2.50 provides $10,000 of coverage for all your children.",
        "Available for employees and dependents"
      ]
    },
    'Premium': {
      paragraph: "Life insurance helps loved ones financially in the event of a premature death.",
      bulletPoints: [
        "Cover funeral costs (avg. $15,000), payoff credit debt or establish a college fund.",
        "Up to $150,000 of coverage.",
        "Accidental death and dismemberment (AD&D) is part of the policy at the same coverage amount.",
        "Guaranteed Issue - meaning just sign-up and you're enrolled.",
        "Spouse is eligible for up to $20,000 of coverage.",
        "$2.50 provides $10,000 of coverage for all your children.",
        "Available for employees and dependents"
      ]
    }
  },
  'Accident': {
    'Basic': {
      paragraph: "It's not if you have an accident rather, when? Accident insurance helps with expenses that may not be covered by other insurances.",
      bulletPoints: [
        "Pays large benefit amounts for accidents needing medical attention",
        "Benefit is paid directly to you",
        "Pays for on and off the job accidents",
        "An extra 25% is paid for accidents that occur playing organized sports",
        "Available for employees and dependents"
      ]
    },
    'Premium': {
      paragraph: "It's not if you have an accident rather, when? Accident insurance helps with expenses that may not be covered by other insurances.",
      bulletPoints: [
        "Pays large benefit amounts for accidents needing medical attention",
        "Benefit is paid directly to you",
        "Pays for on and off the job accidents",
        "An extra 25% is paid for accidents that occur playing organized sports",
        "Available for employees and dependents"
      ]
    }
  },
  'Dental': {
    'Basic': {
      paragraph: "Dental insurance provides access to affordable care. Maintenance of healthy teeth and gums is directly related to overall health. Are you taking care of your teeth?",
      bulletPoints: [
        "Great benefit if your dentist is in network.",
        "Check for an in-network dentist [HERE](https://providers.online.metlife.com/findDentist?searchType=findDentistMetLife).",
        "$1000 annual maximum per person.",
        "Root canals covered in basic at 80% (typically root canals are major coverage).",
        "Available for employees and dependents"
      ]
    },
    'Premium': {
      paragraph: "Dental insurance provides access to affordable care. Maintenance of healthy teeth and gums is directly related to overall health. Are you taking care of your teeth?",
      bulletPoints: [
        "Pays the same if your dentist is in-network or out-of-network.",
        "Check for an in-network dentist {{HERE|https://providers.online.metlife.com/findDentist?searchType=findDentistMetLife}} for bigger savings.",
        "$1,500 annual maximum per person.",
        "Root canals are covered in the basic level at 80% (typically root canals are major coverage at 50% or less).",
        "$1,000 child ortho (lifetime max).",
        "Available for employees and dependents"
      ]
    }
  },
  'Vision': {
    'Basic': {
      paragraph: "Vision exams are critical to detect eye disease, which are typical and may go unnoticed because they show no symptoms in the early stages.",
      bulletPoints: [
        "$10 copay for an annual eye exam.",
        "You can get frames and lenses every year.",
        "VSP Network.",
        "Check for an in-network doctor {{HERE|https://www.vsp.com/eye-doctor}}.",
        "Available for employee and dependents"
      ]
    },
    'Premium': {
      paragraph: "Vision exams are critical to detect eye disease, which are typical and may go unnoticed because they show no symptoms in the early stages.",
      bulletPoints: [
        "$10 copay for an annual eye exam.",
        "You can get frames and lenses every year.",
        "VSP Network.",
        "Check for an in-network doctor {{HERE|https://www.vsp.com/eye-doctor}}.",
        "Available for employee and dependents"
      ]
    }
  },
  'Critical Illness/Cancer': {
    'Basic': {
      paragraph: "Money won't fix everything but our lump sum payment can help relieve some of the financial stress if cancer or other critical illnesses were to strike.",
      bulletPoints: [
        "Helps cover expenses that other insurance won't",
        "Pays $15,000 lump sum for initial diagnosis of covered illnesses",
        "Pays same lump sum for reoccurrence",
        "Pays $15,000 on the initial diagnosis of invasive cancer",
        "Benefit is paid directly to you",
        "Dozens of illnesses are covered by this policy",
        "Available for employees and dependents"
      ]
    },
    'Premium': {
      paragraph: "Money won't fix everything but our lump sum payment can help relieve some of the financial stress if cancer or other critical illnesses were to strike.",
      bulletPoints: [
        "Helps cover expenses that other insurance won't",
        "Pays $15,000 lump sum for initial diagnosis of covered illnesses",
        "Pays same lump sum for reoccurrence",
        "Pays $15,000 on the initial diagnosis of invasive cancer",
        "Benefit is paid directly to you",
        "Dozens of illnesses are covered by this policy",
        "Available for employees and dependents"
      ]
    }
  }
};
