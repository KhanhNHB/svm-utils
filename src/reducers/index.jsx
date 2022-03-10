import { combineReducers } from 'redux';
import user from './users';
import shippers from './shippers';
import hub from './hub';
import providers from './providers';
import product from './product';
import profile from './profile';
import CreateHub from './createhub';
import shipper from './shipper';
import feature from "./feature";
import assignHubStatus from './assignHubStatus';
import assignOrderToShipperStatus from './assignOrderToShipperStatus';
import insurance from './insurance';

const appReducers = combineReducers({
        user,
        shippers,
        hub,
        providers,
        product,
        profile,
        CreateHub,
        shipper,
        insurance,
        feature,
        assignHubStatus,
        assignOrderToShipperStatus
});
export default appReducers;