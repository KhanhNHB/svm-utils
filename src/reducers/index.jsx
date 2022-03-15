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

import product from '../views/product/ProductListView/redux/product.reducer';
import contact from '../views/contact/redux/contact.reducer';
import order from '../views/order/redux/order.reducer';
import orderTrial from '../views/order-trial/redux/order-trial.reducer';
import dealer from '../views/dealer/redux/dealer.reducer'

const appReducers = combineReducers({
        user,
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