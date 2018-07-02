import {authHeader , URL} from '../../utils';
import {APP_STORE} from "../../Store";

export const userService = {
    postRegister,
    tokenFB
};

/**
 * Register the user
 * @param data The data of the user to register
 * @returns {Promise<any>}
 */
function postRegister(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
        'Content-Type': 'multipart/form-data',
        },
        body: data
    };

    console.log(requestOptions)

    return fetch(URL + 'signup/', requestOptions)
}

/**
 * Upload the user token
 * @param token The token of firebase
 * @returns {Promise<any>}
 */
function tokenFB(token) {

    const requestOptions = {
        method: 'POST',
        headers: authHeader(APP_STORE.getToken()),
        body: JSON.stringify({
            "registration_id": token,
        })
    };
    return fetch(URL + 'device/', requestOptions);
}