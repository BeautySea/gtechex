import { useLocation } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import Layoutwrapper from '../../layouts/layoutwrapper';
import InnerLayoutWrapper from '../../layouts/InnerLayoutWrapper';
// import ComponentPageTitle from '../../common/ComponentPageTitle';
import WarningComp from '../../modules/applyModules/WarningComp';
import BorderWrapper from '../../common/BorderWrapper';
import OverviewApplicationForm from '../../modules/overviewmodules/OverviewApplicationForm';
import PageSubTitle from '../../layouts/PageSubTitle';
import useAxios from '../../../api/hooks/useAxios';
import axios from '../../../api/baseAxios';
import ENUM from '../../../service/enum';
import NoPlanModal from '../../common/modal/NoPlanModal';
import useAuthContext from '../../../hooks/context/useAuthContext';

const OverviewApply = () => {
  const [applyTypeState, setApplyTypeState] = useState<any>(null);
  // const { currentPlatform } = useAuthContext();
  const location = useLocation();
  const [toggleNoPlan, setToggleNoPlan] = useState(false);
  const applyType = location.state && location.state.data;
  // const initialPlatform = location.state && location.state.platform;

  const token = localStorage.getItem('authToken') || '';
  // const currentPlatform = localStorage.getItem('currentPlatform') || '';
  const [userSubPlan, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_USER_SUBSCRIPTION_PLAN,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  // const fileToUpload = location.state && location.state.fileData;

  useEffect(() => {
    const retrieveObject = () => {
      const storedValue = localStorage.getItem('currentPlatform');
      if (storedValue) {
        console.log('JSON.parse(storedValue)', JSON.parse(storedValue));

        const parsedData = JSON.parse(storedValue);
        switch (parsedData) {
          case 'linkedin':
            setApplyTypeState('LinkedIn');
            break;
          case 'dice':
            setApplyTypeState('Dice');
            break;
          case 'indeed':
            setApplyTypeState('Indeed');
            break;
        }
      }
      return null; // Return null if no value found
    };
    retrieveObject();
  }, []);

  // useEffect(() => {

  // }, [applyType]);

  const handleTogleNoPlan = () => {
    setToggleNoPlan(!toggleNoPlan);
  };

  console.log('currentPlatform', applyTypeState);

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5">
          {/* top bar */}
          <PageSubTitle
            title={`${applyTypeState} Apply`}
            subTitle="Fill in the information below to find jobs that fit your requirements"
            needRoute={true}
            routeTo="overview"
          />
          {/* form container */}
          <InnerLayoutWrapper>
            <WarningComp applyTypeState={applyTypeState} />
            <div className="w-full h-auto flex items-center justify-center">
              <BorderWrapper bg="#fff">
                <BorderWrapper>
                  <OverviewApplicationForm
                    type={applyTypeState}
                    userId={userSubPlan?.data?.metadata?.userId}
                    userSubPlan={userSubPlan}
                    handleManageSub={handleTogleNoPlan}
                  />
                </BorderWrapper>
              </BorderWrapper>
            </div>
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
      {toggleNoPlan ? <NoPlanModal toggleModal={handleTogleNoPlan} /> : null}
    </>
  );
};

export default OverviewApply;
