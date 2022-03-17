import * as types from '../constants/ActionTypes';

let initialState = {
    homeFeature: {},
}

const homeFeature = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_FEATURE:
            state.homeFeature = action.homeFeature;
            return { ...state };
        default: return { ...state };
    }
}
export default homeFeature;