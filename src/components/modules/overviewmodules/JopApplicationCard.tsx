import React, { useEffect, useState } from 'react';
import { myAxiosWithAuthFetchWithPayload } from '../../../api/normalRequest';
import ENUM from '../../../service/enum';
import { Skeleton } from 'antd';

interface jobApplicationData {
  all: number;
  this_week: number;
  today: number;
}

const JopApplicationCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('authToken') || '';
  const [jobData, setJobData] = useState<jobApplicationData>({
    all: 0,
    this_week: 0,
    today: 0,
  });

  const handleFetchData = async () => {
    setIsLoading(true);
    try {
      const method = 'GET';
      const route = ENUM.GET_APPLICATION_COUNT;
      const resp = await myAxiosWithAuthFetchWithPayload({
        method,
        route,
        token,
      });
      //   console.log('response', resp);
      if (resp?.status === true) {
        setIsLoading(false);
        if (resp?.data) {
          setJobData((prevJobData) => ({
            ...prevJobData,
            all: resp?.data?.all ?? 0,
            this_week: resp?.data?.this_week ?? 0,
            today: resp?.data?.today ?? 0,
          }));
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      throw new Error();
    }
  };

  useEffect(() => {
    if (token) {
      handleFetchData();
    }
  }, [token]);
  // md:w-[364px] 2xl:w-[364px]
  return (
    <>
      <div
        className="flex flex-col h-auto lg:max-h-[124px] gap-[10px] w-full max-w-full p-[20px] rounded-[8px] shadow-md bg-[#F6D155]"
        style={{
          // boxShadow: '0px 29px 16.6px -12px rgba(0, 119, 181, 0.25)',
          boxShadow: '0px 29px 16.6px -12px #96760040',
        }}
      >
        <div className="flex justify-between text-[#131D26] text-xl font-semibold">
          <h3>Total jobs applied</h3>
          {isLoading === true ? (
            <Skeleton.Input active />
          ) : (
            <p>{jobData?.all}</p>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-[4px] text-[#131D26] text-sm mb-1">
            {isLoading === true ? (
              <Skeleton.Input active />
            ) : (
              <>
                <h5 className="font-semibold">{jobData?.this_week} </h5>
                <span className="font-normal"> applications this week</span>
              </>
            )}
          </div>
          {isLoading === true ? (
            <Skeleton.Input active />
          ) : (
            <div className="flex flex-col gap-[6px]">
              {/* <ProgressBarComp width="45%" bg="#131d2633" progBG="#C9AD4C" /> */}
              {/* <ProgressBarComp width="45%" bg="#131D26" progBG="#C9AD4C" /> */}
              <div className={`w-full bg-[#C9AD4C] rounded-full h-1.5`}>
                <div
                  className={`bg-[#131D26] h-1.5 rounded-full `}
                  style={{ width: '45%' }}
                ></div>
              </div>
              <span className="text-[#131D26] text-[10px] font-normal">
                {jobData?.today} applications today
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default JopApplicationCard;
