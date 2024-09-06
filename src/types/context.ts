import User from './auth';

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean | null;
  login: (
    email?: string,
    password?: string,
    googleToken?: any,
    url?: 'google' | 'manual'
  ) => Promise<void>;
  register: (
    email: string,
    firstName: string,
    lastName: string,
    picture: any,
    password: string
  ) => Promise<void>;
  currentPlatform: any;
  setCurrentPlatform: any;
}
