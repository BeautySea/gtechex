import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  token: any;
}

interface AuthContextProps {
  authState: AuthState;
  login: (token: string) => void;
  signup?: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
  });

  useEffect(() => {
    // Check if the token is already present in cookies
    const tokenFromCookie = Cookies.get('authToken');
    if (tokenFromCookie) {
      setAuthState({
        isAuthenticated: true,
        token: tokenFromCookie,
      });
    }
  }, []);

  const login = (token: string) => {
    // Set the token in the context state
    setAuthState({
      isAuthenticated: true,
      token: token,
    });

    // Save the token in a cookie
    Cookies.set('authToken', token, { expires: 7 });
  };

  //   const signup = (token: any) => {
  //     // Your signup logic goes here
  //     // Assuming you get a token after successful signup
  //     const newToken = token;

  //     // Call the login function to update the context state and save the token
  //     login(newToken);
  //   };

  const logout = () => {
    // Remove the token from the context state
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
    Cookies.remove('authToken');
  };

  const getAuthDataFromCookie = () => {
    const storedToken = Cookies.get('authToken');

    if (storedToken) {
      setAuthState({
        isAuthenticated: true,
        token: storedToken,
      });
    }
  };

  // Effect to retrieve user details and token from the cookie on mount
  useEffect(() => {
    getAuthDataFromCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
