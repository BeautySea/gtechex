import { useCallback, useState } from 'react';
import Layoutwrapper from '../components/layouts/layoutwrapper';
import InnerLayoutWrapper from '../components/layouts/InnerLayoutWrapper';
import BorderWrapper from '../components/common/BorderWrapper';
import ChangePassword from '../components/modules/profileModules/ChangePassword';
import { myAxiosWithAuthFetchWithPayload } from '../api/normalRequest';
import { useLocation, useNavigate } from 'react-router';
import { UserDetails } from '../components/layouts/topNav/topNav';
import { getCookie } from '../utils/cookieUtils';
import CustomSpin from '../components/common/CustomSpin';
import {
  showToastErrorMessage,
  showToastMessage,
} from '../components/common/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ENUM from '../service/enum';
import PageSubTitle from '../components/layouts/PageSubTitle';

const ChangeUserpassword = () => {
  const [validPassword, setValidPassword] = useState(false);
  const userDetails: UserDetails | undefined = getCookie('userDetails');
  const token = localStorage.getItem('authToken') || '';
  const [errMsg, setErrMsg] = useState('');
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  console.log('token', token);

  // const otpData = location.state && location.state.data;

  //   useEffect(() => {
  //     getCredentials().then((cred) => {
  //       console.log('i am here');

  //       console.log('aws credendtials', cred);
  //     });
  //   }, []);

  console.log('validPassword', validPassword);

  const startChangePassword = useCallback(async () => {
    const method = 'PUT';
    const route = ENUM.UPDATE_PASSWORD;
    const data = {
      newPassword: passwordData.password,
      currentPassword: passwordData.confirmPassword,
    };
    setIsLoading(true);
    try {
      const response = await myAxiosWithAuthFetchWithPayload({
        method,
        route,
        data,
        token,
      });
      console.log('response', response);
      if (response?.status === true) {
        setIsLoading(false);
        showToastMessage(response?.message);

        setTimeout(() => {
          navigate('/account');
        }, 1000);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      if (error.name === 'AxiosError') {
        if (error.response?.status === 401) {
          showToastErrorMessage(error?.response?.data?.message);
          setTimeout(() => {
            navigate('/account');
          }, 2000);
        }
      }
    }
  }, [passwordData]);

  console.log('from here', passwordData);
  const handleCalcel = () => {
    navigate('/account');
  };

  return (
    <>
      <Layoutwrapper>
        <div className="flex flex-col w-full mb-5 mx-auto">
          {/* top bar */}
          <PageSubTitle
            title="Change Password"
            needRoute={true}
            routeTo="account"
            subTitle="Change your password information here"
            btnClassName="flex items-center justify-center text-[#F6D155] text-xs font-medium rounded bg-[#131D26] py-2 px-3"
          />
          {/* content container */}
          <InnerLayoutWrapper>
            <BorderWrapper bg="#fff">
              {/* <div className="flex flex-col items-start max-w-2xl  md:w-[586px]"> */}
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col w-full">
                  <ChangePassword
                    setValidPassword={setValidPassword}
                    passwordData={passwordData}
                    setPasswordData={setPasswordData}
                    setErrMsg={setErrMsg}
                    errMsg={errMsg}
                  />
                </div>

                <div className="flex items-center justify-start gap-[12px] mt-2">
                  <button
                    type="button"
                    onClick={handleCalcel}
                    className="flex items-center text-[12px] text-[#131D26] font-medium bg-[#A8A8AB33] rounded-[4px] py-[8px] px-[12px] gap-[4px]"
                  >
                    {' '}
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M11.0833 5.83342H11.6667C11.9888 5.83342 12.25 6.09457 12.25 6.41675V12.2501C12.25 12.5723 11.9888 12.8334 11.6667 12.8334H2.33333C2.01117 12.8334 1.75 12.5723 1.75 12.2501V6.41675C1.75 6.09457 2.01117 5.83342 2.33333 5.83342H2.91667V5.25008C2.91667 2.99492 4.74484 1.16675 7 1.16675C9.25517 1.16675 11.0833 2.99492 11.0833 5.25008V5.83342ZM9.91667 5.83342V5.25008C9.91667 3.63925 8.61082 2.33341 7 2.33341C5.38917 2.33341 4.08333 3.63925 4.08333 5.25008V5.83342H9.91667ZM6.41667 8.16675V10.5001H7.58333V8.16675H6.41667Z"
                        fill="#131D26"
                      />
                    </svg>{' '} */}
                    Cancel
                  </button>
                  {validPassword !== true ? (
                    <button
                      type="button"
                      disabled
                      className="flex items-center text-[12px] text-[#F8F9FF] font-medium bg-[#2196534d] rounded-[4px] py-[8px] px-[12px]"
                    >
                      Change Password
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        userDetails ? startChangePassword() : null
                      }
                      className="flex items-center text-[12px] text-[#F8F9FF] font-medium bg-[#219653] rounded-[4px] py-[8px] px-[12px]"
                    >
                      Change Password {isLoading ? <CustomSpin /> : null}
                    </button>
                  )}
                </div>
                {/* buttton group */}
              </div>
            </BorderWrapper>
          </InnerLayoutWrapper>
        </div>
      </Layoutwrapper>
      <ToastContainer />
    </>
  );
};

export default ChangeUserpassword;
