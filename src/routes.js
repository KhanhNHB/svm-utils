import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout/index';
import ShipperListView from './views/shipper/ShipperListView/index';
import LoginView from './views/auth/LoginView';
import ShippingArea from './views/hub';
import Feature from './views/feature';
import Products from './views/product/ProductListView';
import Home from './views/home/Home';
import Insurance from './views/insurance/InsuranceListView';

const routes = [
  {
    path: 'app',
    element: <LoginView />,
    element: <DashboardLayout />,
    children: [
      { path: 'san-pham', element: <Products /> },
      { path: 'tinh-nang', element: <Feature /> },
      // { path: 'lap-dat', element: <HubManager /> },
      // { path: 'lien-he', element: <HubManager /> },
      { path: 'bao-hanh', element: <Insurance /> },
      // { path: 'dai-ly', element: <HubManager /> },
      { path: 'tin-khuyen-mai', element: <ShipperListView /> },
      { path: 'tin-san-pham', element: <ShippingArea /> },
      { path: 'tin-su-kien', element: <Products /> },
      { path: '', element: <Home /> },
    ]
  },
  {
    path: '/',
    exact: true,
    element: <LoginView />,
    children: [
      { path: '/', element: <Navigate to="/app" /> },
    ]
  },
];

export default routes;
