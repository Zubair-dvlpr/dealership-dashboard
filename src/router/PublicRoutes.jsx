// Library Imports
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useIsAuthenticatedUser } from '../utils/utils';

//Local Imports

const PublicRoutes = () => {
  return useIsAuthenticatedUser() ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default PublicRoutes;
