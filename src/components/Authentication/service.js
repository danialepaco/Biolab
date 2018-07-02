import { URL ,LENGUAGE,authHeader} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    facebookHandle,
    tokenFB
};

/**
 * Login/Register facebook action
 * @param token The facebook access token
 * @param state The state of the current screen
 * @returns {Promise<any>}
 */
function facebookHandle(token,state) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': LENGUAGE
      },
      body: JSON.stringify({
        "access_token": token,
        "latitud":state.latitud,
        "longitud":state.longitud
      })
    }
    return fetch(URL + 'login-facebook/', requestOptions);
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