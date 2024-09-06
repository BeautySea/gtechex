import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../../interfaces/avatar/avatar';
import styles from './topNav.module.css';
import MobileLogo from '../../../assets/mobileLogo.png';
import { useState } from 'react';
import ButtonRounded from '../../common/buttons/ButtonRounded';
import SearchComponent from './SearchComponent';
import AvatarComponent from './AvatarComponent';
import notificationIcon from '../../../assets/Notification.png';
import { getCookie } from '../../../utils/cookieUtils';
import useAuth from '../../../hooks/context/useUserDetails';
import useAxios from '../../../api/hooks/useAxios';
import ENUM from '../../../service/enum';
import axios from '../../../api/baseAxios';

const data: string[] = [
  'Enjoy 24 application per day',
  'Apply on all platforms',
  'Create unlimited custom CVs',
  'Add extra user and enjoy all benefit',
  'Please click the upgrade button',
];

export interface UserDetails {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string;
}

const TopNav = () => {
  // const userDetails: UserDetails | undefined = getCookie('userDetails');
  const token = localStorage.getItem('authToken') || '';
  const [userDetails, errorMsg, requestLoading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: ENUM.GET_USER_DATA,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const [toggleMobile, setToggleMobile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const router = useNavigate();
  const { clearAuthData } = useAuth();
  const handleToggleMobile = () => {
    setToggleMobile(!toggleMobile);
  };

  const handleLogOut = () => {
    clearAuthData();
    setTimeout(() => {
      router(`/login?from=${location.pathname.substring(1)}`);
    }, 1000);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className="w-full max-w-screen-3xl flex items-center justify-start mx-auto  h-[54px]">
          <img src={MobileLogo} alt="moile logo" className="block md:hidden" />
          {/* <h2 className={styles.left}>Hello John</h2> */}
          {/* <div className="hidden items-center justify-left w-1/2 md:w-[400px]">
            <SearchComponent />
          </div> */}
          <div className="w-full 2xl:w-[83%] flex items-center justify-end h-full bg-[#fff]">
            {/* <img src={notificationIcon} alt="notification" /> */}
          </div>
          {/* mobile navigation */}
          <button
            onClick={handleToggleMobile}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {toggleMobile && (
            <div className="w-full z-10 md:hidden bg-gray-50">
              <ul className="font-medium flex flex-col p-4 mt-4 rounded-lg md:hidden  rtl:space-x-reverse">
                <li className="flex items-center gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 12H7V21H3V12ZM17 8H21V21H17V8ZM10 2H14V21H10V2Z"
                      fill="#131D26"
                    />
                  </svg>
                  <a
                    href="#"
                    className="block py-2 px-3 text-[#5F5F5F] text-base font-normal"
                  >
                    Overview
                  </a>
                </li>
                <li className="flex items-center gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM17 13V10H15V13H9V10H7V13H4V19H20V13H17ZM9 3V5H15V3H9Z"
                      fill="#5F5F5F"
                    />
                  </svg>
                  <a
                    href="#"
                    className="block py-2 px-3 text-[#5F5F5F] text-base font-normal"
                  >
                    Jobs applied
                  </a>
                </li>
                <li className="flex items-center gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H16V15H8Z"
                      fill="#5F5F5F"
                    />
                  </svg>
                  <a
                    href="#"
                    className="block py-2 px-3 text-[#5F5F5F] text-base font-normal"
                  >
                    Resumes
                  </a>
                </li>
                <li className="flex items-center gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_577_1352)">
                      <path
                        d="M5.33551 4.548C6.36224 3.62828 7.5682 2.93099 8.87751 2.5C9.25189 2.96902 9.72718 3.34763 10.268 3.60767C10.8089 3.86771 11.4014 4.00249 12.0015 4.002C12.6016 4.00249 13.1941 3.86771 13.735 3.60767C14.2759 3.34763 14.7511 2.96902 15.1255 2.5C16.4348 2.93099 17.6408 3.62828 18.6675 4.548C18.449 5.10645 18.3591 5.70694 18.4045 6.30489C18.4498 6.90284 18.6293 7.4829 18.9295 8.002C19.2291 8.52209 19.6421 8.96795 20.1378 9.30642C20.6334 9.64489 21.199 9.86726 21.7925 9.957C22.0731 11.3059 22.0731 12.6981 21.7925 14.047C20.6325 14.225 19.5625 14.907 18.9295 16.002C18.6291 16.5212 18.4496 17.1015 18.4042 17.6996C18.3589 18.2977 18.4489 18.8984 18.6675 19.457C17.6407 20.3764 16.4347 21.0733 15.1255 21.504C14.751 21.0352 14.2757 20.6567 13.7349 20.3969C13.194 20.137 12.6016 20.0024 12.0015 20.003C11.4014 20.0025 10.8089 20.1373 10.268 20.3973C9.72718 20.6574 9.25189 21.036 8.87751 21.505C7.56828 21.0743 6.36233 20.3774 5.33551 19.458C5.55416 18.8994 5.64415 18.2987 5.59879 17.7006C5.55344 17.1025 5.3739 16.5222 5.07351 16.003C4.7738 15.4831 4.36076 15.0374 3.8651 14.6991C3.36943 14.3608 2.80389 14.1386 2.21051 14.049C1.92983 12.6998 1.92983 11.3072 2.21051 9.958C2.80398 9.86826 3.36958 9.64589 3.86525 9.30742C4.36092 8.96895 4.77392 8.52309 5.07351 8.003C5.37374 7.4839 5.5532 6.90384 5.59856 6.30589C5.64391 5.70794 5.55401 5.10645 5.33551 4.548ZM13.5015 14.6C13.8455 14.4045 14.1473 14.1428 14.3897 13.8301C14.6321 13.5174 14.8103 13.1599 14.9139 12.7781C15.0176 12.3963 15.0447 11.9977 14.9937 11.6054C14.9427 11.213 14.8146 10.8346 14.6168 10.492C14.419 10.1494 14.1553 9.84927 13.8411 9.60894C13.5268 9.36862 13.1681 9.19283 12.7856 9.0917C12.4031 8.99058 12.0043 8.96611 11.6123 9.01971C11.2203 9.0733 10.8428 9.20391 10.5015 9.404C9.81809 9.80465 9.32089 10.4594 9.1184 11.2252C8.91591 11.9911 9.02458 12.806 9.42069 13.4921C9.8168 14.1781 10.4682 14.6797 11.2327 14.8872C11.9972 15.0948 12.8128 14.9916 13.5015 14.6Z"
                        fill="#5F5F5F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_577_1352">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <a
                    href="#"
                    className="block py-2 px-3 text-[#5F5F5F] text-base font-normal"
                  >
                    Profile
                  </a>
                </li>
                <li className="flex items-center gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_577_1385)">
                      <path
                        d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM17 16L22 12L17 8V11H9V13H17V16Z"
                        fill="#5F5F5F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_577_1385">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <a
                    href="#"
                    className="block py-2 px-3 text-[#5F5F5F] text-base font-normal"
                  >
                    Logout
                  </a>
                </li>
              </ul>
              <div className="px-[8px] pb-[8px] pt-[20px] border border-[#131D26] rounded-[29px] w-[272px] mb-10 ml-5 mt-20">
                <ul className="marker:text-[#9B9B9B] list-outside list-disc ml-6">
                  {data.map((cont: string, i: string | number) => (
                    <li
                      className="text-[#131D26] text-xs font-normal mt-[6px] mb-[6px]"
                      key={i}
                    >
                      {cont}
                    </li>
                  ))}
                </ul>
                <ButtonRounded
                  text="Upgrade to Premium"
                  className="text-base text-[#fff] font-bold bg-[#131D26] w-full rounded-[28px] py-[13px] mt-[11px]"
                  type="button"
                />
              </div>
            </div>
          )}

          <div
            className={`${styles.right} cursor-default relative`}
            onMouseEnter={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
          >
            <AvatarComponent
              userDetails={userDetails}
              requestLoading={requestLoading}
            />
            <div
              className={`border border-[#E5E6EC] rounded-[4px] bg-[#fff] py-[8px] px-[12px] absolute right-20 top-14 ${
                showOptions ? 'block' : 'hidden'
              } transition-opacity duration-300`}
            >
              <ul className="flex flex-col gap-[8px]">
                <li className="text-sm font-medium text-[#131D26] leading-5 cursor-pointer">
                  <a href="/account">View my Profile</a>
                </li>
                <li
                  className="text-sm font-medium text-[#131D26] leading-5 cursor-pointer"
                  onClick={handleLogOut}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
          {/* </Link> */}
        </div>
      </nav>
    </>
  );
};

export default TopNav;
