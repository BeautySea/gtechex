import { useEffect, useState } from 'react';
import axios from '../../../api/baseAxios';
import useAxiosFucntion from '../../../api/hooks/useAxiosFucntion';
import ENUM from '../../../service/enum';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import Spinner from '../../common/spinner/Spinner';
import useAxios from '../../../api/hooks/useAxios';

interface upgradeProps {
  toggleModal: () => void;
}
const CancelSubModal = ({ toggleModal }: upgradeProps) => {
  // const [canselReload, setCancelReload] = useState(0);
  const token = localStorage.getItem('authToken') || '';
  const [userSubPlan, refreshFucntion] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_USER_SUBSCRIPTION_PLAN,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [response, errorMsg, requestLoading, axiosRequestFucntion] =
    useAxiosFucntion();

  function reloadPage() {
    window.location.reload();
  }

  // setCancelReload;
  // const handleReloadPageFunc = () => {
  //   setCancelReload(canselReload + 1);
  // };

  const handleCanselSubscription = () => {
    axiosRequestFucntion({
      axiosInstance: axios,
      method: 'DELETE',
      url: ENUM.CANCEL_USER_SUBSCRIPTION,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };

  useEffect(() => {
    if (response?.status === 200) {
      reloadPage();
      // handleReloadPageFunc();
      toggleModal();
    }
  }, [response]);

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#131d2680] h-screen"
    >
      {requestLoading ? (
        <Spinner />
      ) : (
        <div className="relative p-[20px] w-full max-w-md max-h-full mx-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="p-4 md:p-5 text-center">
              <h2 className="text-2xl text-[#000] font-semibold mb-[22px] w-[304px] mx-auto">
                Are you sure you want to cancel your subscription?
              </h2>
              <h3 className="mb-5 text-base font-normal text-[#EB5757]">
                NOTE: Once your subscription is Cancelled, you will default back
                to the free tier
              </h3>
              <div className="flex items-center gap-[12px]">
                <ButtonRounded
                  type="button"
                  onClick={handleCanselSubscription}
                  className="w-full flex items-center justify-center border-0 rounded-[4px] bg-[#EB5757] py-[10px] text-[12px] text-[#F8F9FF] font-medium my-[8px]"
                  text="Yes"
                />
                <ButtonRounded
                  type="button"
                  className="w-full flex items-center justify-center border-0 rounded-[4px] py-[10px] text-[12px] text-[#131D26] bg-[#A8A8AB33] font-medium my-[8px]"
                  text="No"
                  onClick={toggleModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelSubModal;
