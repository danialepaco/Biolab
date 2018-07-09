import React, {Component} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import {APP_STORE} from '../../Store';
import {UpdateAction} from './UpdateActions';
import styles from './style';
import {strings} from '../../i18n';
import {isValidText, toastMsg} from "../../utils";
import ValidationComponent from '../../utils/ValidationComponent';

class UpdatePage extends ValidationComponent {

    constructor() {
        super();
        console.log("Forgot:constructor");
        this.state = {
            oldPassword: '',
            password: '',
            confirmPassword: '',
            isLoading: false
        };
    }

    componentDidMount() {
        this.event = APP_STORE.APP_EVENT.subscribe(state => {
            console.log(state);
            if (state.error) {
              this.setState({isLoading: false});
              Alert.alert(state.error);
                return;
            }
            if (state.success) {
                this.props.navigation.goBack()
                return;
            }
        });
    }

    static navigationOptions = ({ navigation }) => {
        const {params} = navigation.state;
    
        return {
          title: strings('main.update'),
        };
      };

    componentWillUnmount() {
        console.log("Forgot:componentWillUnmount");
        this.event.unsubscribe();
    }

    _forgotCancel() {
        this.props.navigation.goBack();
    }

    _forgotSendPassword() {
        /*
        * Validating Form with rules
        */
        this.validate({
            oldPassword: {required: true, minlength:6, maxlength:20},
            password: {required: true, minlength:6, maxlength:20},
            confirmPassword: {required: true, minlength:6, maxlength:20}
        });
        if (this.state.password != this.state.confirmPassword) {
            toastMsg(strings('forgot.equal'))
        } else {
            if(this.isFormValid()){
                this.setState({isLoading: true});
                UpdateAction(this.state.oldPassword, this.state.password);
            }else{
                if(this.isFieldInError('oldPassword')){
                    this.getErrorsInField('oldPassword').map((result) => toastMsg(result))
                    return
                }
                if(this.isFieldInError('password')){
                    this.getErrorsInField('password').map((result) => toastMsg(result))
                    return
                }
                if(this.isFieldInError('confirmPassword')){
                    this.getErrorsInField('confirmPassword').map((result) => toastMsg(result))
                    return
                }
            }
        }
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                <View style={styles.teclado}>
                <Image
                    style={styles.container}
                    source={require('../../assets/img/logo_bio.png')}
                    style={[{width: null, height: 300}]}
                />
              <Text style={styles.textRecover}>
                    {strings('main.recover')}
                </Text>
                <ActivityIndicator size="large" color="#3BBDA6"/>
                </View>
            )
        } else {
            return (
                <ScrollView style={{backgroundColor: '#fff',}}>
                    <View style={styles.teclado}>
                        <Image
                            style={styles.container}
                            source={require('../../assets/img/logo_bio.png')}/>

                        <TextInput
                            style={styles.inputStyle}
                            editable={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(oldPassword) => this.setState({oldPassword})}
                            placeholder={strings('forgot.old')}
                            value={this.state.oldPassword}
                            returnKeyType = {"next"}
                            onSubmitEditing={() => { this.passwordInput.focus(); }}
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            editable={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({password})}
                            placeholder={strings('forgot.password')}
                            ref={(input) => { this.passwordInput = input; }}
                            returnKeyType = {"next"}
                            secureTextEntry={true}
                            onSubmitEditing={() => { this.confirmInput.focus(); }}
                            blurOnSubmit={false}
                            value={this.state.password}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            editable={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                            placeholder={strings('forgot.confirmPassword')}
                            ref={(input) => { this.confirmInput = input; }}
                            returnKeyType = {"next"}
                            secureTextEntry={true}
                            onSubmitEditing={() =>  this._forgotSendPassword() }
                            blurOnSubmit={false}
                            value={this.state.confirmPassword}
                        />

                        <TouchableOpacity
                            style={styles.buttomLoginStyle}
                            onPress={this._forgotSendPassword.bind(this)}>
                            <Text style={styles.buttonText}>{strings('forgot.send')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttomCancelStyle}
                            onPress={this._forgotCancel.bind(this)}>
                            <Text style={styles.buttonTextCancel}> {strings("home.cancel")} </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            );
        }
    }
}

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_WIDTH = window.width;
export default UpdatePage;
