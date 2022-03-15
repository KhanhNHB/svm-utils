import * as Actions from './dealer.action';

const initialState = {
    dealers: [],
    dealer: {},
    features: [],
    feature: {},
    images: [],
    image: {},
    dealerModalStatus: 'add',
    currentDealerId: 0,

};
const dealer = (state = initialState, {type, payload}) => {
  switch (type) {
    case Actions.SET_DEALER: {
      return {
        ...state,
        dealer: payload
      };
    }
    case Actions.SET_DEALERS: {
      return {
        ...state,
        dealers: payload,
      };
    }
   case Actions.SET_DEALER_ID: {
     return {
       ...state,
       currentDealerId: payload,
     };
   }
   case Actions.SET_STATUS_DEALER_MODAL: {
     return {
       ...state,
       dealerModalStatus: payload,
     };
   }

    default:
      return state;
  }
};





export default dealer;
