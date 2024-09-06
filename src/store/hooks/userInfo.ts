import { useState } from 'react';

interface UserInformation {
  userAuth: boolean;
}

const useUserInfo = () => {
  // Set the initial state with userAuth as false and role as ['user']
  const [userInfo, setUserInfo] = useState<UserInformation>({
    userAuth: false,
  });

  // Function to update user information when the user logs in
  const userLogin = () => {
    setUserInfo({
      userAuth: true,
    });
  };

  // Function to log the user out
  const logout = () => {
    setUserInfo({
      userAuth: false,
    });
  };

  return { ...userInfo, userLogin, logout };
};

export default useUserInfo;

