import React from 'react';
import { useNavigate } from 'react-router-dom';

interface compProps {
  page: 'login' | 'register';
  setPasswordData?: any;
}

const AuthAlternative = ({ page, setPasswordData }: compProps) => {
  const navigate = useNavigate();

  const handlePageSwitch = () => {
    if (setPasswordData) {
      setPasswordData({
        password: '',
      });
    }
    console.log('clicked');

    page === 'login' ? navigate('/register') : navigate('/login');
  };
  return (
    <div className="flex flex-col w-full items-center justify-left w-full gap-[10px] lg:gap-[20px]">
      {page === 'login' ? (
        <p className="text-xs font-semibold text-[#5A5C5D]">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={handlePageSwitch}
            className="inline border-0 text-[#131D26] underline"
          >
            Register
          </button>
        </p>
      ) : (
        <p className="text-xs font-semibold text-[#5A5C5D]">
          Have an account?
          {/* <a href="/login" className="text-[#131D26] underline">
            Sign In
          </a> */}
          <button
            type="button"
            onClick={handlePageSwitch}
            className="inline border-0 text-[#131D26] underline"
          >
            Sign In
          </button>
        </p>
      )}

      <p className="text-[10px] lg:text-xs font-semibold text-[#5A5C5D]">
        By signing up, you agree to our{' '}
        <a href="#" className="text-[#131D26] underline">
          Terms & Conditions.
        </a>
      </p>
    </div>
  );
};

export default AuthAlternative;
