import * as types from '../constants/ActionTypes';

let initialState = {
    instructions: [],
}

const instructions = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_FEATURE_INSTRUCTIONS_BY_CATEGORY_ID:
            state.instructions = action.instructions;
            return { ...state };
        case types.GET_ALL_SETUP_INSTRUCTIONS_BY_CATEGORY_ID:
            state.instructions = action.instructions;
            return { ...state };
        default: return { ...state };
    }
}
export default instructions;