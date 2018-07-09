import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {AsyncStorage } from 'react-native';
import {userService} from './service';

function publicEditAction(token) {
    console.log(`publicEditProfileAction: ${token}`);

    userService.publicProfile(token)
        .then(async (response) => {
            console.log(`publicEditProfileAction: ${token}`, response);
            const json = await response.json();
            console.log(`publicEditProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLICEDITPROFILE_EVENT.next({"publicEditProfile": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function saveProfileAction(token, state) {
    console.log(`saveProfile: ${token}, ${state}`);

    userService.saveProfile(token, state.id, state)
        .then(async (response) => {
            console.log(`publicSaveProfileAction: ${token}, ${state}`, response);
            const json = await response.json();
            console.log(`publicSaveProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PUBLIC_SAVE_PROFILE_EVENT.next({"saveProfile": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function logOut() {
    console.log(`logOut`);
    userService.logOut(APP_STORE.getToken())
    .then(async (response) => {
        const json = await response.json();
        if (response.ok) {
            AsyncStorage.removeItem('token');
            APP_STORE.APP_EVENT.next({"success": json});
            return;
        }
        APP_STORE.APP_EVENT.next({"error": json});
    });
}

export {publicEditAction, saveProfileAction,logOut};