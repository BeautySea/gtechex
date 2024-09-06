import React from 'react';
import {
  DicePlatform,
  IndeedIconPlatform,
  LinkedInIconPlatform,
} from '../../common/Icons';

interface compProps {
  platform: string;
}
const PlatformComp = ({ platform }: compProps) => {
  const lowerCasePlatform = platform.toLocaleLowerCase();
  return (
    <div>
      {lowerCasePlatform === 'linkedin' ? (
        <LinkedInIconPlatform />
      ) : lowerCasePlatform === 'dice' ? (
        <DicePlatform />
      ) : lowerCasePlatform === 'indeed' ? (
        <IndeedIconPlatform />
      ) : null}
    </div>
  );
};

export default PlatformComp;
