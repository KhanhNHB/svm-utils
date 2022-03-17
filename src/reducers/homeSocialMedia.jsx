import * as types from '../constants/ActionTypes';

let initialState = {
    homeSocialMedia: {},
}

const homeSocialMedia = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_HOME_SOCIAL_MEDIA:
            state.homeSocialMedia = action.homeSocialMedia;
            return { ...state };
        default: return { ...state };
    }
}
export default homeSocialMedia;