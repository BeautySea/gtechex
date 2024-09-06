import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import PasswordChecklist from 'react-password-checklist';
import useAuthContext from '../hooks/context/useAuthContext';
import AuthLayout from '../components/layouts/authLayout';
import AuthWithGoogle from '../components/modules/authModule/AuthWithGoogle';
import OrdinaryCustomLabel from '../components/common/OrdinaryCustomLabel';
import InputWithAvatar from '../components/common/form/InputWithAvatar';
import PasswordInput from '../components/common/form/PasswordInput';
import CustomButton from '../components/common/buttons/CustomButton';
import AuthAlternative from '../components/modules/authModule/AuthAlternative';
import { showToastErrorMessage } from '../components/common/toast';
import { FormHandler } from '../service/form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [validPassword, setValidPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
  });
  const { register } = useAuthContext();
  const email = useRef<HTMLInputElement | null>(null);
  const firstName = useRef<HTMLInputElement | null>(null);
  const lastName = useRef<HTMLInputElement | null>(null);
  const picture = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  useEffect(() => {
    setPasswordData({
      password: '',
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // const emailValue = email.current?.value || '';
    const pictureValue = picture.current?.value || '';
    // const firstNameValue = firstName.current?.value || '';
    // const lastNameValue = lastName.current?.value || '';
    // const passwordValue = password.current?.value || '';
    setLoading(true);
    const data = FormHandler(e, ['firstName', 'lastName', 'email', 'password']);
    console.log('data', data.password);

    try {
      await register(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        pictureValue
      );
    } catch (error: any) {
      setLoading(false);
      if (error?.name === 'AxiosError') {
        console.error('Login failed:', error);

        showToastErrorMessage(error?.response?.data?.message);
      } else {
        showToastErrorMessage('Something went wrong. Please try again!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col w-full md:w-[360px] px-5 mx-auto">
        {/*  */}
        <AuthWithGoogle page="Create Account" />

        <div className="flex items-center justify-between my-[20px] gap-[8px]">
          <div className="inline-block border border-[#E5E6EC] w-full"></div>
          <p className="inline-block text-xs text-[#5A5C5D] font-normal">or</p>
          <div className="inline-block border border-[#E5E6EC] w-full"></div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5 ">
          <div className="flex flex-col gap-[4px]">
            <OrdinaryCustomLabel
              htmlFor="firstName"
              text="First Name"
              className="text-xs text-[#131D26] font-medium"
            />
            <InputWithAvatar
              name="firstName"
              ref={firstName}
              placeholder="Enter your first Name"
              required={true}
              type="text"
              avatar={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                >
                  <path
                    d="M5.99984 9.11587C8.89225 9.11587 11.3332 9.58588 11.3332 11.3992C11.3332 13.2132 8.87625 13.6666 5.99984 13.6666C3.10809 13.6666 0.666504 13.1966 0.666504 11.3832C0.666504 9.56921 3.12343 9.11587 5.99984 9.11587ZM5.99984 0.333252C7.95924 0.333252 9.52916 1.9026 9.52916 3.86062C9.52916 5.81864 7.95924 7.38866 5.99984 7.38866C4.0411 7.38866 2.47051 5.81864 2.47051 3.86062C2.47051 1.9026 4.0411 0.333252 5.99984 0.333252Z"
                    fill="#C1C1C3"
                  />
                </svg>
              }
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <OrdinaryCustomLabel
              htmlFor="lastName"
              text="Last Name"
              className="text-xs text-[#131D26] font-medium"
            />
            <InputWithAvatar
              name="lastName"
              ref={lastName}
              placeholder="Enter your last Name"
              required={true}
              type="text"
              avatar={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                >
                  <path
                    d="M5.99984 9.11587C8.89225 9.11587 11.3332 9.58588 11.3332 11.3992C11.3332 13.2132 8.87625 13.6666 5.99984 13.6666C3.10809 13.6666 0.666504 13.1966 0.666504 11.3832C0.666504 9.56921 3.12343 9.11587 5.99984 9.11587ZM5.99984 0.333252C7.95924 0.333252 9.52916 1.9026 9.52916 3.86062C9.52916 5.81864 7.95924 7.38866 5.99984 7.38866C4.0411 7.38866 2.47051 5.81864 2.47051 3.86062C2.47051 1.9026 4.0411 0.333252 5.99984 0.333252Z"
                    fill="#C1C1C3"
                  />
                </svg>
              }
            />
          </div>
          {/* lastNameValue */}

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
              value={passwordData.password}
              name="password"
              changeHadler={handleInputChange}
            />
          </div>

          {passwordData.password.length ? (
            <div>
              <PasswordChecklist
                rules={[
                  'minLength',
                  'specialChar',
                  'number',
                  'capital',
                  'lowercase',
                ]}
                minLength={8}
                value={passwordData.password}
                // valueAgain={passwordData.confirmPassword}
                onChange={(isValid: boolean) => {
                  if (isValid === true) {
                    setValidPassword(true);
                  }
                }}
                messages={{
                  minLength: 'Must be more that 8 characters in length.',
                  capital: 'Must contain at least one UPPERCASE character.',
                  lowercase: 'Must contain at least one LOWERCASE character.',
                  specialChar: 'Must contain SPECIAL Characters.',
                  number: 'Must have at least one NUMBER',
                }}
                className="text-xs"
              />
            </div>
          ) : null}

          <CustomButton
            type="submit"
            text="Create Account"
            // disabled={validPassword}
            loading={loading}
            className={`w-full flex items-center justify-center py-[12px] bg-[#131D26] rounded-[4px] text-xs font-semibold text-[#F6D155] ${
              validPassword === false ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          />

          <AuthAlternative page="register" setPasswordData={setPasswordData} />
        </form>
      </div>
      <ToastContainer />
    </AuthLayout>
  );
};

export default RegisterPage;
