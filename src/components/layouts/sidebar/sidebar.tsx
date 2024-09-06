/* eslint-disable react-hooks/rules-of-hooks */
import OverviewIcon from '../../interfaces/icons/overview';
import ProfileIcon from '../../interfaces/icons/profile';
import ResumeIcon from '../../interfaces/icons/resume';
import NavItem from '../navItem/navItem';
import Logo from '/logo.png';
import PrimaryButton from '../../interfaces/primaryButton/primaryButton';
import styles from './sidebar.module.css';
import LogoutIcon from '../../interfaces/icons/logout';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/context/useUserDetails';
import JobsAppliedIcon from '../../interfaces/icons/jobsAppliedIcon';
import { useEffect, useState } from 'react';
import FeatureREquestModal from './FeatureREquestModal';
import UpgradeToPremiumModal from './UpgradeToPremiumModal';
import { getCookie } from '../../../utils/cookieUtils';
import UpgradeToStandardModal from './UpgradeToStandardModal';
import NewsLetterModal from '../../common/modal/NewsLetterModal';
import PurchaseAPlanModal from '../../common/modal/PurchaseAPlanModal';
import useAxios from '../../../api/hooks/useAxios';
import ENUM from '../../../service/enum';
import baseAxios from '../../../api/baseAxios';
import { ShineShineIcon, SideBarLogo, SidebarBot } from '../../common/Icons';
// import useAuth from '../../../hooks/context/useUserDetails';

export interface UserDetails {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  picture: string;
}

