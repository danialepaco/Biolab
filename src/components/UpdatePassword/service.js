import {authHeader, catchErrorAndPropagate , URL ,LENGUAGE} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    updatePassword,
};

/**
 * Update user's password
 * @param oldPass The old password
 * @param newPass The new password
 * @returns {Promise<any>}
 */
function updatePassword(oldPass, newPass){
    const requestOptions = {
      method: 'POST',
      headers: authHeader(APP_STORE.getToken()),
      body: JSON.stringify({"old_password": oldPass, "new_password": newPass})
    }
    return fetch(URL + 'accounts/change_password/', requestOptions);
}