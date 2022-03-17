import * as types from '../constants/ActionTypes';

let initialState = {
    homeVision: [],
}

const homeVision = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_VISION:
            state.homeVision = action.homeVision;
            return { ...state };
        default: return { ...state };
    }
}
export default homeVision;