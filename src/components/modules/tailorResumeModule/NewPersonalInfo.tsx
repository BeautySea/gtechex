import React from 'react';
import CollapsibleWrapper from './CollapsibleWrapper';

interface compProps {
  personalInfoData: any;
  handleInputChange: any;
}

const PersonalInformation: React.FC<compProps> = ({
  personalInfoData,
  handleInputChange,
}) => {
  return (
    <CollapsibleWrapper title="Personal Information">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#131D26]">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
            // defaultValue={personalInfoData?.full_name}
            value={personalInfoData.full_name}
            // onChange={handleChange}
            onChange={(e) => handleInputChange('personal_information', e)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#131D26]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
            // defaultValue={personalInfoData?.email}
            value={personalInfoData.email}
            onChange={(e) => handleInputChange('personal_information', e)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#131D26]">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
            // defaultValue={personalInfoData?.phone}
            value={personalInfoData.phone}
            onChange={(e) => handleInputChange('personal_information', e)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#131D26]">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin"
            className="mt-1 block w-full py-[8px] px-[12px] text-[#131D26] placeholder:text-[#131D26] border border-[#E5E6EC] rounded focus:ring-[#131D26] focus:border-[#131D26] sm:text-xs"
            // defaultValue={personalInfoData?.linkedin}
            value={personalInfoData.linkedin}
            onChange={(e) => handleInputChange('personal_information', e)}
          />
        </div>
      </div>
    </CollapsibleWrapper>
  );
};

export default PersonalInformation;
