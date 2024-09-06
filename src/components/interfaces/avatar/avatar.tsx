import { useCallback, useEffect, useState } from 'react';
import LoaderIcon from '../icons/loader';
import styles from './avatar.module.css';
import getClassName from '../../../utils/getClassName';
import avatarImg from '../../../assets/avatar.png';

function testImageUrl(url = ''): Promise<string> {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => resolve(url));
    image.addEventListener('error', reject);
  });
}

interface AvatarProps {
  className?: string;
  url?: string;
  userDetails: any;
  requestLoading?: any;
}

const Avatar = ({
  className,
  url,
  userDetails,
  requestLoading,
}: AvatarProps) => {
  const [actualUrl, setActualUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initials, setInitials] = useState('');

  const fetchInitials = (firstName: string, lastName: string) => {
    const userInit =
      firstName.charAt(0).toLocaleUpperCase() +
      lastName.charAt(0).toLocaleUpperCase();

    setInitials(userInit);
  };
  useEffect(() => {
    if (userDetails) {
      fetchInitials(userDetails?.data?.firstName, userDetails?.data?.lastName);
    }
  }, [userDetails, requestLoading]);

  const handleImage = useCallback(async () => {
    try {
      setLoading(true);
      // const _actualUrl = await testImageUrl(url);
      setActualUrl(userDetails?.data?.picture);
    } catch (error) {
      setActualUrl(null);
    }
    setLoading(false);
  }, [userDetails]);

  useEffect(() => {
    handleImage();
  }, [handleImage]);

  return loading ? (
    <div className={styles.avatar + getClassName(className)}>
      <LoaderIcon />
    </div>
  ) : actualUrl === null ? (
    // <img src={avatarImg} alt="avatar" />
    <div className="flex items-center justify-center bg-[#131D26] px-[5px] py-[4.5px] rounded-[40px] text-sm text-[#fff] font-bold">
      {initials}
    </div>
  ) : actualUrl === 'picture' ? (
    <div className="flex items-center justify-center bg-[#131D26] px-[5px] py-[4.5px] rounded-[40px] text-sm text-[#fff] font-bold">
      {initials}
    </div>
  ) : (
    <div className={styles.avatar + getClassName(className)}>
      <img src={actualUrl} alt="" className="w-full h-full " />
    </div>
  );
};

export default Avatar;
