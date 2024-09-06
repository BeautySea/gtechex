import { Skeleton } from 'antd';
import StatusComponent from './StatusComponent';
import SkeletonInput from 'antd/es/skeleton/Input';
import { useEffect, useState } from 'react';
import PlatformComp from './PlatformComp';
import { formatDate } from '../../../utils/utilFucntions';
import JobStatusComp from './JobStatusComp';
import CustomButton from '../../common/buttons/CustomButton';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import ENUM from '../../../service/enum';
import baseAxios from '../../../api/baseAxios';
import Spinner from '../../common/spinner/Spinner';

interface compProps {
  data: any;
  loading: boolean;
  searchKeyword: string;
}

interface DataType {
  dataKey: React.ReactNode;
  serialNo: number;
  jobTitle: string;
  timePosted: string;
  worktype: string;
  companyName: string;
  jobLink: string;
}

const data: DataType[] = [
  {
    dataKey: 1,
    serialNo: 1,
    jobTitle: 'Product Designer',
    timePosted: '5 mins ago',
    worktype: 'Remote',
    companyName: 'Cloutra',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 2,
    serialNo: 2,
    jobTitle: 'Front Developer',
    timePosted: '25 mins ago',
    worktype: 'Hybrid',
    companyName: 'Google',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 3,
    serialNo: 3,
    jobTitle: 'Front Engineer',
    timePosted: '10 mins ago',
    worktype: 'on-site',
    companyName: 'Cloutra',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 4,
    serialNo: 4,
    jobTitle: 'Project Manager',
    timePosted: '10 mins ago',
    worktype: 'Remote',
    companyName: 'Apple',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 5,
    serialNo: 5,
    jobTitle: 'Project Manager',
    timePosted: '10 mins ago',
    worktype: 'Remote',
    companyName: 'Apple',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 6,
    serialNo: 6,
    jobTitle: 'Project Manager',
    timePosted: '10 mins ago',
    worktype: 'Remote',
    companyName: 'Apple',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 7,
    serialNo: 7,
    jobTitle: 'Project Manager',
    timePosted: '10 mins ago',
    worktype: 'Remote',
    companyName: 'Apple',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 8,
    serialNo: 8,
    jobTitle: 'Project Manager',
    timePosted: '10 mins ago',
    worktype: 'Remote',
    companyName: 'Apple',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 9,
    serialNo: 9,
    jobTitle: 'Project Manager',
    timePosted: '10 mins ago',
    worktype: 'Remote',
    companyName: 'Apple',
    jobLink: 'http://linked.com/jobs...',
  },
  {
    dataKey: 10,
    serialNo: 10,
    jobTitle: 'Project Manager',
    timePosted: '10 mins ago',
    worktype: 'Remote',
    companyName: 'Apple',
    jobLink: 'http://linked.com/jobs...',
  },
];

