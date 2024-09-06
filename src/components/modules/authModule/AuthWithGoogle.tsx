import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AES, enc } from 'crypto-js';
import { useSearchParams } from 'react-router-dom';
import useAuthContext from '../../../hooks/context/useAuthContext';
import ENUM from '../../../service/enum';
import useAxios from '../../../api/hooks/useAxios';
import baseAxios from '../../../api/baseAxios';
import SkeletonInput from 'antd/es/skeleton/Input';

interface compProps {
  page: string;
  action?: 'register' | 'login';
}

const AuthWithGoogle = ({ page, action }: compProps) => {
  const [clientID, setClientId] = useState('');
  const { login } = useAuthContext();
  const googleRef = useRef<HTMLDivElement>(null);
  const [searchParam] = useSearchParams();
  const from = searchParam.get('from');

  const [awsSecrete, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: baseAxios,
    method: 'GET',
    url: ENUM.GOOGLE_CLIENT_ID,
    // requestConfig: {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // },
  });

  // const decryptSecret = () => {
  //   {
  //     try {
  //       if (awsSecrete) {
  //         const bytes = AES.decrypt(
  //           awsSecrete,
  //           import.meta.env.VITE_ENCRYPTION_SECRET
  //         );
  //         const descrypted = bytes.toString(enc.Utf8);
  //         setClientId(descrypted);
  //       }
  //     } catch (error) {
  //       console.log('description error', error);
  //     }
  //   }
  // };

  // const decryptSecret = () => {

  // };

  useEffect(() => {
    try {
      if (awsSecrete && typeof awsSecrete === 'string') {
        const bytes = AES.decrypt(
          awsSecrete,
          import.meta.env.VITE_ENCRYPTION_SECRET
        );
        const descrypted = bytes.toString(enc.Utf8);
        setClientId(descrypted);
      }
    } catch (error) {
      console.warn('decryption error', error);
    }
  }, [awsSecrete]);

  useEffect(() => {
    if (!window.google || !googleRef.current) return;
    try {
      window.google?.accounts?.id?.initialize({
        client_id: clientID,
        callback: handleGoogleAuth,
      });
      window.google?.accounts?.id?.renderButton(googleRef.current, {
        scope: 'profile email',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
      });
    } catch (error: any) {
      console.log('error', error);
    }
  }, [action, clientID]);

  const handleGoogleAuth = async (response: any) => {
    console.log('handleGoogleAuth response', response);

    try {
      await login('', '', 'google', response?.credential);
    } catch (error: any) {
      return error;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-[20px]">
      <h2 className="text-[#131D26] text-2xl font-bold">{page}</h2>
      {requestLoading ? (
        <SkeletonInput active />
      ) : (
        // bg-[#E5E6EC] py-[12px] px-[8px]
        <div
          ref={googleRef}
          className="g-signin2 w-full flex items-center justify-center gap-[8px]   rounded-[4px] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M18.1713 8.36775H17.5001V8.33317H10.0001V11.6665H14.7096C14.0226 13.6069 12.1763 14.9998 10.0001 14.9998C7.23883 14.9998 5.00008 12.7611 5.00008 9.99984C5.00008 7.23859 7.23883 4.99984 10.0001 4.99984C11.2746 4.99984 12.4342 5.48067 13.3171 6.26609L15.6742 3.909C14.1859 2.52192 12.1951 1.6665 10.0001 1.6665C5.398 1.6665 1.66675 5.39775 1.66675 9.99984C1.66675 14.6019 5.398 18.3332 10.0001 18.3332C14.6021 18.3332 18.3334 14.6019 18.3334 9.99984C18.3334 9.44109 18.2759 8.89567 18.1713 8.36775Z"
              fill="#FFC107"
            />
            <path
              d="M2.62744 6.12109L5.36536 8.129C6.10619 6.29484 7.90036 4.99984 9.99998 4.99984C11.2745 4.99984 12.4341 5.48067 13.317 6.26609L15.6741 3.909C14.1858 2.52192 12.195 1.6665 9.99998 1.6665C6.79911 1.6665 4.02328 3.47359 2.62744 6.12109Z"
              fill="#FF3D00"
            />
            <path
              d="M10 18.3331C12.1525 18.3331 14.1084 17.5094 15.5871 16.1698L13.008 13.9873C12.1432 14.645 11.0865 15.0007 10 14.9998C7.83255 14.9998 5.99213 13.6177 5.2988 11.689L2.5813 13.7827C3.96047 16.4815 6.7613 18.3331 10 18.3331Z"
              fill="#4CAF50"
            />
            <path
              d="M18.1713 8.36808H17.5V8.3335H10V11.6668H14.7096C14.3809 12.5903 13.7889 13.3973 13.0067 13.9881L13.0079 13.9872L15.5871 16.1697C15.4046 16.3356 18.3333 14.1668 18.3333 10.0002C18.3333 9.44141 18.2758 8.896 18.1713 8.36808Z"
              fill="#1976D2"
            />
          </svg>
          <h3 className="text-xs text-[#131D26] font-medium">
            Continue with Google
          </h3>
        </div>
      )}
    </div>
  );
};

export default AuthWithGoogle;
