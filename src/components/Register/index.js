import React, {Component} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage,
    Alert,
    ScrollView,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import { strings } from "../../i18n";
import { registerAction, createDateData, validateEmail, firebaseAction } from "./RegisterActions";
import { APP_STORE } from "../../Store";
import styles from './style';
import { toastMsg, connection, internet, checkConectivity } from "../../utils";
import Picker from 'react-native-picker';
import validate from './validate_wrapper';
import firebase from 'react-native-firebase';

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        console.log("RegisterPage:constructor");
        this.state = {
            name: '',
            last: '',
            email: '',
            id: '',
            user: '',
            address: '',
            password: '',
            image: '',
            isLoading: false,
        };
    }

    static navigationOptions = {
        title: strings('main.register'),
    };

    componentDidMount() {
        console.log("RegisterPage:componentDidMount");

        this.event = APP_STORE.APP_EVENT.subscribe(state => {
            this.setState({isLoading: false});
            if (state.error) {
                Alert.alert(state.error);
            return;
            }
            if (state.success) {
                Alert.alert(
                    'Alerta',
                    'Usuario registrado exitosamente.',
                    [
                      {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                  )
            }
        });
    }

    userTerms() {
        this.props.navigation.navigate('Terms');
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
        Picker.hide();
        this.event.unsubscribe();
    }

    _registerUser() {
        console.log('RegisterUser');
        this.setState({isLoading: true});
        if (checkConectivity()) {
            registerAction(this.state)
        } else {
            internet();
        }
    }

    _registerCancel() {
        this.props.navigation.goBack();
    }

    _nextStep() {
        const emailError     = validate('Email', this.state.email);
        const full_nameError = validate('Name', this.state.name);
        const passwordError  = validate('Password', this.state.password);
        const userError  = validate('Username', this.state.user);
        const idError  = validate('id', this.state.id);
        const addressError  = validate('Address', this.state.address);
        const lastError  = validate('Lastname', this.state.last);

        if(full_nameError){
            toastMsg(full_nameError)
            return false
        }
        if(lastError){
            toastMsg(lastError)
            return false
        }
        if(userError){
            toastMsg(userError)
            return false
        }
        if(emailError){
            toastMsg(emailError)
            return false
        }
        if(idError){
            toastMsg(idError)
            return false
        }
        if(addressError){
            toastMsg(addressError)
            return false
        }
        if(passwordError){
            toastMsg(passwordError)
            return false
        }

        this._registerUser();

    }

    renderBy(body) {
        if (Platform.OS == 'android') {
            return (
                <ScrollView
                    style={styles.scrollContainer}
                    keyboardShouldPersistTaps={'always'}
                >
                <View style={styles.teclado}>
                  {body}
                </View>
             </ScrollView>
              );
          } else if (Platform.OS == 'ios') {
                return (
                    <KeyboardAvoidingView style={styles.scrollContainer} behavior="padding">
                        <View style={styles.teclado}>
                        {body}
                        </View>
                    </KeyboardAvoidingView>
                    );
        }
    }

    render() {
        const {isLoading, step, emailError, full_nameError, passwordError, image} = this.state;
        let body = <ActivityIndicator size="large" color="#3BBDA6"/>;
        if (!isLoading) {
            body = <View>
                <View style={{marginTop: 0}}>
                    <View
                    style={{
                        flex: 1,
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        zIndex:0,
                        top: -100,
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                    <Image
                        style={{
                        flex: 1,
                        resizeMode: 'cover',
                        width: 130,
                        height: 100,
                        }}
                        source={require('../../assets/img/userBG.png')}
                        />
                    </View>
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({name})}
                        placeholder={strings("register.name")}
                        returnKeyType = {"next"}
                        value={this.state.name}
                        onSubmitEditing={() => { this.last.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(last) => this.setState({last})}
                        placeholder={strings("register.lastName")}
                        returnKeyType = {"next"}
                        ref={(input) => { this.last = input; }}
                        value={this.state.last}
                        onSubmitEditing={() => { this.user.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(user) => this.setState({user})}
                        placeholder={strings("register.username")}
                        returnKeyType = {"next"}
                        ref={(input) => { this.user = input; }}
                        value={this.state.user}
                        onSubmitEditing={() => { this.emailInput.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}
                        placeholder={strings("register.email")}
                        ref={(input) => { this.emailInput = input; }}
                        returnKeyType = {"next"}
                        value={this.state.email}
                        onSubmitEditing={() => { this.id.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(id) => this.setState({id})}
                        placeholder={strings("register.id")}
                        returnKeyType = {"next"}
                        ref={(input) => { this.id = input; }}
                        value={this.state.id}
                        onSubmitEditing={() => { this.address.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(address) => this.setState({address})}
                        placeholder={strings("register.address")}
                        returnKeyType = {"next"}
                        ref={(input) => { this.address = input; }}
                        value={this.state.address}
                        onSubmitEditing={() => { this.passwordInput.focus(); }}
                        blurOnSubmit={false}
                    />
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({password})}
                        placeholder={strings("register.password")}
                        ref={(input) => { this.passwordInput = input; }}
                        returnKeyType = {"next"}
                        secureTextEntry={true}
                        value={this.state.password}
                        onSubmitEditing={() => { this._nextStep() }}
                        blurOnSubmit={false}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttomRegisterStyle}
                    onPress={this._nextStep.bind(this)}>
                    <Text style={styles.buttonText}> {strings("register.paso1")} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttomCancelStyle}
                    onPress={this._registerCancel.bind(this)}>
                    <Text style={styles.buttonTextCancel}> {strings("home.cancel")} </Text>
                </TouchableOpacity>
            </View>
        }
        return (
            <View style={styles.scrollContainer}>
                {this.renderBy(body)}
            </View>
        );
    }
}

export default RegisterPage;
