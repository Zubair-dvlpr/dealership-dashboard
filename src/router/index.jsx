// Library Imports
import React, { Fragment } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Local Imports
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useIsAuthenticatedUser } from '../utils/utils';
import { privateRoutes, publicRoutes } from './config';
import Layout from '../components/Layout';

const Router = () => {
  return (
    <Fragment>
      <Routes>
        <Route
          path='*'
          element={
            useIsAuthenticatedUser() ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
          }
        />
        <Route element={<PrivateRoutes />}>
          {privateRoutes?.map((route, index) =>
            route.child ? (
              route?.child?.map((childRoute, index) => (
                <>
                  <Route path={route.path} element={<Layout>{route.element}</Layout>} key={index} />
                  <Route
                    path={childRoute.path}
                    element={<Layout>{childRoute.element}</Layout>}
                    key={index}
                  />
                </>
              ))
            ) : (
              <Route path={route.path} element={<Layout>{route.element}</Layout>} key={index} />
            )
          )}
        </Route>
        <Route element={<PublicRoutes />}>
          {publicRoutes?.map((route, index) => {
            return <Route path={route.path} element={route.element} key={index} />;
          })}
        </Route>
      </Routes>
    </Fragment>
  );
};

export default Router;
