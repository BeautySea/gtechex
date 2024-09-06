import { useLocation } from 'react-router';
import OldLayoutWrapper from '../components/layouts/OldLayoutWrapper';
import ApplicationForm from '../components/modules/applyModules/ApplicationForm';
import { useEffect, useState } from 'react';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import ComponentPageTitle from '../components/common/ComponentPageTitle';
import BorderWrapper from '../components/common/BorderWrapper';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import WarningComp from '../components/modules/applyModules/WarningComp';
import OverviewApplicationForm from '../components/modules/overviewmodules/OverviewApplicationForm';

const ApplyForJobs = () => {
  const [applyTypeState, setApplyTyoeState] = useState('');
  const location = useLocation();
  const applyType = location.state && location.state.data;

  console.log('applyType', applyType);

  useEffect(() => {
    switch (applyType) {
      case 'linkedin':
        setApplyTyoeState('LinkedIn');
        break;
      case 'dice':
        setApplyTyoeState('Dice');
        break;
      case 'indeed':
        setApplyTyoeState('Indeed');
        break;
    }
  }, [applyType]);

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5">
          {/* top bar */}
          <div className="flex items-center justify-start gap-[13px] mb-[37px] border-b border-[#C5C5C5] h-[70px] bg-[#FFFFFF]">
            <InnerLayoutWrapper>
              <ComponentPageTitle
                title={`${applyTypeState} Apply`}
                // subTitle="Fill in the information below to find jobs that fit your requirements"
                needRoute={true}
                routeTo="jobs-applied"
              />
            </InnerLayoutWrapper>
          </div>
          {/* form container */}
          <InnerLayoutWrapper>
            {/* <WarningComp /> */}
            {/* <BorderWrapper> */}
            <div className="w-full h-auto flex items-end justify-center">
              <BorderWrapper>
                {/* <OverviewApplicationForm /> */}
                <ApplicationForm applyTypeState={applyTypeState} />
              </BorderWrapper>
            </div>
            {/* </BorderWrapper> */}
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
    </>
  );
};

export default ApplyForJobs;
