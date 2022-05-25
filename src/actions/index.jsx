import * as types from '../constants/ActionTypes';

export const actSignIn = (userToken) => {
    return {
        type: types.SIGN_IN,
        userToken,
    };
};

export const actGetAllOnwerInsurance = (insurances) => {
    return {
        type: types.GET_ALL_ONWER_INSURANCE,
        insurances,
    }
};

export const actGetAllDealerInsurance = (insurances) => {
    return {
        type: types.GET_ALL_DEALER_INSURANCE,
        insurances,
    }
};

export const actGetHome = (home) => {
    return {
        type: types.GET_HOME,
        home,
    }
};

export const actGetHomeSlide = (homeSlide) => {
    return {
        type: types.GET_HOME_SLIDE,
        homeSlide,
    }
};

export const actGetHomeVision = (homeVision) => {
    return {
        type: types.GET_HOME_VISION,
        homeVision,
    }
};

export const actGetHomeBanner = (homeBanner) => {
    return {
        type: types.GET_HOME_BANNER,
        homeBanner,
    }
};

export const actGetHomeFeature = (homeFeature) => {
    return {
        type: types.GET_HOME_FEATURE,
        homeFeature,
    }
};

export const actGetHomeSocialMedia = (homeSocialMedia) => {
    return {
        type: types.GET_HOME_SOCIAL_MEDIA,
        homeSocialMedia,
    }
};

export const actGetHomeFeatureDetail = (homeFeatureDetail) => {
    return {
        type: types.GET_HOME_FEATURE_DETAIL,
        homeFeatureDetail,
    }
};

export const actGetHomeEvaluate = (homeEvaluate) => {
    return {
        type: types.GET_HOME_EVALUATE,
        homeEvaluate,
    }
};

export const actGetHomeOffer = (homeOffer) => {
    return {
        type: types.GET_HOME_OFFER,
        homeOffer,
    }
};

export const actGetAllFeatureInstructionsByCategoryId = (instructions) => {
    return {
        type: types.GET_ALL_FEATURE_INSTRUCTIONS_BY_CATEGORY_ID,
        instructions,
    }
};

export const actGetAllSetupInstructionsByCategoryId = (instructions) => {
    return {
        type: types.GET_ALL_SETUP_INSTRUCTIONS_BY_CATEGORY_ID,
        instructions,
    }
};

export const actGetAllDiscountNewsByCategoryId = (news) => {
    return {
        type: types.GET_ALL_DISCOUNT_NEWS_BY_CATEGORY_ID,
        news,
    }
};

export const actGetAllProductNewsByCategoryId = (news) => {
    return {
        type: types.GET_ALL_PRODUCT_NEWS_BY_CATEGORY_ID,
        news,
    }
};

export const actGetAllEventNewsByCategoryId = (news) => {
    return {
        type: types.GET_ALL_EVENT_NEWS_BY_CATEGORY_ID,
        news,
    }
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
