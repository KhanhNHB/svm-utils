import * as types from '../constants/ActionTypes';

let initialState = {
    homeVision: [],
    homeBanner: []
}

const homeVision = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_VISION:
            state.homeVision = action.homeVision;
            return { ...state };
        case types.GET_HOME_BANNER:
            state.homeBanner = action.homeBanner;
            return { ...state };
        default: return { ...state };
    }
}
export default homeVision;