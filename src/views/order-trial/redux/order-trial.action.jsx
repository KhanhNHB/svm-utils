import api from '../../../api/API'
import {
  ORDER_TRIAL_GET_ALL_ENDPOINT } from '../../../api/endpoint';

export const SET_ORDER_TRIALS = 'SET_ORDER_TRIALS';

// ----------------------------------------------------------------------------------------------------
// process set state


export function setOrderTrials(orders) {
    return {
      type: SET_ORDER_TRIALS,
      payload: orders,
    };
}


// ----------------------------------------------------------------------------------------------------
// process load from server

export function loadOrderTrials() {
  return dispatch => {
    const response = api.get(`${ORDER_TRIAL_GET_ALL_ENDPOINT}`);
     response.then(res => {
      if (res.ok) {
        const fetchData = res.json();
        fetchData.then(data => {
             dispatch(setOrderTrials(data));
        })
      }
    })

    }
};


