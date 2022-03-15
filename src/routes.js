import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout/index';
import ShipperListView from './views/shipper/ShipperListView/index';
import LoginView from './views/auth/LoginView';
import ShippingArea from './views/hub';
import Feature from './views/feature';
import Home from './views/home/Home';
import Products from './views/product/ProductListView/Products';
import Dealer from './views/dealer/Dealer';
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
      { path: 'he-thong-dai-ly', element: <Dealer /> },
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
