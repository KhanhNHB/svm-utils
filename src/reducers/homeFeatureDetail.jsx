import * as types from '../constants/ActionTypes';

let initialState = {
    homeFeatureDetail: [],
}

const homeFeatureDetail = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_FEATURE_DETAIL:
            state.homeFeatureDetail = action.homeFeatureDetail;
            return { ...state };
        default: return { ...state };
    }
}
export default homeFeatureDetail;