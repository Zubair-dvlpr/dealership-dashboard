// Library Imports

import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticatedUser } from '../utils/utils';

// Local Imports

const PrivateRoutes = () => {
  return useIsAuthenticatedUser() ? <Outlet /> : <Navigate to='/login' />;
  // return useIsAuthenticatedUser() ? <Outlet /> : <Outlet />;
};

export default PrivateRoutes;
