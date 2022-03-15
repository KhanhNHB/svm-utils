import api from '../../../api/API' 
import { 
  DEALDER_ENDPOINT,
  DEALDER_GET_ALL_ENDPOINT,
  DEALDER_GET_BY_ID_ENDPOINT} from '../../../api/endpoint';

export const SET_DEALER = 'SET_DEALER';
export const SET_DEALERS = 'SET_DEALERS';
export const SET_DEALER_ID = 'SET_DEALER_ID';

export const SET_BUTTON_STATUS = 'SET_BUTTON_STATUS';
export const SET_STATUS_DEALER_MODAL = 'SET_STATUS_DEALER_MODAL';



// ----------------------------------------------------------------------------------------------------
// process set state

export function setDealerId(id) {
  return {
    type: SET_DEALER_ID,
    payload: id,
  };
}

export function setDealers(dealers) {
    return {
      type: SET_DEALERS,
      payload: dealers,
    };
}
export function setDealer(dealer) {
    return {
      type: SET_DEALER,
      payload: dealer,
    };
}
export function setStatusModal(status) {
    return {
      type: SET_STATUS_DEALER_MODAL,
      payload: status,
    };
}
// ----------------------------------------------------------------------------------------------------
// process load from server

export function loadDealers() {
  return dispatch => {
    const response = api.get(`${DEALDER_GET_ALL_ENDPOINT}`);
     response.then(res => {
      if (res.ok) {
        const fetchData = res.json();
        fetchData.then(data => {
             dispatch(setDealers(data.content));
        })
      }
    })
      
    }
};

export function loadDealer(id) {
  return dispatch => {
    const response = api.get(`${DEALDER_GET_BY_ID_ENDPOINT}/${id}`);
     response.then(res => {
      if (res.ok) {
        const fetchData = res.json();
        fetchData.then(data => {
             dispatch(setDealer(data));
        })
      }
    })

    }
};

export function updateDealer(dealer) {
return dispatch => {
    const request = api.post(DEALDER_ENDPOINT, dealer);
    request.then(response => {
      if (response.ok) {
        const fetchData = response.json();
        fetchData.then(data => {
          dispatch(loadDealers());
          alert('Cập nhật thành công!')
        })
      }
    })
  }
}
  
export function deleteDealer(id) {
  return dispatch => {
    const response = api.delete(`${DEALDER_GET_BY_ID_ENDPOINT}/${id}`);
     response.then(res => {
      if (res.ok) {
        dispatch(loadDealers());
      }
    })

    }
};



