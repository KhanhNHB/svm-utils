import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout/index';
import ShipperListView from './views/shipper/ShipperListView/index';
import LoginView from './views/auth/LoginView';
import ShippingArea from './views/hub';
import Home from './views/home/Home';
import Products from './views/product/ProductListView/Products';
import Dealer from './views/dealer/Dealer';
import Insurance from './views/insurance/InsuranceListView';
import Contact from './views/contact/Contact';
import Order from './views/order/Order';
import OrderTrial from './views/order-trial/OrderTrial';
import DiscountNewListView from './views/news/DiscountNew';
import EventNewListView from './views/news/EventNew';
import ProductNewListView from "./views/news/ProductNew";
import DealerView from './views/insurance/Dealer';
import FeatureView from './views/instructions/Feature';
import SetupView from './views/instructions/Setup';
import Setting from './views/setting/Setting';

const routes = [
  {
    path: 'app',
    element: <LoginView />,
    element: <DashboardLayout />,
    children: [
      { path: 'san-pham', element: <Products /> },
      { path: 'tinh-nang', element: <FeatureView /> },
      { path: 'lap-dat', element: <SetupView /> },
      { path: 'chinh-sach-dai-ly', element: <DealerView /> },
      { path: 'bao-hanh', element: <Insurance /> },
      { path: 'tin-khuyen-mai', element: <DiscountNewListView /> },
      { path: 'tin-san-pham', element: <ProductNewListView /> },
      { path: 'tin-su-kien', element: <EventNewListView /> },
      { path: 'he-thong-dai-ly', element: <Dealer /> },
      { path: 'lien-he', element: <Contact /> },
      { path: 'dat-hang', element: <Order /> },
      { path: 'dang-ky-dung-thu', element: <OrderTrial /> },
      { path: 'setting', element: <Setting /> },
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
