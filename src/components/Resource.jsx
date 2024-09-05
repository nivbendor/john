import React from 'react';

export const getProductLabel = (product) => {
  switch (product) {
    case 'LTD': return 'Long-Term Disability';
    case 'STD': return 'Short-Term Disability';
    case 'Life / AD&D': return 'Life / AD&D';
    case 'Accident': return 'Accident';
    case 'Vision': return 'Vision';
    case 'Dental': return 'Dental';
    case 'Critical Illness/Cancer': return 'Critical Illness/Cancer';
    default: return product;
  }
};

export const insuranceResources = [
  { name: 'Long-Term Disability', pdfUrl: 'https://drive.google.com/file/d/1Is98ZpVnOvHLbXcCRFbQA_LdnQOcAXhs/view?usp=sharing' },
  { name: 'Short-Term Disability', pdfUrl: 'https://drive.google.com/file/d/1pp0b8hSu-v3vIwwIem-HO33oW419H7GJ/view?usp=sharing' },
  { name: 'Life / AD&D', pdfUrl: 'https://drive.google.com/file/d/1OdPgrmhZXNJxPktuicfAhperYZfBtjFj/view?usp=sharing' },
  { name: 'Accident', pdfUrl: 'https://drive.google.com/file/d/1WHltGto8P65qyX75mmSzbW5dT_A5oSHM/view?usp=sharing'},
  { name: 'Vision', pdfUrl: 'https://drive.google.com/file/d/1UZaGtagPlO5yoSfhh6SiRAq18gJCS0Yo/view?usp=sharing' },
  { name: 'Dental', pdfUrl: 'https://drive.google.com/file/d/104CY3yNGQO7CndksnwDaCKQ7NATsm5pq/view?usp=sharing' },
  { name: 'Critical Illness / Cancer', pdfUrl: 'https://drive.google.com/file/d/16ErPUOdmifHNue6XNfZ_tbR0LRRTcaDc/view?usp=sharing' },
];


const InsuranceResources: React.FC = () => {
  return (
    <div className="hidden lg:block bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-2">Insurance Resources</h2>
      <p className="text-gray-600 mb-4">
        Explore our collection of insurance product information.
      </p>
      <div className="space-y-2">
        {insuranceResources.map((resource: ResourceItem, index: number) => (
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