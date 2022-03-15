import * as Actions from './contact.action';

const initialState = {
    contacts: [],
    contact: {},

};
const contact = (state = initialState, {type, payload}) => {
  switch (type) {
    case Actions.SET_CONTACTS: {
      return {
        ...state,
        contacts: payload,
      };
    }
    default:
      return state;
  }
};





export default contact;
