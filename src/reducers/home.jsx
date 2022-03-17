import * as types from '../constants/ActionTypes';

let initialState = {
    home: {},
}

const home = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME:
            state.home = action.home;
            return { ...state };
        default: return { ...state };
    }
}
export default home;