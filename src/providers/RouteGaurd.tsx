import React, { useContext } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { AuthContext } from './authProvider';

interface RouteGuardProps {
  component?: React.ElementType;
}

const RouteGaurd = ({ component: Component, ...rest }: RouteGuardProps) => {
  //   const { isAuthenticated } = useContext(AuthContext);
  //   return (
  //     <Route
  //       {...rest}
  //       element={
  //         isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
  //       }
  //     />
  //   );
  return <div>route</div>;
};

export default RouteGaurd;
