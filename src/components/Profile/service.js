import {authHeader, catchErrorAndPropagate , URL} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    publicProfile,
    publicImages420,
    tokenFB,
    logOut
};

/**
 * Get the user's profile data
 * @param token The token of the current user's sesion
 * @param id The id of the user
 * @returns {Promise<any>}
 */
function publicProfile(token, id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };

    return fetch(URL + 'accounts/' + id + '/', requestOptions);
}

/**
 * Get the user's profile data
 * @param token The token of the current user's sesion
 * @param pageUrl The Url of the page to fetch
 * @returns {Promise<any>}
 */
function publicImages420(token,pageUrl) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(token)
    };
    return fetch(pageUrl, requestOptions);
}

/**
 * Upload the user token
 * @param token The token of firebase
 * @returns {Promise<any>}
 */
function tokenFB(token) {

    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(APP_STORE.getToken()),
    };
    return fetch(URL + 'device/' + APP_STORE.getIdFB() + '/', requestOptions);
}

function logOut() {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(APP_STORE.getToken())
    };

    return fetch(URL + 'logout/', requestOptions);
}