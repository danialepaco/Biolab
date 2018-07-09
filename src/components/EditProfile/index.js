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
import { internet, checkConectivity } from '../../utils';
import { publicEditAction, saveProfileAction,logOut } from './EditProfileActions';

export default class EditProfile extends Component {

  constructor(props) {
    super(props);
    console.log("EditProfile:constructor");

    this.state = {
      isLoading: false,
      id: '',
      username: '',
      description: '',
      name: '',
    };
  }

  componentDidMount(){
    this.props.navigation.setParams({logout: () => this._logout()});

    this.public = APP_STORE.PUBLICEDITPROFILE_EVENT.subscribe(state => {
        console.log("Public Edit Profile:componentDidMount:PUBLICEDITPROFILE_EVENT", state);
        console.log(state);
        if (state.publicEditProfile) {

          this.setState({
              isLoading: true,
              username: state.publicEditProfile.last_name,
              description: state.publicEditProfile.address,
              name: state.publicEditProfile.first_name,
              id: state.publicEditProfile.id.toString()
          })
          return;
        }
        if (state.error) {
          Alert.alert(state.error);
        }
    });

    this.saveProfile = APP_STORE.PUBLIC_SAVE_PROFILE_EVENT.subscribe(state => {
      console.log("Public Save Profile:componentDidMount:PUBLIC_SAVE_PROFILE_EVENT", state);
      console.log(state);
      if (state.saveProfile) {
          this.setState({
              isLoading: true,
          })
          return;
      }
      if (state.error) {
          this.setState({isLoading: true})
          Alert.alert(state.error);
      }
    });

    this.event = APP_STORE.APP_EVENT.subscribe(state => {
      this.setState({isLoading: true});
      console.log(state);
      if (state.error) {
        Alert.alert(state.error);
          return;
      }
      if (state.success) {
        this.props.navigation.navigate('Auth');
        return;
      }
  });

    this._getProfileId();

  }

  componentWillUnmount() {
      console.log("EditProfile:componentWillUmmount");
      this.public.unsubscribe();
      this.saveProfile.unsubscribe();

  }

  _getProfileId() {
      publicEditAction(APP_STORE.getToken())
  }

  _saveInfo() {
    if (checkConectivity()) {
      this.setState({isLoading: false });
      saveProfileAction(APP_STORE.getToken(), this.state)
    } else {
      internet();
    }
  }

  static navigationOptions = ({ navigation }) => {
    const {params} = navigation.state;

    return {
      title: strings('main.edit'),
      headerRight: <TouchableOpacity style={styles.buttonRight} onPress={() => params.logout && params.logout()}><Image style={styles.navRight} source={require('../../assets/img/logout.png')} /></TouchableOpacity>
    };
  };

  _logout = () => {
    this.setState({isLoading: false});
    logOut();      
  }

  render() {
    const { isLoading } = this.state;

    if(isLoading) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={styles.scrollView}
          keyboardShouldPersistTaps={'always'}
        >
         <View style={styles.contentForm}>
           <View style={styles.labelText}>
             <Text style={styles.textLabel}>{strings("register.name")}</Text>
           </View>
           <TextInput
              underlineColorAndroid='transparent'
              style={styles.meDescription}
              value={this.state.name}
              onChangeText={(name) => this.setState({name})}
              blurOnSubmit={false}
              returnKeyType = {"next"}
              ref='descripcion'
              onSubmitEditing={() => { this.nombre.focus(); }}
            />
          <View style={styles.divider} />
          <View style={styles.labelText}>
            <Text style={styles.textLabel}>{strings("register.lastName")}</Text>
          </View>
          <TextInput
             underlineColorAndroid='transparent'
             style={styles.meDescription}
             value={this.state.username}
             onChangeText={(username) => this.setState({username})}
             blurOnSubmit={false}
             returnKeyType = {"next"}
             ref={(input) => { this.nombre = input; }}
             onSubmitEditing={() => { this.usuario.focus(); }}
           />
         <View style={styles.divider} />
         <View style={styles.labelText}>
           <Text style={styles.textLabel}>{strings("register.address")}</Text>
         </View>
         <TextInput
            underlineColorAndroid='transparent'
            style={styles.meDescription}
            value={this.state.description}
            onChangeText={(description) => this.setState({description})}
            blurOnSubmit={false}
            returnKeyType = {"next"}
            ref={(input) => { this.usuario = input; }}
            onSubmitEditing={() => { Keyboard.dismiss() }}
          />
          <View style={styles.divider} />
         </View>
        <View style={styles.content}>
          <TouchableOpacity
              style={styles.buttomRegisterStyle} onPress={() => this._saveInfo()}>
              <Text style={styles.buttonText}>{strings("main.changes")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.buttomPassStyle}>
              <Text style={styles.buttonTextCard}>{strings("main.password")}</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      );
    } else {
        return (
            <View style={[styles.containers, styles.horizontal]}>
                <ActivityIndicator size="large" color="#3BBDA6" />
            </View>
        )
    }
  }
}
