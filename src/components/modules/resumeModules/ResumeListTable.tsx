/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import FileToRender from './FileToRender';
import { DataType } from '../../pages/resumes/resumesList/resumesList';
import CustomButton from '../../common/buttons/CustomButton';
import DeleteResumeConfirmationModal from './DeleteResumeConfirmationModal';
import DownloadResume from './DownloadResume';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import axios from '../../../api/baseAxios';
import ENUM from '../../../service/enum';
import Spinner from '../../common/spinner/Spinner';
type T = any;

interface compProps {
  searchKeyword: string;
  data: DataType[];
  resumeListData: any;
  setReset: any;
}
const ResumeListTable = ({
  searchKeyword,
  data,
  resumeListData,
  setReset,
}: compProps) => {
  const token = localStorage.getItem('authToken') || '';
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [renderedData, setRenderedData] = useState<any>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [resumeID, setResumeID] = useState<string | null>(null);
  const [response, errorMsg, requestLoading, axiosRequestFucntion] =
    useAxiosFucntion();

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

  const handleConfirmDelete = (id?: string) => {
    setConfirmDelete(!confirmDelete);
    if (id) {
      setResumeID(id);
    }
  };

  const handleSelectAll = () => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.length === 0 && resumeListData?.resumes
        ? resumeListData.resumes.map((resume: any) => resume.id)
        : []
    );
  };

  const numRows = resumeListData?.resumes ? resumeListData?.count : 0;

  useEffect(() => {
    if (searchKeyword !== '') {
      if (resumeListData?.resumes > 0) {
        const result: any = resumeListData?.resumes.filter((item: any) =>
          item?.resumeName
            .toLocaleLowerCase()
            .includes(searchKeyword.toLocaleLowerCase())
        );
        setRenderedData(result);
      }
    } else {
      setRenderedData(resumeListData?.resumes);
    }
  }, [searchKeyword]);

  function getFileExtension(fileName: string): string | null {
    const extensionRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const match = fileName.match(extensionRegex);
    if (match) {
      return match[1].toLowerCase();
    }
    return null;
  }

  const handleMultipleResumeDelete = () => {
    axiosRequestFucntion({
      axiosInstance: axios,
      method: 'DELETE',
      url: ENUM.DELETE_MANY_RESUMES,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          resumeIds: selectedRows,
        },
      },
    });
  };

  useEffect(() => {
    if (response) {
      setReset(true);
    }
  }, [response, requestLoading]);

  console.log('renderedData', renderedData);

  return (
    <>
      <div className="mt-5">
        {selectedRows.length > 1 ? (
          <CustomButton
            handleClick={handleMultipleResumeDelete}
            type="button"
            text="Delete"
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
            className="flex items-center justify-center gap-[5px] text-sm font-medium text-[#fff] py-[8px] px-[12px] bg-[#EB5757] rounded-[5px] mb-5 mt-5"
          />
        ) : null}

        {requestLoading ? (
          <Spinner />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right rounded ">
            <thead className="text-xs text-[#414343] uppercase bg-[#A8A8AB14] border border-[#E5E6EC] leading-5 font-medium">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 border border border-[#E5E6EC]"
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
                <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                  S/N{' '}
                </th>{' '}
                <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                  Resume Name{' '}
                </th>{' '}
                <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                  Action
                </th>{' '}
                <th scope="col" className="px-3 py-2 border border-[#E5E6EC]">
                  Resume Score
                </th>{' '}
              </tr>
            </thead>
            <tbody>
              {renderedData.length
                ? renderedData?.map((item: T, i: any) => (
                    <tr className="bg-white border border-[#E5E6EC] hover:bg-gray-50 w-auto">
                      <td className="w-4 px-3 py-2 border border-[#E5E6EC]">
                        <div className="flex items-center">
                          <input
                            id={`checkbox-table-search-1`}
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border border-[#E5E6EC] rounded focus:ring-blue-500"
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
                      <td className="px-3 py-2 border border-[#E5E6EC] text-[#131D26] text-xs w-4">
                        {i + 1}
                      </td>
                      <td className="px-3 pt-4 pb-2  text-[#131D26] text-sm font-semibold flex items-center gap-[4px]">
                        <FileToRender
                          fileType={getFileExtension(item?.file?.name)}
                        />
                        {item?.file?.name}{' '}
                        <svg
                          width="5"
                          height="5"
                          viewBox="0 0 5 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.375 4.39773C2.03125 4.39773 1.71733 4.31392 1.43324 4.14631C1.14915 3.97585 0.921875 3.74858 0.75142 3.46449C0.583807 3.1804 0.5 2.86648 0.5 2.52273C0.5 2.17614 0.583807 1.86222 0.75142 1.58097C0.921875 1.29687 1.14915 1.07102 1.43324 0.903409C1.71733 0.732954 2.03125 0.647727 2.375 0.647727C2.72159 0.647727 3.03551 0.732954 3.31676 0.903409C3.60085 1.07102 3.8267 1.29687 3.99432 1.58097C4.16477 1.86222 4.25 2.17614 4.25 2.52273C4.25 2.86648 4.16477 3.1804 3.99432 3.46449C3.8267 3.74858 3.60085 3.97585 3.31676 4.14631C3.03551 4.31392 2.72159 4.39773 2.375 4.39773Z"
                            fill="#414343"
                          />
                        </svg>{' '}
                        <span className="text-xs font-normal text-[#414343]">
                          {(item?.file?.size / (1024 * 1024)).toFixed(2)}MB
                        </span>
                      </td>
                      <td className="px-3 py-2 border border-[#E5E6EC] space-x-2 lg:w-[250px]">
                        <DownloadResume
                          path={item?.file?.location}
                          fileName={item?.file?.name}
                        />
                        <button
                          type="button"
                          onClick={() => handleConfirmDelete(item?.id)}
                          className="inline-flex items-center justify-center gap-[4px] rounded p-2 text-xs font-normal leading-4 w-auto bg-[#EB5757] text-[#fff]"
                        >
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
                          Delete
                        </button>
                      </td>
                      <td className="px-3 py-2 border border-[#E5E6EC] lg:w-[150px]">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-[4px] rounded p-2 text-xs font-normal leading-4 w-auto bg-[#0077B5] text-[#fff]"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.0001 9C13.0014 9.20386 12.9394 9.40311 12.8228 9.57033C12.7062 9.73754 12.5406 9.86451 12.3488 9.93375L9.12072 11.1213L7.93322 14.3469C7.8629 14.5379 7.73567 14.7028 7.5687 14.8193C7.40173 14.9357 7.20305 14.9982 6.99947 14.9982C6.7959 14.9982 6.59722 14.9357 6.43025 14.8193C6.26328 14.7028 6.13605 14.5379 6.06572 14.3469L4.8751 11.125L1.64885 9.9375C1.45781 9.86718 1.29293 9.73995 1.17647 9.57298C1.06 9.406 0.997559 9.20733 0.997559 9.00375C0.997559 8.80017 1.06 8.6015 1.17647 8.43452C1.29293 8.26755 1.45781 8.14032 1.64885 8.07L4.87697 6.8825L6.06447 3.65687C6.1348 3.46583 6.26203 3.30095 6.429 3.18449C6.59597 3.06803 6.79465 3.00558 6.99822 3.00558C7.2018 3.00558 7.40048 3.06803 7.56745 3.18449C7.73442 3.30095 7.86165 3.46583 7.93197 3.65687L9.11947 6.885L12.3451 8.0725C12.5365 8.14077 12.7022 8.26651 12.8195 8.43253C12.9367 8.59856 12.9998 8.79675 13.0001 9ZM9.5001 3H10.5001V4C10.5001 4.13261 10.5528 4.25979 10.6465 4.35355C10.7403 4.44732 10.8675 4.5 11.0001 4.5C11.1327 4.5 11.2599 4.44732 11.3537 4.35355C11.4474 4.25979 11.5001 4.13261 11.5001 4V3H12.5001C12.6327 3 12.7599 2.94732 12.8537 2.85355C12.9474 2.75979 13.0001 2.63261 13.0001 2.5C13.0001 2.36739 12.9474 2.24021 12.8537 2.14645C12.7599 2.05268 12.6327 2 12.5001 2H11.5001V1C11.5001 0.867392 11.4474 0.740215 11.3537 0.646447C11.2599 0.552678 11.1327 0.5 11.0001 0.5C10.8675 0.5 10.7403 0.552678 10.6465 0.646447C10.5528 0.740215 10.5001 0.867392 10.5001 1V2H9.5001C9.36749 2 9.24031 2.05268 9.14655 2.14645C9.05278 2.24021 9.0001 2.36739 9.0001 2.5C9.0001 2.63261 9.05278 2.75979 9.14655 2.85355C9.24031 2.94732 9.36749 3 9.5001 3ZM15.0001 5H14.5001V4.5C14.5001 4.36739 14.4474 4.24021 14.3537 4.14645C14.2599 4.05268 14.1327 4 14.0001 4C13.8675 4 13.7403 4.05268 13.6465 4.14645C13.5528 4.24021 13.5001 4.36739 13.5001 4.5V5H13.0001C12.8675 5 12.7403 5.05268 12.6465 5.14645C12.5528 5.24021 12.5001 5.36739 12.5001 5.5C12.5001 5.63261 12.5528 5.75979 12.6465 5.85355C12.7403 5.94732 12.8675 6 13.0001 6H13.5001V6.5C13.5001 6.63261 13.5528 6.75979 13.6465 6.85355C13.7403 6.94732 13.8675 7 14.0001 7C14.1327 7 14.2599 6.94732 14.3537 6.85355C14.4474 6.75979 14.5001 6.63261 14.5001 6.5V6H15.0001C15.1327 6 15.2599 5.94732 15.3537 5.85355C15.4474 5.75979 15.5001 5.63261 15.5001 5.5C15.5001 5.36739 15.4474 5.24021 15.3537 5.14645C15.2599 5.05268 15.1327 5 15.0001 5Z"
                              fill="#F8F9FF"
                            />
                          </svg>
                          Score Resume
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        )}

        <div className="w-full flex items-center justify-start my-2">
          {resumeListData.count === 5 ? (
            <span className="text-xs text-[#EB5757] font-medium leading-4">
              Resume Limit of 5 reached
            </span>
          ) : null}
        </div>
      </div>
      {confirmDelete ? (
        <DeleteResumeConfirmationModal
          toggleModal={handleConfirmDelete}
          resumeID={resumeID}
          setReset={setReset}
        />
      ) : null}
    </>
  );
};

export default ResumeListTable;
