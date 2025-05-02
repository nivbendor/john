import React from 'react';
import { parseUrlParams } from '../utils/parseUrlParams';
import { isDistributor } from '../utils/isDistributor';
import { TAA } from '../utils/config';



const defaultLabels: Record<string, string> = {
  'LTD': 'Long-Term Disability (LTD)',
  'STD': 'Short-Term Disability (STD)',
  'Life / AD&D': 'Life / AD&D',
  'Accident': 'Accident',
  'Vision': 'Vision',
  'Dental': 'Dental',
  'Critical Illness/Cancer': 'Critical Illness/Cancer',
  'Hospital Indemnity': 'Hospital Indemnity',
  'Benefit Booklet': 'Benefit Booklet',
};

const taaLabels: Record<string, string> = {
  'LTD': 'Long-Term Disability (LTD)',
  'STD': 'Short-Term Disability (STD)',
  'Life / AD&D': 'Life / AD&D',
  'Accident': 'Accident',
  'Vision': 'Vision',
  'Dental': 'Dental',
  'Critical Illness/Cancer': 'Critical Illness/Cancer',
  'Telehealth': 'Telehealth',
  'Identity Theft Protection': 'Identity Theft Protection',
  // 'Virtual Primary Care': 'Virtual Primary Care',
  'Benefit Booklet': 'Benefit Booklet',
};

export const getProductLabel = (product: string) => {
  const labels = isDistributor(TAA) ? taaLabels : defaultLabels;
  return labels[product];
};

const baseInsuranceResources = [
  { name: 'Long-Term Disability', pdfUrl: 'https://drive.google.com/file/d/1Is98ZpVnOvHLbXcCRFbQA_LdnQOcAXhs/view?usp=sharing' },
  { name: 'Short-Term Disability', pdfUrl: 'https://drive.google.com/file/d/1pp0b8hSu-v3vIwwIem-HO33oW419H7GJ/view?usp=sharing' },
  { name: 'Life / AD&D', pdfUrl: 'https://drive.google.com/file/d/1OdPgrmhZXNJxPktuicfAhperYZfBtjFj/view?usp=sharing' },
  { name: 'Accident', pdfUrl: 'https://drive.google.com/file/d/1WHltGto8P65qyX75mmSzbW5dT_A5oSHM/view?usp=sharing' },
  { name: 'Vision', pdfUrl: 'https://drive.google.com/file/d/1UZaGtagPlO5yoSfhh6SiRAq18gJCS0Yo/view?usp=sharing' },
  { name: 'Dental', pdfUrl: 'https://drive.google.com/file/d/104CY3yNGQO7CndksnwDaCKQ7NATsm5pq/view?usp=sharing' },
  { name: 'Critical Illness/Cancer', pdfUrl: 'https://drive.google.com/file/d/16ErPUOdmifHNue6XNfZ_tbR0LRRTcaDc/view?usp=sharing' },
  { name: 'Hospital Indemnity', pdfUrl: 'https://drive.google.com/file/d/1H48CuXQ32gHVkXeJ6oxbCvaSsabScrbw/view?usp=sharing' },
  { name: 'Benefit Booklet', pdfUrl: 'https://drive.google.com/file/d/13UsCBflBEzgur-EA3OwMeitQXCA_uuux/view?usp=sharing' },
];

const taaInsuranceResources = [
  { name: 'Long-Term Disability', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/LTD%20Staff%20-%20TAA%204-29-2025.pdf' }, // assuming this is for staff
  { name: 'Short-Term Disability', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Short%20Term%20Disability%20-%20TAA%204-29-2025-4.pdf' },
  { name: 'Life / AD&D', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Vol%20Life%20-AD&D%20-%20TAA%204-29-2025-3.pdf' },
  { name: 'Accident', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Accident%20-%20TAA%204-29-2025-7.pdf' },
  { name: 'Vision', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Dental%20-%20TAA%204-29-2025-6.pdf' }, // Note: this URL says "Dental" — verify if this is correct for Vision
  { name: 'Dental', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Dental%20-%20TAA%204-29-2025-5.pdf' },
  { name: 'Telehealth', pdfUrl: 'https://drive.google.com/file/d/your-telehealth-pdf-id/view?usp=sharing' }, // No new link provided
  { name: 'Identity Theft Protection', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Identity%20Security%20-%20TAA%204-29-2025-9.pdf' },
  { name: 'Critical Illness/Cancer', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Critical%20Illness%2BCancer%20-%20TAA%204-29-2025-8.pdf' },
  { name: 'Benefit Booklet', pdfUrl: 'https://knowledge.cakewalkbenefits.com/hubfs/TAA/Benefit-Guide-TAA-7-1-2025.pdf' },
];


export const insuranceResources = isDistributor(TAA)
  ? taaInsuranceResources
  : baseInsuranceResources;


const InsuranceResources: React.FC = () => {
  const urlParams = parseUrlParams();
  const cpValue = urlParams.cpValue;

  // Update URLs dynamically based on `cp` value
  const dynamicResources = insuranceResources.map(resource => {
    if (cpValue === 'ken') {
      if (resource.name === 'Benefit Booklet') {
        return {
          ...resource,
          pdfUrl: 'https://drive.google.com/file/d/1mcSPesQZ3x2FuMk-xrlvmGh9Ok6OVrs_/view?usp=drive_link',
        };
      }
      if (resource.name === 'Dental') {
        return {
          ...resource,
          pdfUrl: 'https://drive.google.com/file/d/10OvFXcJqQsjPEI5iM3jwiB9070QOiouz/view?usp=drive_link',
        };
      }
    }
    return resource;
  });

  return (
    <div className="hidden lg:block bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-2">Insurance Resources</h2>
      <p className="text-gray-600 mb-4">
        Explore our collection of insurance product information.
      </p>
      <div className="space-y-2">
        {dynamicResources.map((resource, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span className="font-medium">{resource.name}</span>
            <a
              href={resource.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};


export { InsuranceResources };
export default InsuranceResources;