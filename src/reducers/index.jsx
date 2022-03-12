import { combineReducers } from 'redux';
import user from './users';
import shippers from './shippers';
import hub from './hub';
import providers from './providers';
import product from '../views/product/ProductListView/redux/product.reducer';
import profile from './profile';
import CreateHub from './createhub';
import shipper from './shipper';
import feature from "./feature";
import assignHubStatus from './assignHubStatus';
import assignOrderToShipperStatus from './assignOrderToShipperStatus';

const appReducers = combineReducers({
        user,
        shippers,
        hub,
        providers,
        product, 
        profile,
        CreateHub,
        shipper,
        feature,
        assignHubStatus,
        assignOrderToShipperStatus
});
export default appReducers;