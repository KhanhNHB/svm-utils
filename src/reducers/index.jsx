import { combineReducers } from 'redux';
import user from './users';
import shippers from './shippers';
import hub from './hub';
import providers from './providers';
import profile from './profile';
import CreateHub from './createhub';
import shipper from './shipper';
import feature from "./feature";
import assignHubStatus from './assignHubStatus';
import assignOrderToShipperStatus from './assignOrderToShipperStatus';

import insurance from './insurance';
import news from './news';
import instructions from "./instructions";
import home from "./home";
import homeSlide from './homeSlide';
import homeVision from "./homeVision";
import homeFeature from "./homeFeature";
import homeFeatureDetail from "./homeFeatureDetail";
import homeEvaluate from "./homeEvaluate";
import homeSocialMedia from "./homeSocialMedia";
import homeOffer from "./homeOffer";

import product from '../views/product/ProductListView/redux/product.reducer';
import contact from '../views/contact/redux/contact.reducer';
import order from '../views/order/redux/order.reducer';
import orderTrial from '../views/order-trial/redux/order-trial.reducer';
import dealer from '../views/dealer/redux/dealer.reducer';

const appReducers = combineReducers({
        user,
        home,
        homeSlide,
        homeVision,
        homeFeature,
        homeFeatureDetail,
        homeEvaluate,
        homeSocialMedia,
        homeOffer,
        news,
        instructions,
        shippers,
        hub,
        providers,
        product,
        dealer,
        contact,
        order,
        orderTrial,
        profile,
        CreateHub,
        shipper,
        insurance,
        feature,
        assignHubStatus,
        assignOrderToShipperStatus
});

export default appReducers;