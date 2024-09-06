import React, { useEffect } from 'react';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import {
  FailureBigIcon,
  GoldenBackArrowIcon,
} from '../components/common/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileFooter from '../components/modules/profileModules/ProfileFooter';

const Paymentfailure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const url = location.pathname;

  console.log('url', url);

  function delayedNavigationToOverview() {
    const timeoutId = setTimeout(
      () => navigate('/account?tab=Manage Subscription'),
      5000
    );

    return () => clearTimeout(timeoutId); // Cleanup function to clear timeout on unmount
  }

  useEffect(() => {
    delayedNavigationToOverview();
  }, [url]);

  const handlePurchaseAPlan = () => {
    navigate('/account?tab=Manage Subscription');
  };
  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full justify-between h-screen">
          <div className="w-full min-h-[550px] flex items-center justify-center">
            <div className="max-w-[364px] h-auto p-[20px] bg-[#fff] flex flex-col justify-center items-center text-center gap-[16px]">
              <FailureBigIcon />
              <p className="text-[20px] text-[#131D26] font-semibold">
                Your Payment is unsuccessful and process has been terminated
              </p>
              <div className="py-[8px] px-[12px] bg-[#EB57571F] rounded">
                <p className="text-base text-[#EB5757] font-semibold">
                  Reason: You cancelled the payment process
                </p>
              </div>
              {/* <span className="text-xs text-[#131D26] font-medium italic">
              “You can also click the button below to continue”
            </span> */}
              <button
                type="button"
                onClick={handlePurchaseAPlan}
                className="bg-[#131D26] py-[8px] px-[12px] rounded text-xs text-[#F6D155] font-semibold flex items-center justify-center gap-[4px]"
              >
                <GoldenBackArrowIcon /> Back to Subscription
              </button>
            </div>
          </div>
          <ProfileFooter />
        </div>
      </Layoutwrapper>
    </>
  );
};

export default Paymentfailure;
