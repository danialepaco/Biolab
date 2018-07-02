import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import moment from 'moment';
import {userService} from './service';
import DeviceInfo from 'react-native-device-info';

function getChat() {

    userService.chatService(APP_STORE.getToken())
        .then(async (response) => {
            const json = await response.json();
            console.log(`getChat:JSON:`, json);
            if (response.ok) {
                APP_STORE.CHAT_EVENT.next({"chats": json});
                return;
            }
            APP_STORE.APP_EVENT.next({"error": json.detail});
        });
}

function getImages(data) {

    const _images = [];

    data.map((image) => {
      _images.push(image.image);
    });

    return _images;
}

function calculateTime(rowData) {
    var start = moment(rowData.time).tz(DeviceInfo.getTimezone());
    var end = moment();

    // var minutes = parseInt(moment.duration(end.diff(start)).asMinutes());

    // if (minutes < 60) {
    //     return minutes + ' m'
    // }

    // var hours = parseInt(moment.duration(end.diff(start)).asHours());

    // if (hours < 24) {
    //     return hours + ' h'
    // }

    // var day = parseInt(moment.duration(end.diff(start)).asDays());

    // if (day < 31) {
    //     return day + ' d'
    // }

    return moment(rowData.time).tz(DeviceInfo.getTimezone()).format('MMMM DD, YYYY')

}

export { getChat,getImages,calculateTime };