import React, { useEffect } from 'react';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import { GreenSuccessCheck } from '../components/common/Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileFooter from '../components/modules/profileModules/ProfileFooter';

const Cardinfopdate = () => {
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
              <GreenSuccessCheck />
              <p className="text-[20px] text-[#131D26] font-semibold">
                You have successfully updated your payment information
              </p>
              {/* <div className="py-[8px] px-[12px] bg-[#EB57571F] rounded">
              <p className="text-base text-[#EB5757] font-semibold">
                Your Screen will automatically refresh in a few seconds. Thank
                you for your subscription
              </p>
            </div> */}
              <span className="text-xs text-[#131D26] font-medium italic">
                “Click the button below to continue”
              </span>
              <button
                type="button"
                onClick={handlePurchaseAPlan}
                className="bg-[#131D26] py-[8px] px-[12px] rounded text-xs text-[#F6D155] font-semibold"
              >
                Go to Subscription
              </button>
            </div>
          </div>
          <ProfileFooter />
        </div>
      </Layoutwrapper>
    </>
  );
};

export default Cardinfopdate;
