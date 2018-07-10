import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  TouchableHighlight,
  Image,
  Navigator,
  TouchableOpacity,
  TextInput,
  Picker,
  Keyboard,
  ActivityIndicator,
  Switch,
  Alert
} from 'react-native';

import { strings } from "../../i18n";
import styles from './style';
import {APP_STORE} from '../../Store';
import {authHeader , URL} from '../../utils';
import Pdf from 'react-native-pdf';

export default class PDF extends Component {

  constructor(props) {
    super(props);
    console.log("EditProfile:constructor");

    this.state = {
      isLoading: false,
      id: '',
      file: undefined,
    };
  }

  getID() {
    return this.props.navigation.getParam('id', '0').toString()
  }

  componentDidMount(){
    const requestOptions = {
      method: 'GET',
      headers: authHeader(APP_STORE.getToken())
  };

    fetch(URL + 'results/' + this.getID() + '/get_result/', requestOptions)
        .then(async (response) => {
        const json = await response.json();
        console.log(json.pdf_base64)
        if (response.ok) {
          this.setState({file: json.pdf_base64 ,isLoading:true})
        }
    });

  }

  static navigationOptions = ({ navigation }) => {
    const {params} = navigation.state;

    return {
      title: strings('main.results'),
    };
  };

  render() {
    const { isLoading } = this.state;

    if(isLoading) {
        const source = {uri:"data:application/pdf;base64," + this.state.file };
        return (
        <View style={styles.container}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages,filePath)=>{
                    console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                    console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                    console.log(error);
                }}
                style={styles.pdf}/>
        </View>
    )
    } else {
        return (
            <View style={[styles.containers, styles.horizontal]}>
                <ActivityIndicator size="large" color="#3BBDA6" />
            </View>
        )
    }
  }
}
