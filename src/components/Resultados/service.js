import {authHeader, catchErrorAndPropagate , URL} from '../../utils';
import DeviceInfo from 'react-native-device-info';
import {APP_STORE} from "../../Store";

export const userService = {
    results,
};

function results(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(APP_STORE.getToken())
    };

    return fetch(URL + 'bills/' + id + '/related_results/', requestOptions);
}