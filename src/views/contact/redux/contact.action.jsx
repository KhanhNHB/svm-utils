import api from '../../../api/API'
import {
  CONTACT_GET_ALL_ENDPOINT } from '../../../api/endpoint';

export const SET_CONTACTS = 'SET_DEALERS';

// ----------------------------------------------------------------------------------------------------
// process set state


export function setContacts(contacts) {
    return {
      type: SET_CONTACTS,
      payload: contacts,
    };
}


// ----------------------------------------------------------------------------------------------------
// process load from server

export function loadContacts() {
  return dispatch => {
    const response = api.get(`${CONTACT_GET_ALL_ENDPOINT}`);
     response.then(res => {
      if (res.ok) {
        const fetchData = res.json();
        fetchData.then(data => {
          console.log(data)
             dispatch(setContacts(data));
        })
      }
    })

    }
};



