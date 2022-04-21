import api from "../../../api/API";
import {
    GET_AL_NOTIFICATION_EMAILS } from '../../../api/endpoint';

export const SET_FAILED = 'SET_FAILED';
export const SET_SUCCESSES = 'SET_SUCCESSES';
export const SET_EMAILS = 'SET_EMAILS'


export function setEmails(emails) {
    return {
        type: SET_EMAILS,
        payload: emails,
    };
}
export function setSuccess(success) {
    return {
        type: SET_SUCCESSES,
        payload: success,
    };
}
export function setFailed(failed) {
    return {
        type: SET_FAILED,
        payload: failed,
    };
}


export function addSuccess(list, success) {
    const listResult = [...list]
    listResult.push(success)
    return dispatch => {  dispatch(setSuccess(listResult));}
}

export function addFailed(list, failed) {
    const listResult = [...list]
    listResult.push(failed)
    return dispatch => {  dispatch(setFailed(listResult));}
}
export function loadEmails() {
    return dispatch => {
        const request = api.get(`${GET_AL_NOTIFICATION_EMAILS}`);
        request.then(response => {
            if (response.ok) {
                const fetchData = response.json();
                console.log(fetchData)

                fetchData.then(data => {
                    console.log(data)
                    dispatch(setEmails(data));
                })
            }
        })
    }
}