const JobListingTable = ({ data, loading, searchKeyword }: compProps) => {
  const token = localStorage.getItem('authToken') || '';
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [renderedData, setRenderedData] = useState<any>([]);
  const [response, errorMsg, requestLoading, axiosRequestFucntion] =
    useAxiosFucntion();
  const status = ['Applied', 'Employed', 'Rejected'];
  const handleCheckboxChange = (rowId: number) => {
    // Toggle the selection status of the row
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        // If the row is already selected, remove it from the selectedRows array
        return prevSelectedRows.filter((id) => id !== rowId);
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
        ? data.map((job: any) => job.id)
        : []
    );
  };

  const numRows = data ? data.length : 0;

  console.log('data', data);

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
      setRenderedData(data);
    }
  }, [searchKeyword]);

  const handleMultipleResumeDelete = () => {
    axiosRequestFucntion({
      axiosInstance: baseAxios,
      method: 'DELETE',
      url: ENUM.DELETE_MANY_APPLICATIONS,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          job_ids: selectedRows,
        },
      },
    });
  };

  console.log('response', response);

  return (
    <div className="relative overflow-x-auto">
      {selectedRows.length > 0 ? (
        <CustomButton
          type="button"
          text="Delete"
          handleClick={handleMultipleResumeDelete}
          svg={
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0478 5.07365C11.1641 5.07365 11.2696 5.1244 11.353 5.21015C11.4307 5.30173 11.4699 5.41548 11.4585 5.53565C11.4585 5.57531 11.1476 9.50694 10.9701 11.1618C10.8589 12.1774 10.2042 12.794 9.22214 12.8109C8.46704 12.8278 7.72895 12.8337 7.00221 12.8337C6.23065 12.8337 5.47612 12.8278 4.7437 12.8109C3.79457 12.7882 3.13932 12.1605 3.03379 11.1618C2.85112 9.50111 2.5459 5.57531 2.54022 5.53565C2.53455 5.41548 2.57313 5.30173 2.65142 5.21015C2.72857 5.1244 2.83977 5.07365 2.95664 5.07365H11.0478ZM8.20442 1.16699C8.72012 1.16699 9.18079 1.52691 9.31411 2.04023L9.40942 2.46606C9.48657 2.81314 9.78725 3.05872 10.1333 3.05872H11.8342C12.0611 3.05872 12.25 3.24714 12.25 3.48689V3.70855C12.25 3.94246 12.0611 4.13671 11.8342 4.13671H2.16641C1.93892 4.13671 1.75 3.94246 1.75 3.70855V3.48689C1.75 3.24714 1.93892 3.05872 2.16641 3.05872H3.86725C4.21275 3.05872 4.51343 2.81314 4.59115 2.46665L4.68022 2.06882C4.81865 1.52691 5.27421 1.16699 5.79557 1.16699H8.20442Z"
                fill="#F8F9FF"
              />
            </svg>
          }
          className="flex items-center justify-center gap-[5px] text-sm font-medium text-[#fff] py-[8px] px-[12px] bg-[#EB5757] rounded-[5px] mt-2 mb-2"
        />
      ) : null}
      {/* <table className="w-full text-sm text-left rtl:text-right text-[#5F5F5F]">
        <thead className="text-xs text-[#5F5F5F] uppercase border-b border-[#C5C5C5]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Platform
            </th>
            <th scope="col" className="px-6 py-3">
              Date applied
            </th>
            <th scope="col" className="px-6 py-3">
              Custom CV
            </th>
            <th scope="col" className="px-6 py-3">
              Job link
            </th>
            <th scope="col" className="px-6 py-3">
              Job status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? data.map((item: any) => (
                <tr className="" key={item?.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900"
                  >
                    {item?.position}
                  </th>
                  <td className="px-6 py-4 flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M15.2801 15.2825H13.0588V11.8018C13.0588 10.9718 13.042 9.90375 11.9013 9.90375C10.7432 9.90375 10.5663 10.8069 10.5663 11.7406V15.2825H8.34508V8.125H10.4788V9.10058H10.5076C10.8057 8.53808 11.5307 7.94437 12.6138 7.94437C14.8645 7.94437 15.2807 9.42567 15.2807 11.3538L15.2801 15.2825ZM5.83636 7.14562C5.12136 7.14562 4.54698 6.56687 4.54698 5.855C4.54698 5.14375 5.12198 4.56563 5.83636 4.56563C6.54886 4.56563 7.12636 5.14375 7.12636 5.855C7.12636 6.56687 6.54823 7.14562 5.83636 7.14562ZM6.95011 15.2825H4.72261V8.125H6.95011V15.2825ZM16.3913 2.5H3.60761C2.99573 2.5 2.50073 2.98375 2.50073 3.58063V16.4194C2.50073 17.0168 2.99573 17.5 3.60761 17.5H16.3895C17.0007 17.5 17.5007 17.0168 17.5007 16.4194V3.58063C17.5007 2.98375 17.0007 2.5 16.3895 2.5H16.3913Z"
                        fill="#0077B5"
                      />
                    </svg>
                    {item?.platform}
                  </td>
                  <td className="px-6 py-4">{item?.date_applied}</td>
                  <td className="px-6 py-4">{item?.custom_cv}</td>
                  <td className="px-6 py-4">{item?.job_link}</td>
                  <td className="px-6 py-4">
                    <StatusComponent value={item?.job_status} />
                  </td>
                </tr>
              ))
            : 'No data'}
        </tbody>
      </table> */}
      {requestLoading ? (
        <Spinner />
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-[#131D26] uppercase bg-[#A8A8AB14] border border-[#E5E6EC]">
            <tr>
              <th
                scope="col"
                className="px-[12px] py-[14px] border border border-[#E5E6EC]"
              >
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
              <th
                scope="col"
                className="px-2 py-3 border border-[#E5E6EC] text-center"
              >
                S/N{' '}
              </th>{' '}
              <th
                scope="col"
                className="px-[12px] py-[14px] border border-[#E5E6EC]"
              >
                Position
              </th>{' '}
              <th
                scope="col"
                className="px-[12px] py-[14px] border border-[#E5E6EC]"
              >
                Platform
              </th>{' '}
              <th
                scope="col"
                className="px-[12px] py-[14px] border border-[#E5E6EC]"
              >
                Date Applied
              </th>{' '}
              <th
                scope="col"
                className="px-[12px] py-[14px] border border-[#E5E6EC]"
              >
                Job Link
              </th>{' '}
              <th
                scope="col"
                className="px-[12px] py-[14px] border border-[#E5E6EC]"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {renderedData.map((item: any, i: number) => (
              <tr className="bg-white border border-[#E5E6EC] hover:bg-gray-50 text-[#131D26]">
                <td className="w-4 px-[12px] py-[10px] border border-[#E5E6EC]">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${item.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-[#E5E6EC] rounded focus:ring-blue-500 cursor-pointer"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <label
                      htmlFor={`checkbox-table-search-1`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="pl-[12px] py-[10px] border border-[#E5E6EC] text-[#131D26] font-medium text-xs text-center">
                  {i + 1}
                </td>
                <td className="px-[12px] py-[10px] border border-[#E5E6EC] text-[#131D26] font-medium text-xs">
                  {item?.position}
                </td>
                <td className="px-[12px] py-[10px] border border-[#E5E6EC] text-[#131D26] font-medium text-xs">
                  <PlatformComp platform={item?.platform} />
                </td>
                <td className="px-[12px] py-[10px] border border-[#E5E6EC] text-[#131D26] font-medium text-xs">
                  {/* <span className="border border-[#E5E6EC] px-[12px] py-[4px] rounded-[24px]">
                  {item?.worktype}
                </span> */}
                  {formatDate(item?.createdAt)}
                </td>
                <td className="px-[12px] py-[10px] border border-[#E5E6EC] text-[#131D26] font-medium text-xs">
                  <a>{item?.jobLink}</a>
                </td>
                <td className="px-[12px] py-[10px] border border-[#E5E6EC] text-[#131D26] font-medium text-xs">
                  <StatusComponent value={item?.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobListingTable;
