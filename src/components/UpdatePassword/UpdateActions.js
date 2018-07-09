import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {AsyncStorage } from 'react-native';
import {userService} from './service';

function UpdateAction(oldPass,newPass) {

    userService.updatePassword(oldPass,newPass)
    .then(async (response) => {
        const json = await response.json();
        if (response.ok) {
            APP_STORE.APP_EVENT.next({"success": json});
            return;
        }
        APP_STORE.APP_EVENT.next({"error": json});
    });
}

export {UpdateAction};