import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {isValidText} from '../../utils/index'
import {userService} from './service';
import {AsyncStorage } from 'react-native';
import { authHeader, catchErrorAndPropagate , URL,LENGUAGE } from '../../utils';
import { AccessToken, LoginManager} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

function publicProfileAction(token, id) {
    console.log(`publicProfileAction: ${token}, ${id}`);

    userService.publicProfile(token, id)
        .then(async (response) => {
            console.log(`ProfileAction: ${token}, ${id}`, response);
            const json = await response.json();
            console.log(`ProfileAction:JSON:`, json);
            if (response.ok) {
                APP_STORE.PROFILE_EVENT.next({"profile": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function publicImages420Action(token, id, pageUrl) {
    console.log(`publicImages420Action: ${token}, ${id}, ${pageUrl}`);

    userService.publicImages420(token, id,pageUrl)
        .then(async (response) => {
            console.log(`publicImages420Action: ${token}, ${id}, ${pageUrl}`, response);
            const json = await response.json();
            console.log(`publicImages420Action:JSON:`, json);
            if (response.ok) {
                APP_STORE.PROFILEIMAGES_EVENT.next({"profileImages420": json.results});
                APP_STORE.PROFILEPAGE_EVENT.next({"profileImages420Page": json.next});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function Action420(token, state,userId) {

    console.log(`Action420: ${token}, ${state}, ${userId}`);

    var pagUrl = '';

    if (state.urlPage != '' && state.numPage > 0) {
        pagUrl = state.urlPage;
        publicImages420Action(token,pagUrl);

    } else if (state.numPage == 0){
        pagUrl = URL + 'public-image/' + userId + '/';
        publicImages420Action(token,pagUrl);
    }
}

function appendData(oldData, newData) {
    oldData.slice();

    newData.map((data) => { 
        oldData.push(data);
    });

    return oldData;
}

function getImages(data) {

    const _images = [];

    data.map((image) => {
      _images.push(image.image);
    });

    return _images;
}

export { publicProfileAction,getImages,publicImages420Action,appendData,Action420 };