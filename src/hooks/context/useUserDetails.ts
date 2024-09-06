import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import useLocalStorage from '../useLocalStorage';
import { removeCookie, setCookie } from '../../utils/cookieUtils';

interface AuthData {
    authType: string[];
    createdAt: string;
    email: string;
    firstName: string;
    lastName: string;
    limits: null | any; // Change 'any' to the actual type if you have it
    picture: string;
    token: string;
    updatedAt: string;
    username: string;
  }

  interface AuthState {
    // isAuthenticated?: boolean;
    token?: string | null;
  }

const useAuth = () => {
  const [user, setUser] = useState<AuthData | null>(null);
  const [token, setToken] = useLocalStorage<string>('authToken');
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [authState, setAuthState] = useState<AuthState>({
    // isAuthenticated: false,
    token: null,
  });

  // Function to set user details and token on successful login
  const setAuthData = (authData: AuthData) => {
    setUser(authData);
    setIsAuthenticated(true)
    setToken(authData.token)
    Cookies.set('authToken', authData.token, { expires: 7 }); 
  };

  // Function to clear user details and token on logout
  const clearAuthData = () => {
    setUser(null);
    setIsAuthenticated(false);
      localStorage.removeItem('authToken')
    Cookies.remove('authToken');
    removeCookie('userDetails');
  };


useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();
  }, []);


  
  

  return {
    user,
    authState,
    token,
    isAuthenticated,
    setAuthData,
    setAuthState,
    clearAuthData,
  };
};

export default useAuth;
