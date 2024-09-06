import React from 'react';

interface compProps {
  toggleDeleteModal: () => void;
}

const CancelSubscriptionComp = ({ toggleDeleteModal }: compProps) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col">
        <h3 className="text-[14px] text-[#131D26] font-semibold">
          Cancel Subscription
        </h3>
        <p className="text-[12px] text-[#EB5757] font-medium">
          NOTE: Once your subscription is Cancelled, you will default back to
          the free tier
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={toggleDeleteModal}
          className="flex items-center text-[12px] text-[#F8F9FF] font-medium bg-[#EB5757] rounded-[4px] py-[8px] px-[12px]"
        >
          Cancel Subscription
        </button>
      </div>
    </div>
  );
};

export default CancelSubscriptionComp;
