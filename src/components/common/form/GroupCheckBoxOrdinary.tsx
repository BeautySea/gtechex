import React, { useEffect, useState } from 'react';

interface compProps {
  setRemoteJob?: React.Dispatch<React.SetStateAction<string[]>>;
}

const GroupCheckBoxOrdinary: React.FC<compProps> = ({ setRemoteJob }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      // If the option is already selected, remove it
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // If the option is not selected, add it
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    if (setRemoteJob) {
      setRemoteJob(selectedOptions);
    }
  }, [setRemoteJob, selectedOptions]);

  return (
    <div className="flex items-center space-x-4 mb-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedOptions.includes('Remote')}
          onChange={() => handleCheckboxChange('Remote')}
          className="form-checkbox h-5 w-5 text-indigo-600 checked:bg-gray-800"
        />
        <span className="block text-sm font-medium text-gray-900">Remote</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedOptions.includes('Onsite')}
          onChange={() => handleCheckboxChange('Onsite')}
          className="form-checkbox h-5 w-5 text-indigo-600 checked:bg-gray-800"
        />
        <span className="block text-sm font-medium text-gray-900">Onsite</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedOptions.includes('Hybrid')}
          onChange={() => handleCheckboxChange('Hybrid')}
          className="form-checkbox h-5 w-5 text-indigo-600 checked:bg-gray-800"
          style={{
            backgroundColor: selectedOptions.includes('Hybrid')
              ? '#131D26'
              : '',
          }}
        />
        <span className="block text-sm font-medium text-gray-900">Hybrid</span>
      </label>
    </div>
  );
};

export default GroupCheckBoxOrdinary;
