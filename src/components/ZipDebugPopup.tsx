import React, { useState } from 'react';

interface ZipDebugPanelProps {
  zipInput: string;
  matchingPrefix: string;
  matchingRegionRate: string;
  matchingState: string;
}

const ZipDebugPanel: React.FC<ZipDebugPanelProps> = ({
  zipInput,
  matchingPrefix,
  matchingRegionRate,
  matchingState,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div 
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>ZIP Debug Info</span>
        <span>{isExpanded ? '▼' : '▲'}</span>
      </div>
      {isExpanded && (
        <div className="p-4">
          <p><strong>ZIP Input:</strong> {zipInput}</p>
          <p><strong>Matching Prefix:</strong> {matchingPrefix}</p>
          <p><strong>Matching Region Rate:</strong> {matchingRegionRate}</p>
          <p><strong>Matching State:</strong> {matchingState}</p>
        </div>
      )}
    </div>
  );
};

export default ZipDebugPanel;