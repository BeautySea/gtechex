import { FormEvent, useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FormHandler } from '../service/form';
import useAuthContext from '../hooks/context/useAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from '../components/layouts/authLayout';
import InputWithAvatar from '../components/common/form/InputWithAvatar';
import PasswordInput from '../components/common/form/PasswordInput';
import OrdinaryCustomLabel from '../components/common/OrdinaryCustomLabel';
import CustomButton from '../components/common/buttons/CustomButton';
import AuthWithGoogle from '../components/modules/authModule/AuthWithGoogle';
import AuthAlternative from '../components/modules/authModule/AuthAlternative';
import ForgotPasswordComp from '../components/modules/authModule/ForgotPasswordComp';
import { showToast } from '../components/common/toasts/CustomToast';
// import { getSecret } from '../utils/aws/getSecretes';
import { AnyIfEmpty } from 'react-redux';
import { fetchCredentials } from '../utils/aws/awsSecrets';

const LoginPage = () => {
  const { login } = useAuthContext();
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [secretValue, setSecretValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = FormHandler(e, ['email', 'password']);

    try {
      setLoading(true);
      await login(data.email, data.password, 'manual');
    } catch (error: any) {
      setLoading(false);
      if (error?.name === 'AxiosError') {
        console.error('Login failed:', error);

        // showToastErrorMessage(error?.response?.data?.message);
        // showToast(error?.response?.data?.message, 'error');
      } else {
        // showToastErrorMessage();
        // showToast('Something went wrong. Please try again!', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const secret = await fetchCredentials(); name
  //       setSecretValue(secret);
  //     } catch (error: any) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log('secretValue', secretValue);

  return (
    <AuthLayout>
      <div className="flex flex-col w-full md:w-[360px] px-5 mx-auto">
        {/* Create Account */}
        <AuthWithGoogle page="Log In to account" action="login" />

        <div className="flex items-center justify-between my-[20px] gap-[8px]">
          <div className="inline-block border border-[#E5E6EC] w-full"></div>
          <p className="inline-block text-xs text-[#5A5C5D] font-normal">or</p>
          <div className="inline-block border border-[#E5E6EC] w-full"></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 ">
          <div className="flex flex-col gap-[4px]">
            <OrdinaryCustomLabel
              htmlFor="email"
              text="Email Address"
              className="text-xs text-[#131D26] font-medium"
            />
            <InputWithAvatar
              name="email"
              ref={email}
              placeholder="Enter your email address"
              required={true}
              type="email"
              avatar={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M11.2928 2C12.1868 2 13.0468 2.35333 13.6795 2.98733C14.3128 3.62 14.6668 4.47333 14.6668 5.36667V10.6333C14.6668 12.4933 13.1535 14 11.2928 14H4.70683C2.84616 14 1.3335 12.4933 1.3335 10.6333V5.36667C1.3335 3.50667 2.8395 2 4.70683 2H11.2928ZM12.0468 5.46667C11.9068 5.45933 11.7735 5.50667 11.6728 5.6L8.66683 8C8.28016 8.32067 7.72616 8.32067 7.3335 8L4.3335 5.6C4.12616 5.44667 3.8395 5.46667 3.66683 5.64667C3.48683 5.82667 3.46683 6.11333 3.6195 6.31333L3.70683 6.4L6.74016 8.76667C7.1135 9.06 7.56616 9.22 8.04016 9.22C8.51283 9.22 8.9735 9.06 9.34616 8.76667L12.3535 6.36L12.4068 6.30667C12.5662 6.11333 12.5662 5.83333 12.3995 5.64C12.3068 5.54067 12.1795 5.48 12.0468 5.46667Z"
                    fill="#C1C1C3"
                  />
                </svg>
              }
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <OrdinaryCustomLabel
              htmlFor="password"
              text="Password"
              className="text-xs text-[#131D26] font-medium"
            />
            <PasswordInput
              avatar={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.98976 1.33331C10.0356 1.33331 11.6817 2.94317 11.6817 4.93065V5.95288C12.83 6.31129 13.6666 7.35074 13.6666 8.59225V11.8835C13.6666 13.4205 12.3923 14.6666 10.8214 14.6666H5.17912C3.60749 14.6666 2.33325 13.4205 2.33325 11.8835V8.59225C2.33325 7.35074 3.17055 6.31129 4.31811 5.95288V4.93065C4.32488 2.94317 5.97103 1.33331 7.98976 1.33331ZM7.99653 8.92283C7.67137 8.92283 7.40717 9.1812 7.40717 9.4992V10.9699C7.40717 11.2946 7.67137 11.5529 7.99653 11.5529C8.32847 11.5529 8.59267 11.2946 8.59267 10.9699V9.4992C8.59267 9.1812 8.32847 8.92283 7.99653 8.92283ZM8.00331 2.49268C6.62813 2.49268 5.51038 3.57916 5.5036 4.9174V5.80912H10.4962V4.93065C10.4962 3.58579 9.37848 2.49268 8.00331 2.49268Z"
                    fill="#C1C1C3"
                  />
                </svg>
              }
              placeholder="Enter your password"
              ref={password}
              required={true}
              name="password"
            />
          </div>
          <ForgotPasswordComp />
          <CustomButton
            type="submit"
            text="Log In"
            loading={loading}
            className="w-full flex items-center justify-center py-[12px] bg-[#131D26] rounded-[4px] text-xs font-semibold text-[#F6D155]"
          />
          <AuthAlternative page="login" />
        </form>
      </div>
      <Toaster />
    </AuthLayout>
  );
};

export default LoginPage;
