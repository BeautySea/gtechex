import React, { useEffect, useState } from 'react';

interface compProps {
  setRemoteJob?: React.Dispatch<React.SetStateAction<string | boolean>>;
}
const CheckboxGroup: React.FC<compProps> = ({ setRemoteJob }) => {
  const [selectedOption, setSelectedOption] = useState<string | boolean>('');

  const handleCheckboxChange = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (setRemoteJob) {
      setRemoteJob(selectedOption);
    }
  }, [setRemoteJob, selectedOption]);

  return (
    <div className="flex items-center space-x-4 mb-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedOption === 'Remote'}
          onChange={() => handleCheckboxChange('Remote')}
          className="form-checkbox h-5 w-5 text-indigo-600 checked:bg-gray-800"
        />
        <span className="block text-sm font-medium text-gray-900">Remote</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedOption === 'Onsite'}
          onChange={() => handleCheckboxChange('Onsite')}
          className="form-checkbox h-5 w-5 text-indigo-600 checked:bg-gray-800"
        />
        <span className="block text-sm font-medium text-gray-900">Onsite</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selectedOption === 'Hybrid'}
          onChange={() => handleCheckboxChange('Hybrid')}
          className="form-checkbox h-5 w-5 text-indigo-600 checked:bg-gray-800"
          style={{
            backgroundColor: selectedOption === 'Hybrid' ? '#131D26' : '',
          }}
        />
        <span className="block text-sm font-medium text-gray-900">Hybrid</span>
      </label>
    </div>
  );
};

export default CheckboxGroup;
