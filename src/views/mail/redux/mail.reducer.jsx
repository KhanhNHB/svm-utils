import * as Actions from './mail.action';

const initialState = {
    emails: [],
    content: '',
    success: [],
    failed: []

};
const email = (state = initialState, {type, payload}) => {
    switch (type) {
        case Actions.SET_EMAILS: {
            return {
                ...state,
                emails: payload,
            };
        }
        case Actions.SET_FAILED: {
            return {
                ...state,
                failed: payload,
            };
        }
        case Actions.SET_SUCCESSES: {
            return {
                ...state,
                success: payload,
            };
        }
        default:
            return state;
    }
};


export default email;
