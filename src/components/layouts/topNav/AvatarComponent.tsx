import React from 'react';
import Avatar from '../../interfaces/avatar/avatar';
import { UserDetails } from './topNav';
import { Link } from 'react-router-dom';

interface compProps {
  userDetails: any;
  requestLoading?: any;
}

const AvatarComponent = ({ userDetails, requestLoading }: compProps) => {
  return (
    <div className="flex items-center gap-[8px] h-full pl-2 pr-10">
      <Link to="/account" className="cursor-pointer">
        <Avatar
          url=""
          userDetails={userDetails}
          requestLoading={requestLoading}
        />
      </Link>
      <div className="flex flex-col justify-center  h-full">
        <div className="text-[#131D26] text-sm font-semibold">
          {userDetails?.data?.username}
        </div>
        <div className="text-[#8D8E91] text-xs font-medium">
          {userDetails?.data?.email}
        </div>
      </div>
    </div>
  );
};

export default AvatarComponent;
