import api from '../../../api/API'
import {
  ORDER_GET_ALL_ENDPOINT } from '../../../api/endpoint';

export const SET_ORDERS = 'SET_ORDERS';

// ----------------------------------------------------------------------------------------------------
// process set state


export function setOrders(orders) {
    return {
      type: SET_ORDERS,
      payload: orders,
    };
}


// ----------------------------------------------------------------------------------------------------
// process load from server

export function loadOrders() {
  return dispatch => {
    const response = api.get(`${ORDER_GET_ALL_ENDPOINT}`);
     response.then(res => {
      if (res.ok) {
        const fetchData = res.json();
        fetchData.then(data => {
            console.log(data)
             dispatch(setOrders(data));
        })
      }
    })

    }
};


