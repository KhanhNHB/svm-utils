import * as types from '../constants/ActionTypes';

let initialState = {
    listFeature: [],
}

const feature = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_FEATURE:
            state.listFeature = action.feature;
            return { ...state };
        default: return { ...state };
    }
}
export default feature;