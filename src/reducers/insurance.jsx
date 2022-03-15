import * as types from '../constants/ActionTypes';

let initialState = {
    insurances: [],
    insurance: ''
}

const insurance = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_INSURANCE:
            state.insurances = action.insurances;
            return { ...state };
        case types.GET_INSURANCE_IS_ACTIVE:
            state.insurance = action.insurance;
            return { ...state };
        default: return { ...state };
    }
}
export default insurance;