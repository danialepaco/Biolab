import React, {Component} from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Alert,
    ScrollView,
    Clipboard,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { strings } from "../../i18n";
// import { registerAction, } from "./RegisterActions";
import { APP_STORE } from "../../Store";
import styles from './style';


class Ver extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numero: '',
            id: '',
            email: '',
            name: '',
            banco: '',
            tipo: '',
        };
    }


    static navigationOptions = {
        title: strings('main.paid'),
    };

    componentDidMount() {
        console.log("RegisterPage:componentDidMount");

        const item = this.props.navigation.getParam('item', '0')

        this.setState({
            numero: item.account_number,
            id: item.id_number,
            email: item.email,
            name: item.owner,
            banco: item.name,
            tipo: item.account_type,
        },() => { 
            console.log(this.state)
        })
        
    }

    componentWillUnmount() {
        console.log("RegisterPage:componentWillUmmount");
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

    writeToClipboard = async (text) => {
        await Clipboard.setString(text);
        Alert.alert(strings("main.copy"));
    };
    
    getTipo(tipo) {
        if (tipo == "ch") {
            return "Corriente"
        } else {
            return "Ahorro"
        }
    }

    render() {
        const {isLoading} = this.state;
        let body = <ActivityIndicator size="large" color="#3BBDA6"/>;
        if (!isLoading) {
            body = <View>
                <View style={{marginTop: -35,                        
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <TouchableOpacity
                        style={styles.buttomStyle}
                        onPress={() => this.writeToClipboard(this.state.banco)}
                    >
                        <Text style={styles.inputStyle}>{this.state.banco}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttomStyle}
                        onPress={() => this.writeToClipboard(this.state.numero)}
                    >
                        <Text style={styles.inputStyle}>{this.state.numero}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.buttomStyle}
                        onPress={() => this.writeToClipboard(this.state.name)}
                    >
                        <Text style={styles.inputStyle}>{this.state.name}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttomStyle}
                        onPress={() => this.writeToClipboard(this.state.id)}
                    >
                        <Text style={styles.inputStyle}>C.I. {this.state.id}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.buttomStyle}
                        onPress={() => this.writeToClipboard(this.state.email)}
                    >
                        <Text style={styles.inputStyle}>{this.state.email}</Text>
                    </TouchableOpacity>

                    <Text style={styles.inputStyle}>{this.getTipo(this.state.tipo)}</Text>
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

export default Ver;