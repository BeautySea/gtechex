import React, { useCallback, useEffect, useState } from 'react';
import CustomButton from '../../common/buttons/CustomButton';
import { IRequest, IResponse } from './OverviewApplicationForm';
import toast, { Toaster } from 'react-hot-toast';
import ENUM from '../../../service/enum';
import Spinner from '../../common/spinner/Spinner';
import { log } from 'console';

interface DataType {
  dataKey: React.ReactNode;
  serialNo: number;
  jobTitle: string;
  timePosted: string;
  worktype: string;
  companyName: string;
  jobLink: string;
}

interface compProps {
  searchKeyword: string;
  userId: string;
  data: any;
  requestLoading: boolean;
  platform: {
    current: string;
  };
  seletecResumeId: any;
}

const ApplyListTable = ({
  searchKeyword,
  userId,
  data,
  platform,
  requestLoading,
  seletecResumeId,
}: compProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [renderedData, setRenderedData] = useState<any>([]);
  const [jobsToApply, setJobsToApply] = useState<any>([]);
  const [finalMessage, setFinalMessage] = useState('');
  const [isLoading, setIsloading] = useState(false);

  console.log('userId', userId);

  const handleCheckboxChange = (rowId: number) => {
    // Toggle the selection status of the row
    setSelectedRows((prevSelectedRows: any) => {
      if (prevSelectedRows.includes(rowId)) {
        // If the row is already selected, remove it from the selectedRows array
        return prevSelectedRows.filter((id: any) => id !== rowId);
      } else {
        // If the row is not selected, add it to the selectedRows array
        return [...prevSelectedRows, rowId];
      }
    });
  };

  const handleSelectAll = () => {
    // Select or deselect all rows based on the current state
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === 0 && data
        ? data.map((item: any) => item.id)
        : []
    );
  };

  useEffect(() => {
    handleSelectAll();
  }, [data]);

  const numRows = data ? data.length : 0; // Set the total number of rows

  useEffect(() => {
    if (searchKeyword !== '') {
      if (data.length > 0) {
        const result: any = data.filter((item: any) =>
          item?.companyName
            .toLocaleLowerCase()
            .includes(searchKeyword.toLocaleLowerCase())
        );
        setRenderedData(result);
      }
    } else {
      console.log('data', data);
      setRenderedData(data);
    }
  }, [searchKeyword, data]);

  useEffect(() => {
    // setJobsToApply
    function filterObjectsByIds(
      objects: { id: string; title: string; url: string }[],
      ids: string[]
    ): { id: string; title: string; url: string }[] {
      setJobsToApply(objects.filter((object) => ids.includes(object.id)));
      return objects.filter((object) => ids.includes(object.id));
    }

    filterObjectsByIds(data, selectedRows);
  }, [selectedRows]);

  // console.log('renderedData', renderedData);

  function trimWhitespace(input: string): string {
    // Remove leading and trailing whitespace and newline characters
    if (platform.current === 'LinkedIn') {
      return input.trim();
    } else {
      return input.trim();
    }
    return '';
  }

  function truncateUrl(url: string, maxLength: number = 40): string {
    // Check if URL is already less than or equal to the max length
    if (url.length <= maxLength) {
      return url;
    }

    // Calculate the number of characters to keep from the beginning
    const keepLength = Math.floor(maxLength / 2) - 3; // Account for "..."

    // Truncate the URL and add ellipsis
    return `${url.substring(0, keepLength)}...`;
  }
  // console.log('selectedRows', selectedRows);
  console.log('jobsToApply', jobsToApply);
  console.log('seletecResumeId', seletecResumeId);
  //
  const handleApply = useCallback(() => {
    setIsloading(true);
    chrome.runtime.sendMessage<IRequest, IResponse>(
      ENUM.CHROME_ACCESS_TOKEN,
      {
        command:
          platform.current === 'dice'
            ? 'DICE_INITIALIZE_APPLICATION_F_B'
            : platform.current === 'indeed'
            ? 'INDEED_INITIALIZE_APPLICATION_F_B'
            : 'LINKEDIN_INITIALIZE_APPLICATION_F_B',
        data: {
          jobs: jobsToApply,
          userResumeID: seletecResumeId,
          userID: userId,
        },
      },
      function (response: IResponse | undefined) {
        setIsloading(false);
        console.log('Response from background script:', response);
        toast.success(response?.message || '');
        setFinalMessage(response?.message || '');
      }
    );
  }, [jobsToApply]);

  // const regex = /\(([^)]+)\)/;]
  const regex = /\((Remote|On-site|Hybrid)\)/;

  function checkStringForKeywords(input: string): string {
    const daysAgoMatch = input.match(/\b\d+\s+days\s+ago\b/);
    const hoursAgoMath = input.match(/\b\d+\s+hours\s+ago\b/);
    console.log('hoursAgoMath', hoursAgoMath);

    if (hoursAgoMath) {
      return hoursAgoMath[0];
    }

    if (daysAgoMatch !== null) {
      return daysAgoMatch[0];
    }

    if (input.includes('Viewed')) {
      return 'Viewed';
    }

    if (input.includes('Applied')) {
      return 'applied';
    }

    return '';
  }

  function determineLocation(location: any) {
    const regex = /\((Remote|On-site|Hybrid)\)/;

    if (typeof location === 'string') {
      const match = location.match(regex);
      if (match) {
        return match[1];
      }
    } else if (Array.isArray(location)) {
      if (location[0] === 'others') {
        return 'On-Site';
      }
      return location[0];
    }

    return 'On-Site';
  }

  return (
    <>
      <div className="mt-[20px]">
        <div className="relative overflow-x-auto sm:rounded-lg mb-[12px]">
          {requestLoading ? (
            <Spinner />
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-[#A8A8AB14] border border-gray-200">
                <tr>
                  <th scope="col" className="p-4 border border border-gray-300">
                    <div className="flex items-center">
                      <input
                        id="select-all"
                        type="checkbox"
                        className="w-4 h-4 text-[#fff] bg-[#131D26] rounded-[4px] cursor-pointer"
                        checked={selectedRows.length === numRows}
                        onChange={handleSelectAll}
                      />
                      <label htmlFor="select-all" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-300">
                    S/N{' '}
                  </th>{' '}
                  <th scope="col" className="px-6 py-3 border border-gray-300">
                    Job Title{' '}
                  </th>{' '}
                  <th scope="col" className="px-6 py-3 border border-gray-300">
                    Application Type
                  </th>{' '}
                  <th scope="col" className="px-6 py-3 border border-gray-300">
                    Work Type{' '}
                  </th>{' '}
                  <th scope="col" className="px-6 py-3 border border-gray-300">
                    Company Name{' '}
                  </th>{' '}
                  {/* {platform.current === 'LinkedIn' && ( */}
                  <th scope="col" className="px-6 py-3 border border-gray-300">
                    Job Link{' '}
                  </th>
                  {/* )} */}
                  {/* {platform.current === 'linkedin' && (
                    <th
                      scope="col"
                      className="px-6 py-3 border border-gray-300"
                    >
                      Job Status{' '}
                    </th>
                  )} */}
                </tr>
              </thead>
              <tbody>
                {renderedData.length
                  ? renderedData?.map((item: any, i: any) => (
                      <tr
                        className="bg-white border border-gray-300 hover:bg-gray-50"
                        key={item?.id}
                      >
                        <td className="w-4 p-4 border border-gray-300">
                          <div className="flex items-center">
                            <input
                              id={`checkbox-table-search-${item?.id}`}
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              checked={selectedRows.includes(item?.id)}
                              onChange={() => handleCheckboxChange(item?.id)}
                            />
                            <label
                              htmlFor={`checkbox-table-search-1`}
                              className="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4 border border-gray-300">
                          {i + 1}
                        </td>
                        {/* job title */}
                        {platform.current === 'LinkedIn' ? (
                          <td className="px-6 py-4 border border-gray-300">
                            {item?.title !== '' && item?.title.includes('\n')
                              ? trimWhitespace(item?.title?.split('\n')[0])
                              : item?.title}
                          </td>
                        ) : (
                          <td className="px-6 py-4 border border-gray-300">
                            {item?.title === 'Untitled'
                              ? item?.role
                              : item?.title}
                          </td>
                        )}
                        {/* <td className="px-6 py-4 border border-gray-300">
                        {item?.title !== ''
                          ? trimWhitespace(item?.title?.split('\n')[0])
                          : ''}
                      </td> */}
                        {/* application type */}
                        {platform.current === 'LinkedIn' ? (
                          <td className="px-6 py-4 border border-gray-300">
                            {item.isEasyApply === true
                              ? 'Easy Apply'
                              : 'Company Website'}
                          </td>
                        ) : platform.current === 'Indeed' ? (
                          <td className="px-6 py-4 border border-gray-300">
                            {item.isEasyApply === true
                              ? 'Easy Apply'
                              : 'Company Website'}
                          </td>
                        ) : null}
                        {/* work type */}
                        {platform.current === 'LinkedIn' ? (
                          <td className="px-3 py-4 border border-gray-300">
                            <span className="border border-[#E5E6EC] px-[12px] py-[4px] rounded-[24px]">
                              {/* {item?.worktype} */}
                              {/* {item?.location?.match(regex)
                                ? item?.location?.match(regex)[1]
                                : 'On-Site'} */}
                              {determineLocation(item?.location)}
                            </span>
                          </td>
                        ) : platform.current === 'Indeed' ? (
                          <td className="px-3 py-4 border border-gray-300">
                            <span className="border border-[#E5E6EC] px-[12px] py-[4px] rounded-[24px]">
                              {item?.location.includes('Remote')
                                ? 'Remote'
                                : 'On-site'}
                            </span>
                          </td>
                        ) : (
                          <td className="px-6 py-4 border border-gray-300">
                            <span className="border border-[#E5E6EC] px-[12px] py-[4px] rounded-[24px]">
                              {/* {item?.worktype} */}
                              {item?.title}
                            </span>
                          </td>
                        )}
                        {/* Company Name */}
                        {/* {platform.current === 'LinkedIn' ? (
                          <td className="px-6 py-4 border border-gray-300">
                            {trimWhitespace(
                              item?.company ? item?.company : item?.companyName
                            )}
                          </td>
                        ) : platform.current === 'Indeed' ? (
                          <td className="px-6 py-4 border border-gray-300">
                            {trimWhitespace(
                              item?.company ? item?.company : item?.companyName
                            )}
                          </td>
                        ) : (
                          <td className="px-6 py-4 border border-gray-300">
                            {item?.companyName}
                          </td>
                        )} */}
                        <td className="px-6 py-4 border border-gray-300">
                          {trimWhitespace(
                            item?.company ? item?.company : item?.companyName
                          )}
                        </td>
                        {/* job link */}
                        {platform.current === 'LinkedIn' && (
                          <td className="px-6 py-4 border border-gray-300">
                            <a
                              href={item?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[blue]"
                            >
                              {truncateUrl(item?.url)}
                            </a>
                          </td>
                        )}
                        {platform.current === 'Indeed' && (
                          <td className="px-6 py-4 border border-gray-300">
                            <a
                              href={item?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[blue]"
                            >
                              {truncateUrl(item?.url)}
                            </a>
                          </td>
                        )}
                        {/* checkStringForKeywords */}
                        {/* {platform.current === 'linkedin' && (
                          <td className="px-6 py-4 border border-gray-300">
                            <a>
                              {item?.easyApply
                                ? checkStringForKeywords(item?.easyApply)
                                : item?.result?.htmlSnippet?.split('<b>')[0]}
                            </a>
                          </td>
                        )} */}
                      </tr>
                    ))
                  : 'No data'}
              </tbody>
            </table>
          )}
        </div>
        {data.length === selectedRows.length ? (
          <CustomButton
            type="button"
            text="Apply to all"
            handleClick={handleApply}
            loading={isLoading}
            svg={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M5.24992 9.43273L3.22576 7.40856C3.11669 7.29949 2.96875 7.23822 2.81451 7.23822C2.66026 7.23822 2.51233 7.29949 2.40326 7.40856C2.29419 7.51763 2.23291 7.66556 2.23291 7.81981C2.23291 7.89619 2.24795 7.97182 2.27718 8.04238C2.30641 8.11294 2.34925 8.17705 2.40326 8.23106L4.84159 10.6694C5.06909 10.8969 5.43659 10.8969 5.66409 10.6694L11.8358 4.49773C11.9448 4.38866 12.0061 4.24073 12.0061 4.08648C12.0061 3.93223 11.9448 3.7843 11.8358 3.67523C11.7267 3.56616 11.5788 3.50488 11.4245 3.50488C11.2703 3.50488 11.1223 3.56616 11.0133 3.67523L5.24992 9.43273Z"
                  fill="#F6D155"
                />
              </svg>
            }
            className="flex items-center justify-center gap-[5px] text-sm font-medium text-[#F6D155] py-[8px] px-[12px] bg-[#131D26] rounded-[5px] mb-5 mt-5"
          />
        ) : (
          <CustomButton
            type="button"
            text="Apply to selected"
            handleClick={handleApply}
            loading={isLoading}
            svg={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M5.24992 9.43273L3.22576 7.40856C3.11669 7.29949 2.96875 7.23822 2.81451 7.23822C2.66026 7.23822 2.51233 7.29949 2.40326 7.40856C2.29419 7.51763 2.23291 7.66556 2.23291 7.81981C2.23291 7.89619 2.24795 7.97182 2.27718 8.04238C2.30641 8.11294 2.34925 8.17705 2.40326 8.23106L4.84159 10.6694C5.06909 10.8969 5.43659 10.8969 5.66409 10.6694L11.8358 4.49773C11.9448 4.38866 12.0061 4.24073 12.0061 4.08648C12.0061 3.93223 11.9448 3.7843 11.8358 3.67523C11.7267 3.56616 11.5788 3.50488 11.4245 3.50488C11.2703 3.50488 11.1223 3.56616 11.0133 3.67523L5.24992 9.43273Z"
                  fill="#F6D155"
                />
              </svg>
            }
            className="flex items-center justify-center gap-[5px] text-sm font-medium text-[#F6D155] py-[8px] px-[12px] bg-[#131D26] rounded-[5px] mb-5 mt-5"
          />
        )}
      </div>
      <Toaster />
    </>
  );
};

export default ApplyListTable;
