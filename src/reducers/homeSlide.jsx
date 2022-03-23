import * as types from '../constants/ActionTypes';

let initialState = {
    homeSlide: [],
}

const homeSlide = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_SLIDE:
            state.homeSlide = action.homeSlide;
            return { ...state };
        default: return { ...state };
    }
}
export default homeSlide;