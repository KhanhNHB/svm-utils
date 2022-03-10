import * as types from '../constants/ActionTypes';

export const actSignIn = (userToken) => {
    return {
        type: types.SIGN_IN,
        userToken,
    };
};

export const actGetAllInsurance = (insurances) => {
    return {
        type: types.GET_ALL_INSURANCE,
        insurances,
    }
};

export const actGetInsuranceIsActive = (insurance) => {
    return {
        type: types.GET_INSURANCE_IS_ACTIVE,
        insurance,
    }
};

export const actGetAllShipper = (shippers) => {
    return {
        type: types.GET_ALL_SHIPPERS,
        shippers,
    }
};

export const actCreateShipper = (shipper) => {
    return {
        type: types.CREATE_SUCCESSFULLY,
        shipper,
    }
};

export const actGetListHub = (listHubs) => {
    return {
        type: types.LIST_HUB,
        listHubs,
    }
};
export const actCreateHub = (hub) => {
    return {
        type: types.CREATE_HUB,
        hub,
    }
};
export const actLoadProvider = (providers) => {
    return {
        type: types.LOAD_PROVIDER,
        providers,
    }
};

export const actLoadProviderName = (provider_name) => {
    return {
        type: types.LOAD_PROVIDER_NAME,
        provider_name,
    }
};

export const actLoadProducts = (products) => {
    return {
        type: types.LOAD_PRODUCTS,
        products,
    }
};

export const actChangeKeyword = (keyword) => {
    return {
        type: types.CHANGE_KEYWORD,
        keyword,
    }
};

export const actLoadproductList = (productList) => {
    return {
        type: types.LOAD_PRODUCT_LIST,
        productList,
    }
};

export const actLoadProfile = (profile) => {
    return {
        type: types.LOAD_PROFILE,
        profile
    }
};

export const actLoadShipper = (shippers) => {
    return {
        type: types.LOAD_SHIPPER,
        shippers,
    }
};

export const actLoadFeature = (feature) => {
    return {
        type: types.LOAD_FEATURE,
        feature,
    }
};

export const actLoadAssignHubStatus = (selectAssignHubStatus) => {
    return {
        type: types.CHANGE_ASSIGN_HUB_STATUS,
        selectAssignHubStatus,
    }
};

export const actLoadAssignOrderToShipperStatus = (selectAssignOrderToShipperStatus) => {
    return {
        type: types.CHANGE_ASSIGN_ORDER_TO_SHIPPER_STATUS,
        selectAssignOrderToShipperStatus,
    }
};
