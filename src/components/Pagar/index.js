import React, {Component} from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    AsyncStorage,
    Alert,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { strings } from "../../i18n";
// import { registerAction, } from "./RegisterActions";
import { APP_STORE } from "../../Store";
import styles from './style';
import {authHeader , URL,authHeaderForm, toastMsg} from '../../utils';
import { internet, checkConectivity } from "../../utils";
import { Picker } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

class Pagar extends Component {

    constructor(props) {
        super(props);
        console.log("Pagar:constructor");
        this.state = {
            code: '',
            price: '',
            image: '',
            isLoading: false,

            
            selected1: 0,
            results: []
        };
    }

    onValueChange (value = string) {
        this.setState({
            selected1 : value
        });
    }

    static navigationOptions = {
        title: strings('main.paid'),
    };

    componentDidMount() {
        console.log("RegisterPage:componentDidMount");
        this.getBanks()

        this.setState({price:this.getPrice()})
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
    }

    _registerUser() {
        console.log('RegisterUser');
        this.setState({isLoading: true});
        if (checkConectivity()) {

            var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(this.state.image)[1];
        
            const data = new FormData();
        
            data.append('capture', {
                uri: this.state.image,
                type: 'image/' + ext,
                name: 'photo.' + ext
            });
            data.append('reference_code', this.state.code);
            data.append('bank_id', this.state.selected1);

            const requestOptions = {
                method: 'POST',
                headers: authHeaderForm(APP_STORE.getToken()),
                body: data
            };

            console.log(URL + 'bill/' + this.getBillID() + '/pay_bill/')
                
            fetch(URL + 'bills/' + this.getBillID() + '/pay_bill/', requestOptions)
                .then(async (response) => {
                const json = await response.json();
                if (response.ok) {
                    Alert.alert(
                        strings('home.alerta'),
                        strings('main.done'),
                        [
                          {text: 'OK', onPress: () => 
                            this.back()
                        },
                        ],
                        { cancelable: false }
                    )                  
                }
            });
        } else {
            internet();
        }
    }

    back() {
        this.props.navigation.goBack()
        this.props.navigation.state.params.updateData()
    }

    _nextStep() {
        if (this.state.code == '') {
            toastMsg(strings('pay.code'))
        } else if (this.state.image == '') {
            toastMsg(strings('pay.image'))
        } else {
            this._registerUser();
        }
    }

    getBillID() {
        this.props.navigation.getParam('bill_id', '0')
        return val.toString()
    }

    getPrice() {
        var val = this.props.navigation.getParam('price', '0')
        val = val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        return val.toString()
    }

    _getPhoto() {
        ImagePicker.openPicker({
          cropping: false,
          width: 100,
          height: 100,
          compressImageQuality: 0.5,
          includeExif: true,
          }).then(image => {
          console.log('received image', image.path);
          console.log(image);
          this.setState({
            image: image.path
          });
        }).catch(e => alert(e));
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

    getBanks() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(APP_STORE.getToken())
        };
    
        fetch(URL + 'banks/', requestOptions)
            .then(async (response) => {
            const json = await response.json();
            console.log(`BANKS:JSON:`, json);
            if (response.ok) {
                this.setState({results:json,
                        selected1:json[0].id})
                console.log(json)
            }
        });
    }

    getImage() {
        if(this.state.image == '') {
            return(
                <Image
                style={{
                resizeMode: 'cover',
                width: 100,
                height: 100,
                }}
                source={require('../../assets/img/capture.png')}
                />
            )
        } else {
            return(
                <Image
                style={{
                resizeMode: 'cover',
                width: 100,
                height: 100,
                }}
                source={{uri: this.state.image}}
               />
            )
        }
    }

    showMore() {
        this.state.results.map((item) => {

            if (item.id == this.state.selected1) {
                this.props.navigation.navigate('Ver', {
                    item: item,
                });
            }
        })
    }

    render() {
        const {isLoading} = this.state;
        let body = <ActivityIndicator size="large" color="#3BBDA6"/>;
        if (!isLoading) {
            body = <View>
                <View style={{marginTop: -45,                        
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={styles.inputStylesss}>{strings('pay.pay')} {this.state.price} VEF</Text>
                    <TextInput
                        style={styles.inputStyle}
                        editable={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(code) => this.setState({code})}
                        placeholder={strings("main.ref")}
                        returnKeyType = {"next"}
                        value={this.state.code}
                        blurOnSubmit={false}
                    />
                    <Picker
                        mode='dropdown'
                        selectedValue={this.state.selected1}
                        textStyle={styles.buttonText3}
                        onValueChange={this.onValueChange.bind(this)}>
                        { this.state.results.map((item) => {
                            return <Picker.Item label={item.name} value={item.id} key={item.id} /> ;
                        })}
                   </Picker>
                   <TouchableOpacity
                    onPress={ () => this.showMore()}>
                        <Text style={styles.buttonText3}> {strings("main.more")} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.buttomStyle}
                    onPress={this._getPhoto.bind(this)}>
                    {this.getImage()}
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 30,                        
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={styles.buttomRegisterStyle}
                    onPress={this._nextStep.bind(this)}>
                    <Text style={styles.buttonText}> {strings("register.paso1")} </Text>
                </TouchableOpacity>
                </View>
            </View>
        }
        return (
            <View style={styles.scrollContainer}>
                {this.renderBy(body)}
            </View>
        );
    }
}

export default Pagar;