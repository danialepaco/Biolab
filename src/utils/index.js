/**
 * Check is the text is a valid input
 * @param {string} text The text to be tested
 */
import React, {Component} from 'react';
import {
    Platform,
    NetInfo,
    Alert,
    AsyncStorage
} from 'react-native';
import {strings} from '../i18n';
import {APP_STATE} from "../Store";
import I18n from 'react-native-i18n';
import Toast from 'react-native-toast-native';
/**
 * Detects the lenguange and keeps in constant
 */
const LENGUAGE = I18n.currentLocale().slice(0,2);
// const URL = "https://dev-api.weedmatch.cl/";
// const URL = "https://smarthlab.herokuapp.com/";
const URL = "http://192.168.0.114:8000/";

async function checkConectivity() {
    let response = await NetInfo.isConnected.fetch()
    return response
}

function internet() {
    return Alert.alert(strings("main.internet"));
}

function isValidText(text) {
    if (text == null) {
        return false;
    }
    if (typeof(text) === undefined) {
        return false;
    }
    if (text === "") {
        return false;
    }
    return true
}

/**
 * Headers for Authorization
 * LENGUAGE this cellphone
 * @param {string} token The token to be used
 */
function authHeader(token) {
    return {
        'Authorization': 'Bearer ' + token,
        'Accept-Language': LENGUAGE,
        'Content-Type': 'application/json',
    }
}

/**
 * Headers for Authorization
 * LENGUAGE this cellphone
 * @param {string} token The token to be used
 */
function authHeaderForm(token) {
    return {
        'Authorization': 'Bearer ' + token,
        'Accept-Language': LENGUAGE,
        'Content-Type': 'multipart/form-data'
    }
}

/**
 * Propagate an Error in to the
 * @param {Error} err error to be propagated
 * @throws {Error} the error that receives
 */
function catchErrorAndPropagate(err) {
    APP_STATE.next({error: String(err)});
    throw err;
}

function toastMsg(msg){
    Toast.show(msg, Toast.SHORT, Toast.BOTTOM, style);
}

export {isValidText, authHeader, catchErrorAndPropagate, toastMsg, internet,authHeaderForm, URL, LENGUAGE, checkConectivity }


const style={
    backgroundColor: "#333333",
    width: 300,
    height: Platform.OS === ("ios") ? 50 : 130,
    color: "#ffffff",
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 12,
    borderRadius: Platform.OS === ("ios") ? 25 : 55,
    fontWeight: "normal",
    yOffset: 60
};