const Sidebar = () => {
  const location = useLocation();
  const token = localStorage.getItem('authToken') || '';
  const userDetails: UserDetails | undefined = getCookie('userDetails');
  const [toggleRequest, setToggleRequest] = useState(false);
  const [togglePremiumUpgrade, setTogglePremiumUpgrade] = useState(false);
  const [togglePurchaseAPlan, setTogglePurchaseAPlan] = useState(false);
  const [toggleNewsLetter, setToggleNewsLetter] = useState(false);
  const [hasPlan, setHasPlan] = useState('Purchase Plan');
  const router = useNavigate();
  const { clearAuthData } = useAuth();

  const handleToggleREquest = () => {
    setToggleRequest(!toggleRequest);
  };
  const handlePremiumUpgrade = () => {
    setTogglePremiumUpgrade(!togglePremiumUpgrade);
  };

  const [userSubPlan, errorMsg, requestLoading, refreshFucntion] = useAxios({
    axiosInstance: baseAxios,
    method: 'GET',
    url: ENUM.GET_USER_SUBSCRIPTION_PLAN,
    requestConfig: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (location.pathname.startsWith('/resumes/templates/')) return null;
  const handleLogOut = () => {
    clearAuthData();
    setTimeout(() => {
      router(`/?from=${location.pathname.substring(1)}`);
    }, 1000);
  };

  const handlePurchaseAPlan = () => {
    router('/pricing');
  };

  const handleToggleNewsLetter = () => {
    setToggleNewsLetter(!toggleNewsLetter);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setToggleNewsLetter(true);
  //   }, 300000); // 300000 milliseconds = 5 minutes

  //   return () => clearTimeout(timer);
  // }, []);

  const handleTogglePurchaseAPlan = () => {
    setTogglePurchaseAPlan(!togglePurchaseAPlan);
  };

  return (
    <>
      <div className="mobileContainer">
        <aside className={styles.sidebar}>
          <div>
            <div className={styles.logo}>
              <a href="/">
                <SideBarLogo />
              </a>
            </div>
            <div className={styles.navItems}>
              <NavItem href="/overview" icon={<OverviewIcon />}>
                Overview
              </NavItem>
              <NavItem href="/jobs-applied" icon={<JobsAppliedIcon />}>
                Jobs Applied
              </NavItem>
              <NavItem href="/resumes" icon={<ResumeIcon />}>
                Resumes
              </NavItem>
              <NavItem href="/account" icon={<ProfileIcon />}>
                Account
              </NavItem>
            </div>
            <div className={styles.navItems2}>
              <div className="p-[20px]">
                <span className="text-[#737677] text-[12px] font-semibold">
                  OTHER MENU
                </span>
              </div>
              <NavItem href="/ai-score-resume" icon={<SidebarBot />}>
                AI Score Resume
              </NavItem>
              <NavItem href="/tailor-resume" icon={<SidebarBot />}>
                Tailor Resume
              </NavItem>
              <NavItem href="/ai-resume-builder" icon={<SidebarBot />}>
                AI Resume Builder
              </NavItem>
            </div>
          </div>
          {/* <div className={styles.premium}>
          <ul>
            <li>Enjoy 24 application per day</li>
            <li>Apply on all platforms</li>
            <li>Create unlimited custom CVs</li>
            <li>Add extra user and enjoy all benefit</li>
            <li>Please click the upgrade button</li>
            <PrimaryButton
              className={`${styles.premiumButton} bg-[#fff] rounded-[28px]`}
            >
              Upgrade to Premium
            </PrimaryButton>
          </ul>
        </div> */}
          <div className="flex flex-col mt-16 mb-[20px]  ">
            <div className="flex flex-col items-center justify-center border-t border-b border-[#A8A8AB3D] w-[90%] py-[20px] mx-auto">
              <div className="flex items-center justify-left gap-[4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M9.88141 2.25C10.6637 2.25 11.4162 2.55917 11.9697 3.11392C12.5239 3.6675 12.8337 4.41417 12.8337 5.19583V9.80417C12.8337 11.4317 11.5095 12.75 9.88141 12.75H4.11866C2.49058 12.75 1.16699 11.4317 1.16699 9.80417V5.19583C1.16699 3.56833 2.48474 2.25 4.11866 2.25H9.88141ZM10.5412 5.28333C10.4187 5.27692 10.302 5.31833 10.2139 5.4L7.58366 7.5C7.24533 7.78058 6.76058 7.78058 6.41699 7.5L3.79199 5.4C3.61058 5.26583 3.35974 5.28333 3.20866 5.44083C3.05116 5.59833 3.03366 5.84917 3.16724 6.02417L3.24366 6.1L5.89783 8.17083C6.22449 8.4275 6.62058 8.5675 7.03533 8.5675C7.44891 8.5675 7.85199 8.4275 8.17808 8.17083L10.8095 6.065L10.8562 6.01833C10.9956 5.84917 10.9956 5.60417 10.8497 5.435C10.7687 5.34808 10.6572 5.295 10.5412 5.28333Z"
                    fill="#A8A8AB"
                  />
                </svg>
                <span className="text-[#A8A8AB] text-sm font-normal">
                  support@cloutra.com
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleREquest}
                className="mt-[12px] flex items-center justify-center gap-[4px] bg-[#F6D155] text-[#131D26] text-xs font-medium border-0 rounded-sm px-[6px] py-[8px] w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.99992 1.33325C6.76224 1.33325 5.57526 1.82492 4.70009 2.70009C3.82492 3.57526 3.33325 4.76224 3.33325 5.99992C3.33325 7.58659 4.12659 8.97992 5.33325 9.82658V11.3333C5.33325 11.5101 5.40349 11.6796 5.52851 11.8047C5.65354 11.9297 5.82311 11.9999 5.99992 11.9999H9.99992C10.1767 11.9999 10.3463 11.9297 10.4713 11.8047C10.5963 11.6796 10.6666 11.5101 10.6666 11.3333V9.82658C11.8733 8.97992 12.6666 7.58659 12.6666 5.99992C12.6666 4.76224 12.1749 3.57526 11.2997 2.70009C10.4246 1.82492 9.2376 1.33325 7.99992 1.33325ZM5.99992 13.9999C5.99992 14.1767 6.07016 14.3463 6.19518 14.4713C6.3202 14.5963 6.48977 14.6666 6.66658 14.6666H9.33325C9.51006 14.6666 9.67963 14.5963 9.80466 14.4713C9.92968 14.3463 9.99992 14.1767 9.99992 13.9999V13.3333H5.99992V13.9999Z"
                    fill="#131D26"
                  />
                </svg>
                Feature Request
              </button>
            </div>

            {userSubPlan === null ? (
              <button
                type="button"
                onClick={handlePurchaseAPlan}
                className="mt-[12px] flex items-center justify-center gap-[8px] bg-[#9747FF] text-[#E7E7E7] text-xs font-medium border-0 rounded-sm px-[6px] py-[8px] w-[90%] mx-auto"
              >
                <div>
                  <ShineShineIcon />
                </div>
                <div className="flex flex-col">
                  {/* <span> Upgrade to premium</span> */}
                  <span>{hasPlan}</span>
                  <span className="text-[10px]">Enjoy exciting features</span>
                </div>
              </button>
            ) : userSubPlan !== null &&
              userSubPlan?.data?.details?.status === 'canceled' ? (
              <button
                type="button"
                onClick={handlePurchaseAPlan}
                className="mt-[12px] flex items-center justify-center gap-[8px] bg-[#9747FF] text-[#E7E7E7] text-xs font-medium border-0 rounded-sm px-[6px] py-[8px] w-[90%] mx-auto"
              >
                <div>
                  <ShineShineIcon />
                </div>
                <div className="flex flex-col">
                  {/* <span> Upgrade to premium</span> */}
                  <span>{hasPlan}</span>
                  <span className="text-[10px]">Enjoy exciting features</span>
                </div>
              </button>
            ) : userSubPlan !== null &&
              userSubPlan?.data?.details?.status === 'active' &&
              userSubPlan?.data?.details?.items?.data[0]?.price?.lookup_key ===
                'test_premium' ? (
              <button
                type="button"
                onClick={handleTogglePurchaseAPlan}
                className="mt-[12px] flex items-center justify-center gap-[8px] bg-[#9747FF] text-[#E7E7E7] text-xs font-medium border-0 rounded-sm px-[6px] py-[8px] w-[90%] mx-auto"
              >
                <div>
                  <ShineShineIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {' '}
                    Downgrade to Standard
                  </span>
                  <span className="text-[10px]">Enjoy exciting features</span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleTogglePurchaseAPlan}
                className="mt-[12px] flex items-center justify-center gap-[8px] bg-[#9747FF] text-[#E7E7E7] text-xs font-medium border-0 rounded-sm px-[6px] py-[8px] w-[90%] mx-auto"
              >
                <div>
                  <ShineShineIcon />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    {' '}
                    Upgrade to premium
                  </span>
                  {/* <span>{hasPlan}</span> */}
                  <span className="text-[10px]">Enjoy exciting features</span>
                </div>
              </button>
            )}

            <div className={styles.logout}>
              <PrimaryButton onClick={handleLogOut} icon={<LogoutIcon />}>
                Logout
              </PrimaryButton>
            </div>
          </div>
        </aside>
      </div>
      {toggleRequest ? (
        <FeatureREquestModal toggleModal={handleToggleREquest} />
      ) : null}

      {togglePurchaseAPlan ? (
        <PurchaseAPlanModal
          toggleModal={handleTogglePurchaseAPlan}
          userSubPlan={userSubPlan}
        />
      ) : null}

      {/* {toggleNewsLetter ? (
        <NewsLetterModal toggleModal={handleToggleNewsLetter} />
      ) : null} */}

      {/* {togglePremiumUpgrade ? (
        <UpgradeToStandardModal toggleModal={handlePremiumUpgrade} />
      ) : null} */}
    </>
  );
};

export default Sidebar;
