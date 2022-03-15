import * as Actions from './order-trial.action';

const initialState = {
    orderTrials: []

};
const orderTrial = (state = initialState, {type, payload}) => {
  switch (type) {
    case Actions.SET_ORDER_TRIALS: {
      return {
        ...state,
        orderTrials: payload,
      };
    }

    default:
      return state;
  }
};





export default orderTrial;
