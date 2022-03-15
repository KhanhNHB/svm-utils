import * as Actions from './order.action';

const initialState = {
    orders: []

};
const order = (state = initialState, {type, payload}) => {
  switch (type) {
    case Actions.SET_ORDERS: {
      return {
        ...state,
        orders: payload,
      };
    }

    default:
      return state;
  }
};





export default order;
