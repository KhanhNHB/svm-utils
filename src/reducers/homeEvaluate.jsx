import * as types from '../constants/ActionTypes';

let initialState = {
    homeEvaluate: {},
}

const homeEvaluate = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_EVALUATE:
            state.homeEvaluate = action.homeEvaluate;
            return { ...state };
        default: return { ...state };
    }
}
export default homeEvaluate;