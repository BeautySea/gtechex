import React, { useState, ChangeEvent, useEffect } from 'react';

// interface Option {
//   value: string;
//   label: string;
// }
interface ColorState {
  bg: string;
  text: string;
}

interface StatusComponentProps {
  value: string;
  //   options: Option[];
  //   onChange: (value: string) => void;
}
const StatusComponent: React.FC<StatusComponentProps> = ({ value }) => {
  const options = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Employed', label: 'Employed' },
    { value: 'Rejected', label: 'Rejected' },
  ];
  const [color, setColor] = useState<ColorState>({
    bg: '',
    text: '',
  });
  const [selectedValue, setSelectedValue] = useState<string>(value);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  useEffect(() => {
    switch (selectedValue) {
      case 'Applied':
        setColor((prevColor) => ({
          // ...prevColor,
          bg: '#5F5F5F',
          text: '#131D26',
        }));
        break;
      case 'Interview':
        setColor((prevColor) => ({
          // ...prevColor,
          bg: '#F6D251',
          text: '#131D26',
        }));
        break;
      case 'Employed':
        setColor((prevColor) => ({
          // ...prevColor,
          bg: '#131D26',
          text: '#fff',
        }));
        break;
      case 'Rejected':
        setColor((prevColor) => ({
          // ...prevColor,
          bg: '#EB5757',
          text: '#fff',
        }));
        break;
      default:
        setColor((prevColor) => ({
          // ...prevColor,
          bg: '#5F5F5F',
          text: '#fff',
        }));
        break;
    }
  }, [selectedValue]);

  return (
    <select
      value={selectedValue}
      onChange={handleSelectChange}
      className={`px-[12px] py-[10px]  rounded border border-[#E5E6EC] focus:border-0 w-[119px]  ${
        selectedValue === 'Applied'
          ? 'text-gray-700 bg-white'
          : selectedValue === 'Employed'
          ? 'text-white bg-green-600'
          : selectedValue === 'Rejected'
          ? 'text-white bg-red-600'
          : ''
      } `}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={` ${
            selectedValue === 'Applied'
              ? 'text-gray-700'
              : selectedValue === 'Employed'
              ? 'text-white'
              : selectedValue === 'Rejected'
              ? 'text-white'
              : ''
          }`}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default StatusComponent;
