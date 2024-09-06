import React from 'react';

interface compProps {
  toggleDeleteModal: () => void;
}

const DeleteAccountComp = ({ toggleDeleteModal }: compProps) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col">
        <h3 className="text-[14px] text-[#131D26] font-semibold">
          Delete Account
        </h3>
        <p className="text-[12px] text-[#EB5757] font-medium">
          NOTE: Once your account is Deleted, you can no longer have access to
          it again
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={toggleDeleteModal}
          className="flex items-center text-[12px] text-[#F8F9FF] font-medium bg-[#EB5757] rounded-[4px] py-[8px] px-[12px]"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountComp;
