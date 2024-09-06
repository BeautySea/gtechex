// export default CustomDropdown;
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../api/hooks/useAxios';
import axios from '../../../api/baseAxios';
import ENUM from '../../../service/enum';

interface DropdownProps {
  items?: string[];
  resumeID?: any;
  setSelectedResume?: any;
  setResumeToScore?: any;
  setSelectedResumeName?: any;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  resumeID,
  setSelectedResume,
  setSelectedResumeName,
  setResumeToScore,
}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef: any = useRef(null);

  const token = localStorage.getItem('authToken') || '';
  // const userDetails: UserDetails | undefined = getCookie('userDetails');
  const [resumes, errorMsg, requestLoading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_ALL_RESUME,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const handleItemClick = (item: any) => {
    console.log('the item', item);
    setResumeToScore(item?.file);
    setSelectedResume(item?.file?.location);
    setSelectedResumeName(item?.file?.name);
    setSelectedItem(item);
    setDropdownOpen(false);

    resumeID(item?.file?.id);
  };

  const handleRoute = (url: string, type: string) => {
    if (type === 'NEW') {
      navigate(`/${url}`);
    }
    navigate(`/${url}`, { state: { fileData: uploadedFile, from: 'apply' } });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  useEffect(() => {
    if (uploadedFile) {
      handleRoute('resumes', 'AI');
    }
  }, [uploadedFile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      {/* Trigger button */}
      <button
        type="button"
        className="inline-flex justify-between items-center border border-[#E5E6EC]  text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        {selectedItem?.file?.name || 'Select an item'}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12l-8-8 1.5-1.5L10 9l6.5-6.5L18 4l-8 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-full lg:w-1/2">
          <div className="py-1">
            {resumes?.data?.count > 0 ? (
              resumes?.data?.resumes?.map((item: any) => (
                <div
                  key={item}
                  className={`${
                    selectedItem === item ? 'bg-gray-100' : ''
                  } px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100`}
                  onClick={() => handleItemClick(item)}
                >
                  {item?.file?.name}
                </div>
              ))
            ) : (
              <span className="inline-block px-4 py-2 text-xs font-medium text-[#414343]">
                You have no resume!
              </span>
            )}
          </div>

          {/* File upload button */}
          {uploadedFile && (
            <div className="py-2 px-4 mt-2 text-gray-700">
              {uploadedFile.name}
            </div>
          )}

          <div className="flex flex-col gap-[8px] py-2 px-4 w-full border-t border-[#E5E6EC] p-[12px]">
            <label className="inline-flex gap-[4px] items-center justify-center w-full bg-[#A8A8AB33] text-[#131D26] text-sm font-medium px-4 py-2 rounded cursor-pointer">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.73062 1.16663C7.87501 1.16663 7.99629 1.28913 7.99629 1.43496V3.31329C7.99629 4.38079 8.86263 5.25579 9.92534 5.26163C10.3585 5.26163 10.705 5.26746 10.9707 5.26746C11.1498 5.26746 11.4443 5.26163 11.6927 5.26163C11.8371 5.26163 11.9583 5.37829 11.9583 5.52413V10.2141C11.9583 11.6608 10.7917 12.8333 9.35933 12.8333H4.76774C3.26032 12.8333 2.04167 11.6025 2.04167 10.0858V3.79746C2.04167 2.35079 3.20256 1.16663 4.64646 1.16663H7.73062ZM6.7892 5.09829C6.73144 5.09829 6.67369 5.10996 6.62171 5.13329C6.56973 5.15663 6.52352 5.18579 6.48309 5.22663L4.83128 6.90663C4.66378 7.07579 4.66378 7.34996 4.83128 7.51913C4.99877 7.68829 5.27022 7.68829 5.43771 7.51913L6.35603 6.58579V9.40329C6.35603 9.64246 6.54662 9.83496 6.7892 9.83496C7.026 9.83496 7.21659 9.64246 7.21659 9.40329V6.58579L8.13491 7.51913C8.3024 7.68829 8.57385 7.68829 8.74134 7.51913C8.91461 7.34996 8.91461 7.07579 8.74712 6.90663L7.08953 5.22663C7.0491 5.18579 7.00289 5.15663 6.95091 5.13329C6.89893 5.10996 6.84695 5.09829 6.7892 5.09829ZM8.83473 1.69513C8.83473 1.44371 9.13622 1.31888 9.30891 1.50029C9.93383 2.15596 11.0248 3.30221 11.6347 3.94271C11.8028 4.11946 11.6792 4.41288 11.4361 4.41346C10.9613 4.41521 10.4022 4.41346 9.99967 4.40938C9.36089 4.40938 8.83473 3.87796 8.83473 3.23279V1.69513Z"
                  fill="#131D26"
                />
              </svg>
              Upload Resume
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* <button
              type="button"
              onClick={() => handleRoute('resumes/create', 'NEW')}
              className="inline-flex gap-[4px] items-center justify-center w-full border border-[#A8A8AB33] text-[#5A5C5D] text-sm font-medium px-4 py-2 rounded cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.66536H8.66666V11.9987C8.66666 12.1755 8.59642 12.3451 8.4714 12.4701C8.34637 12.5951 8.17681 12.6654 7.99999 12.6654C7.82318 12.6654 7.65361 12.5951 7.52859 12.4701C7.40357 12.3451 7.33333 12.1755 7.33333 11.9987V8.66536H3.99999C3.82318 8.66536 3.65361 8.59513 3.52859 8.4701C3.40357 8.34508 3.33333 8.17551 3.33333 7.9987C3.33333 7.82189 3.40357 7.65232 3.52859 7.52729C3.65361 7.40227 3.82318 7.33203 3.99999 7.33203H7.33333V3.9987C7.33333 3.82189 7.40357 3.65232 7.52859 3.52729C7.65361 3.40227 7.82318 3.33203 7.99999 3.33203C8.17681 3.33203 8.34637 3.40227 8.4714 3.52729C8.59642 3.65232 8.66666 3.82189 8.66666 3.9987V7.33203H12C12.1768 7.33203 12.3464 7.40227 12.4714 7.52729C12.5964 7.65232 12.6667 7.82189 12.6667 7.9987C12.6667 8.17551 12.5964 8.34508 12.4714 8.4701C12.3464 8.59513 12.1768 8.66536 12 8.66536Z"
                  fill="#5A5C5D"
                />
              </svg>
              Create new resume
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
