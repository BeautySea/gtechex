/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import ApplyListTable from '../../modules/overviewmodules/ApplyListTable';
// import MofiedApplyListTable from '../../modules/overviewmodules/MofiedApplyListTable';
import Layoutwrapper from '../../layouts/layoutwrapper';
import InnerLayoutWrapper from '../../layouts/InnerLayoutWrapper';
import ComponentPageTitle from '../../common/ComponentPageTitle';
import SearchComponent from '../../layouts/topNav/SearchComponent';
import { useLocation } from 'react-router-dom';
import useAxios from '../../../api/hooks/useAxios';
import ENUM from '../../../service/enum';
import googleBaseAxios from '../../../api/googleBaseAxios';
import useAuthContext from '../../../hooks/context/useAuthContext';

interface googleJobSearchResult {}

const Jobsfound = () => {
  const token = localStorage.getItem('authToken') || '';
  const { setCurrentPlatform } = useAuthContext();
  const [searchKeyword, setSetsearchKeyword] = useState('');
  const [linkedInEasyApplyJos, setLinkedInEasyApplyJos] = useState<any>();
  const [totalJobsToRender, setTotalJobsToRender] = useState<any>([]);
  // const [googleApiResponse, setGoogleApiResponse] = useState<any>(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [locate, setLocation] = useState('');
  const location = useLocation();
  const scrapedJobs = location.state && location.state.data;
  const platform = location.state && location.state.platform;
  const noOfJobsScrappedFor = location.state && location.state.numOfJobs;
  const jobTitle = location.state && location.state.jobTitle;
  const seletecResumeId = location.state && location.state.seletecResumeId;
  const userID = location.state && location.state.userID;
  const userJobLocation = location.state && location.state.userLocation;
  const isRemote = location.state && location.state.isRemote;
  const googleApiResponse = location.state && location.state.googleApiResponse;

  console.log('scrapedJobs', scrapedJobs);

  // LinkedIn

  // useEffect(() => {
  //   setCurrentPlatform(platform);
  // }, [platform, setCurrentPlatform]);

  const handleSearch = (e: any) => {
    setSetsearchKeyword(e.target.value);
  };
  //
  // console.log('noOfJobsScrappedFor', noOfJobsScrappedFor);
  // console.log('jobTitle', jobTitle);

  function getFirstNElements<T>(arr: T[], n: number): T[] {
    return arr.slice(0, n);
  }

  useEffect(() => {
    if (platform.current === 'LinkedIn') {
      const result = scrapedJobs.filter(
        (item: any) => item?.isEasyApply === true
      );

      // console.log('result', result);

      let fewElements: any = [];
      if (noOfJobsScrappedFor > 15) {
        fewElements = getFirstNElements(result, 5);
      } else {
        fewElements = getFirstNElements(result, 3);
      }

      // setLinkedInEasyApplyJos(fewElements);
      if (fewElements) {
        setTotalJobsToRender((prevJobs: any) => [...prevJobs, ...fewElements]);
      }
    }
    if (platform.current === 'Indeed') {
      let fewElements: any = [];
      if (noOfJobsScrappedFor > 15 && scrapedJobs.length > 0) {
        fewElements = getFirstNElements(scrapedJobs, 5);
      } else {
        fewElements = getFirstNElements(scrapedJobs, 3);
      }

      // setLinkedInEasyApplyJos(fewElements);
      if (fewElements) {
        setTotalJobsToRender((prevJobs: any) => [...prevJobs, ...fewElements]);
      }
    }
  }, [scrapedJobs]);

  // https://quick-apply-dev-cf0a1835b9f4.herokuapp.com/api/v1/users/google-search/user?order=DESC&limit=100&role=Frontend Developer&location=usa&isRemote=true'
  // ENUM.GET_GOOGLE_SEARCH_RESULT_AUTH

  // const [googleApiResponse, errorMsg, requestLoading, refreshFucntion] =
  //   useAxios({
  //     axiosInstance: googleBaseAxios,
  //     method: 'GET',
  //     url: `${url}`,
  //     requestConfig: {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   });
  // console.log('googleApiResponse', googleApiResponse);

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow' as RequestRedirect,
  };
  // locate, setLocation

  // useEffect(() => {
  //   if (jobTitle && userJobLocation && isRemote !== undefined) {
  //     const location =
  //       userJobLocation.toLowerCase() === 'united states'
  //         ? 'usa'
  //         : userJobLocation.toLowerCase() === 'united kingdom'
  //         ? 'uk'
  //         : 'ca';
  //     const queryParams = new URLSearchParams({
  //       order: 'DESC',
  //       limit: '100',
  //       role: jobTitle.toLowerCase(),
  //       location: location,
  //     });

  //     const url = `https://quick-apply-dev-cf0a1835b9f4.herokuapp.com/api/v1/users/google-search/user?${queryParams}`;

  //     fetch(`${url}`, requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result) {
  //           setGoogleApiResponse(result);
  //         }
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }, [jobTitle, userJobLocation, isRemote]);

  // useEffect(() => {
  //   if (googleApiResponse === null) {
  //     setRequestLoading(true);
  //   } else {
  //     setRequestLoading(false);
  //   }
  // }, [googleApiResponse]);

  function filterByKeywords(response: any, keywordString: string) {
    const keywords = keywordString.toLowerCase().split(' ');
    return response.filter((item: any) => {
      return keywords.some((keyword) => {
        return Object.values(item).some((value) => {
          if (Array.isArray(value)) {
            return value.some((arrayItem) =>
              arrayItem.toString().toLowerCase().includes(keyword)
            );
          } else if (typeof value === 'string') {
            return value.toLowerCase().includes(keyword);
          }
          return false;
        });
      });
    });
  }

  useEffect(() => {
    if (googleApiResponse !== null) {
      const newApiResponse = googleApiResponse as any;
      console.log('googleApiResponse', googleApiResponse);

      const greenhouseJobs = filterByKeywords(
        newApiResponse?.greenhouse?.jobs,
        jobTitle.toLowerCase()
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment

      // const workdayJobs = newApiResponse?.workday?.jobs.filter((item: any) =>
      //   item.title.toLowerCase().includes(jobTitle.toLowerCase())
      // );

      const workdayJobs = filterByKeywords(
        newApiResponse?.workday?.jobs,
        jobTitle.toLowerCase()
      );

      let fewGreenhouseJobs: any = [];
      let fewWorkdayJobs: any = [];

      if (noOfJobsScrappedFor > 15) {
        if (scrapedJobs.length > 0) {
          fewGreenhouseJobs = getFirstNElements(
            greenhouseJobs,
            Math.round(noOfJobsScrappedFor - 5) / 2 + 1
          );
          fewWorkdayJobs = getFirstNElements(
            workdayJobs,
            Math.round(noOfJobsScrappedFor - 5) / 2
          );
        } else {
          fewGreenhouseJobs = greenhouseJobs.slice(0, 10);
          fewWorkdayJobs = workdayJobs.slice(0, 10);
        }
      } else {
        fewGreenhouseJobs = getFirstNElements(
          greenhouseJobs,
          Math.round(noOfJobsScrappedFor - 3) / 2 + 1
        );
        fewWorkdayJobs = getFirstNElements(
          workdayJobs,
          Math.round(noOfJobsScrappedFor - 3) / 2
        );
      }
      if (fewGreenhouseJobs) {
        setTotalJobsToRender((prevJobs: any) => [
          ...prevJobs,
          ...fewGreenhouseJobs,
        ]);
      }

      if (fewWorkdayJobs) {
        setTotalJobsToRender((prevJobs: any) => [
          ...prevJobs,
          ...fewWorkdayJobs,
        ]);
      }
    }
  }, [googleApiResponse, jobTitle, noOfJobsScrappedFor, scrapedJobs]);

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5">
          {/* top bar */}
          <div className="flex items-center justify-start gap-[13px] mb-[37px] border-b border-[#C5C5C5] h-[70px]">
            <InnerLayoutWrapper>
              <ComponentPageTitle
                title="Jobs Found"
                subTitle="Here is a list of jobs found based on your settings"
                needRoute={true}
                routeTo="apply"
              />
            </InnerLayoutWrapper>
          </div>
          <InnerLayoutWrapper>
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-base text-[#131D26] font-semibold">
                Jobs Found
              </h3>
              <div className="flex items-center justify-left w-1/2 md:w-[400px]">
                <SearchComponent
                  placeHolder="Search jobs"
                  handleInputChange={handleSearch}
                  searchSTate={searchKeyword}
                />
              </div>
            </div>
            {/* totalJobsToRender */}
            <ApplyListTable
              searchKeyword={searchKeyword}
              data={
                platform.current === 'LinkedIn'
                  ? totalJobsToRender
                  : platform.current === 'Indeed'
                  ? totalJobsToRender
                  : scrapedJobs
              }
              platform={platform}
              requestLoading={requestLoading}
              seletecResumeId={seletecResumeId}
              userId={userID}
            />
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
      {/* <MofiedApplyListTable /> */}
    </>
  );
};

export default Jobsfound;
