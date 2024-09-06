import React from 'react';
import InnerLayoutWrapper from '../../layouts/InnerLayoutWrapper';
import CurrentPlan from './CurrentPlan';
import PaymentMethod from './PaymentMethod';
import OtherPlansComp from './OtherPlansComp';
import BorderWrapper from '../../common/BorderWrapper';
import CancelSubscriptionComp from './CancelSubscriptionComp';
import CurrentUsage from './CurrentUsage';
import useAxios from '../../../api/hooks/useAxios';
import ENUM from '../../../service/enum';
import axios from '../../../api/baseAxios';

interface compProps {
  toggleEditPaymentMethod: () => void;
  toggleChangePaymentModal: () => void;
  toggleCancelSubModal: () => void;
  token: string;
}

const ManageSubscription = ({
  toggleEditPaymentMethod,
  toggleChangePaymentModal,
  toggleCancelSubModal,
  token,
}: compProps) => {
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

  console.log('userSubPlan', userSubPlan);

  return (
    <InnerLayoutWrapper>
      <CurrentPlan userSubPlan={userSubPlan} />

      {userSubPlan === null ? null : userSubPlan !== null &&
        userSubPlan?.data &&
        userSubPlan?.data?.details?.status === 'canceled' ? null : (
        <PaymentMethod
          toggleEditPaymentMethod={toggleEditPaymentMethod}
          toggleChangePaymentModal={toggleChangePaymentModal}
          userSubPlan={userSubPlan}
        />
      )}
      <OtherPlansComp userSubPlan={userSubPlan} />

      {userSubPlan !== null ? <CurrentUsage userSubPlan={userSubPlan} /> : null}
      {userSubPlan === null ? null : userSubPlan !== null &&
        userSubPlan?.data &&
        userSubPlan?.data?.details?.status === 'canceled' ? null : (
        <div className="mt-2">
          <BorderWrapper bg="#fff">
            <CancelSubscriptionComp toggleDeleteModal={toggleCancelSubModal} />
          </BorderWrapper>
        </div>
      )}
    </InnerLayoutWrapper>
  );
};

export default ManageSubscription;
