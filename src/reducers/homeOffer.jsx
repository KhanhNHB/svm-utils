import * as types from '../constants/ActionTypes';

let initialState = {
    homeOffer: {},
}

const homeOffer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_OFFER:
            state.homeOffer = action.homeOffer;
            return { ...state };
        default: return { ...state };
    }
}
export default homeOffer;