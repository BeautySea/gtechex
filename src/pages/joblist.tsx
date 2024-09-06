import { useEffect, useState } from 'react';
import axios from '../api/baseAxios';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import { Link } from 'react-router-dom';
import JobListingTab from '../components/modules/joblistingModules/JobListingTab';
import JobListingTable from '../components/modules/joblistingModules/JobListingTable';
import JobListingEmptyState from '../components/modules/joblistingModules/JobListingEmptyState';
import OldLayoutWrapper from '../components/layouts/OldLayoutWrapper';
import useAxios from '../api/hooks/useAxios';
import ENUM from '../service/enum';
import EmptyResumeComp from '../components/modules/resumeModules/EmptyResumeComp';
import Spinner from '../components/common/spinner/Spinner';
import TableEmptyState from '../components/common/TableEmptyState';
import SearchComponent from '../components/layouts/topNav/SearchComponent';
import PageSubTitle from '../components/layouts/PageSubTitle';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';

const Joblist = () => {
  const token = localStorage.getItem('authToken') || '';
  const [activeTab, setActiveTab] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [linkedInApp, setLinkedInApp] = useState<any>([]);
  const [indeedApp, setIndeedApp] = useState<any>([]);
  const [diceApp, setDiceApp] = useState<any>([]);
  const [jobApplications, errorMsg, requestLoading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.LIST_JOB_APPLICATIONS,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  console.log('jobApplications', jobApplications);

  useEffect(() => {
    if (jobApplications?.data?.records) {
      const result = jobApplications?.data?.records.filter(
        (item: any) => item?.platform.toLowerCase() === 'linkedin'
      );
      if (result) {
        setLinkedInApp(result);
      }
    }
  }, [jobApplications]);
  // setIndeedApp
  useEffect(() => {
    if (jobApplications?.data?.records) {
      const result = jobApplications?.data?.records.filter(
        (item: any) => item?.platform.toLowerCase() === 'indeed'
      );
      if (result) {
        setIndeedApp(result);
      }
    }
  }, [jobApplications]);
  // setDiceApp

  useEffect(() => {
    if (jobApplications?.data?.records) {
      const result = jobApplications?.data?.records.filter(
        (item: any) => item?.platform.toLowerCase() === 'dice'
      );
      if (result) {
        setDiceApp(result);
      }
    }
  }, [jobApplications]);

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto">
          <PageSubTitle
            title="Jobs Applied"
            subTitle="Here, you will find all the jobs you applied for"
            needRoute={false}
          />
          <InnerLayoutWrapper>
            <div className="flex flex-col gap-[12px] mb-2">
              <h3 className="text-base text-[#131D26] font-semibold">
                Your Job Application
              </h3>
              <div className="flex items-center justify-left w-1/2 md:w-[400px]">
                <SearchComponent
                  placeHolder="Search job applications"
                  // handleInputChange={handleSearch}
                  // searchSTate={searchKeyword}
                />
              </div>
            </div>
            {/* top navigation bar */}
            <div className="flex justify-between h-[40px] border border-[#E5E6EC] bg-[#FFFFFF] rounded">
              {/* nav bar */}
              <div className="flex items-end">
                <JobListingTab
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  count={jobApplications}
                  linkedInCount={linkedInApp.length}
                  indeedCount={indeedApp.length}
                  diceCount={diceApp.length}
                />
              </div>
            </div>
            {/* table */}

            <div className="w-full mt-[20px] mb-5">
              {activeTab === 'All' &&
                (jobApplications?.data?.records?.length ? (
                  <JobListingTable
                    data={jobApplications?.data?.records}
                    loading={requestLoading}
                    searchKeyword={searchKeyword}
                  />
                ) : (
                  <EmptyResumeComp message="You have not applied to any jobs yet" />
                ))}
              {activeTab === 'linkedIn' &&
                (linkedInApp.length ? (
                  <JobListingTable
                    data={linkedInApp}
                    loading={requestLoading}
                    searchKeyword={searchKeyword}
                  />
                ) : (
                  <JobListingEmptyState type="linkedIn" />
                ))}
              {/* indeedApp */}

              {activeTab === 'indeed' &&
                (indeedApp.length ? (
                  <JobListingTable
                    data={indeedApp}
                    loading={requestLoading}
                    searchKeyword={searchKeyword}
                  />
                ) : (
                  <JobListingEmptyState type="indeed" />
                ))}

              {activeTab === 'dice' &&
                (diceApp.length ? (
                  <JobListingTable
                    data={diceApp}
                    loading={requestLoading}
                    searchKeyword={searchKeyword}
                  />
                ) : (
                  <JobListingEmptyState type="dice" />
                ))}
            </div>
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
    </>
  );
};

export default Joblist;
