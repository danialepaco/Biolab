import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText, toastMsg} from "../../utils";
import {userService} from './service';

function forgotAction(email) {
    console.log(`forgotAction: ${email}`);
    userService.forgotPassword(email)
        .then(async (response) => {
            console.log(`forgotAction: ${email}`, response);
            const json = await response.json();
            console.log(`forgotAction:JSON:`, json);

            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json});
    });
}

function recoveryPassword(code, password){
    console.log(`recoveryPassword: ${code} ${password}`);

    userService.recoveryPassword(code, password)
        .then(async (response) => {
            console.log(`forgotAction: ${code}`, response);
            const json = await response.json();
            console.log(`forgotAction:JSON:`, json);

            if (response.ok) {
                APP_STORE.APP_EVENT.next({"success": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json});
    });
}

export {forgotAction, recoveryPassword};
