import React, { useState } from 'react';
import Logo from '/logo.png';
import MobileLogo from '../../../assets/mobile-logo.png';
import NavBar from './navComp/NavBar';
import { Link } from 'react-router-dom';
import { LandingPageLogo } from '../../common/Icons';
interface compProps {
  token: any;
}

const ResponsiveAuthHeader = ({ token }: compProps) => {
  const [toggleMobile, setToggleMobile] = useState(false);

  const handleToggleMobile = () => {
    setToggleMobile(!toggleMobile);
  };
  return (
    <>
      <nav className="bg-white  h-auto">
        <div className="w-full max-w-screen-xl  3xl:max-w-[2000px] flex flex-wrap items-center justify-between mx-auto px-2 md:px-10">
          <a
            href="/"
            className="flex items-center  space-x-3 rtl:space-x-reverse"
          >
            <LandingPageLogo />
          </a>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token ? (
              <div className="flex items-center h-full justify-center gap-[8px]">
                <Link to="/overview">
                  <button
                    type="button"
                    className="hidden lg:block text-[#131D26] bg-[#A8A8AB33] hover:bg-[#A8A8AB33] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Dashboard
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center h-full justify-center gap-[8px]">
                <Link to="/login">
                  <button
                    type="button"
                    className="hidden lg:block text-[#131D26] bg-[#A8A8AB33] hover:bg-[#A8A8AB33] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="hidden lg:block text-[#F6D155] bg-[#131D26] hover:bg-[#131D26] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Create Account
                  </button>
                </Link>
              </div>
            )}

            <button
              data-collapse-toggle="navbar-cta"
              onClick={handleToggleMobile}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden"
              aria-controls="navbar-cta"
              aria-expanded="false"
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
          </div>
          <NavBar />
          {toggleMobile && (
            <div
              className="items-center justify-between w-full md:flex md:w-auto md:order-1 border-gray-100"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:hidden md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 d:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
              <div className="flex items-center h-full justify-center gap-[8px]">
                <button
                  type="button"
                  className="text-[#131D26] bg-[#A8A8AB33] hover:bg-[#A8A8AB33] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="text-[#F6D155] bg-[#131D26] hover:bg-[#131D26] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default ResponsiveAuthHeader;
