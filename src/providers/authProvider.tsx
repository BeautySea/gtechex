import { useLocation, useNavigate } from 'react-router-dom';
import User from '../types/auth';
import { AuthContextValue } from '../types/context';
import toast, { Toaster } from 'react-hot-toast';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { myAxiosNoAuthFetchWithPayload } from '../api/normalRequest';
import useAuth from '../hooks/context/useUserDetails';
import { setCookie } from '../utils/cookieUtils';
import { showToastErrorMessage } from '../components/common/toast';
import ENUM from '../service/enum';

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const PUBLIC_NONE_AUTH_ROUTE = ['/']; // Add any route that is not affected by auth here
const PUBLIC_AUTH_ROUTE = ['/login', '/register'];
const PRIVATE_ROUTE = [
  '/overview',
  '/jobs-list',
  '/jobs-apply',
  '/account',
  '/resumes',
  '/resumes/create',
  '/resumes/confirm',
];
const PUBLIC_ROUTE = [...PUBLIC_AUTH_ROUTE, ...PUBLIC_NONE_AUTH_ROUTE];

type Command =
  | 'DICE_INITIALIZE_SCAN_F_B'
  | 'DICE_INITIALIZE_SCAN_B_C'
  | 'DICE_INITIALIZE_APPLICATION_F_B'
  | 'DICE_CLICK_APPLY_BUTTON_B_C'
  | 'DICE_APPLY_FOR_SINGLE_JOB_B_C'
  | 'INDEED_INITIALIZE_SCAN_F_B'
  | 'INDEED_INITIALIZE_SCAN_B_C'
  | 'INDEED_INITIALIZE_APPLICATION_F_B'
  | 'INDEED_CLICK_APPLY_BUTTON_B_C'
  | 'INDEED_APPLY_FOR_SINGLE_JOB_B_C'
  | 'LINKEDIN_INITIALIZE_SCAN_F_B'
  | 'LINKEDIN_INITIALIZE_SCAN_B_C'
  | 'LINKEDIN_INITIALIZE_APPLICATION_F_B'
  | 'LINKEDIN_APPLY_FOR_SINGLE_JOB_B_C'
  | 'PING_FULL_RENDER_B_C'
  | 'GET_PATH_NAME_B_C'
  | 'PREPARE_FOR_START'
  | 'REMOVE_BOT_TOKEN';

export interface IRequest {
  command: Command;
  data?: any;
}

export interface IResponse {
  data: any;
  message: string;
  status: 'success' | 'error';
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setAuthData, authState } = useAuth();
  const [authToken, setAuthToken] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState<any>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [validating, setValidating] = useState(true);
  const { state } = useLocation();

  const login = useCallback(
    async (
      email?: string,
      password?: string,
      url?: 'google' | 'manual',
      googleToken?: any
    ) => {
      try {
        // const response = await baseAxios.post('/login', { email, password });
        const method = 'POST';
        const route = url === 'manual' ? ENUM.LOGIN_URL : ENUM.GOOGLE_AUTH_URL;
        const data =
          url === 'google'
            ? { google_token: googleToken }
            : {
                user: email,
                password: password,
              };

        const response = await myAxiosNoAuthFetchWithPayload({
          method,
          route,
          data,
        });
        setUser(response.data);
        console.log('response', response);
        if (response?.status === true && response?.data !== null) {
          setAuthData(response.data);
          setAuthToken(response?.data?.token);
          setCookie('userDetails', {
            email: response?.data?.email,
            id: response?.data?.id,
            firstName: response?.data?.firstName,
            lastName: response?.data?.lastName,
            username: response?.data?.username,
            picture: response?.data?.picture,
          });
          localStorage.setItem('authToken', response?.data?.token);

          toast.success(response?.message);

          setTimeout(() => {
            navigate('/overview');
          }, 300);
          chrome.runtime.sendMessage<IRequest, IResponse>(
            ENUM.CHROME_ACCESS_TOKEN,
            {
              command: 'PREPARE_FOR_START',
              data: response,
            },
            function (res) {
              console.log('Response from background script:', res.message);
            }
          );
        }
        return response;
      } catch (error: any) {
        if (error?.name === 'AxiosError') {
          // showToastErrorMessage(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
        } else {
          toast.error('Something went wrong. Please try again!');
        }
      }
      setValidating(false);
    },
    []
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      picture: any
    ) => {
      const method = 'POST';
      const route = '/users/signup';
      const data = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        picture: 'picture',
      };

      try {
        const response = await myAxiosNoAuthFetchWithPayload({
          method,
          route,
          data,
        });
        if (response.status === true) {
          setUser(response.data);
          setCookie('userDetails', {
            email: response?.data?.email,
            id: response?.data?.id,
            firstName: response?.data?.firstName,
            lastName: response?.data?.lastName,
            username: response?.data?.username,
            picture: response?.data?.picture,
          });

          localStorage.setItem('authToken', response?.data?.token);
          toast.success(response?.message);
          setTimeout(() => {
            navigate(state?.path || '/overview');
          }, 1000);
        }
      } catch (error: any) {
        setValidating(false);
        if (error?.name === 'AxiosError') {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error('Something went wrong. Please try again!');
        }
      } finally {
        setValidating(false);
      }
    },
    []
  );

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();
  }, []);

  const providerValue = useMemo<AuthContextValue>(
    () => ({
      login,
      register,
      user,
      authState,
      isAuthenticated,
      setIsAuthenticated,
      currentPlatform,
      setCurrentPlatform,
    }),
    [
      login,
      register,
      user,
      authState,
      isAuthenticated,
      setIsAuthenticated,
      currentPlatform,
      setCurrentPlatform,
    ]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
