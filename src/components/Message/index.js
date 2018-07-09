import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';

import styles from './style';
import { getChat,calculateTime } from './MessageActions';
import {APP_STORE} from '../../Store';
import {strings} from '../../i18n';
import {connection, internet, checkConectivity, toastMsg } from '../../utils';

export default class Message extends Component {
    constructor() {
        super();

        this.state = {
          refreshing:false,
          chats: [],
          isLoading: false,
        };
    }

    static navigationOptions = ({ navigation }) => {
      const {params} = navigation.state;

      return {
        title: strings('main.bill'),
        headerLeft: <TouchableOpacity style={styles.buttonRight} onPress={() => params.logout && params.logout()}><Image style={styles.navRight} source={require('../../assets/img/profile.png')} /></TouchableOpacity>
      };
    };

    componentDidMount() {

      this.props.navigation.setParams({logout: () => this._logout()});

      this.chatsVar = APP_STORE.CHAT_EVENT.subscribe(state => {
        console.log("Messages:componentDidMount:chatsVar", state);
        if (state.chats) {

          this.setState({
            chats: state.chats,
            isLoading: true,
            refreshing: false,
          })
          return;
        }

        if (state.error) {
          toastMsg(state.error);
        }
      });
      getChat()
    }

    _logout = () => {
      this.props.navigation.navigate('EditProfile');
    }

    componentWillUnmount() {
      this.chatsVar.unsubscribe();
    }

    showChat(item) {
      switch(item.status) {
        case "pa":
          return "#3FB13F"
        case "wv":
          Alert.alert(strings('main.wait'))
          break
        case "np":
          this.props.navigation.navigate('Pagar', {
            bill_id: item.id,
            price: item.final_price,
            updateData:this.onRefresh.bind(this),
          });
          break
        default:
        return "#000"
      }
    }

    onRefresh() {

      console.log(this.state);
      this.setState({
        chats: [],
        isLoading: false,
        refreshing: true,
      },() => { 
        console.log(this.state);
        getChat()
      })
    }

    getColor(status) {
      switch(status) {
        case "pa":
          return "#3FB13F"
        case "wv":
          return "#F9B930"
        case "np":
          return "#E9564F"
        default:
        return "#000"
      }
    }

    render() {
      if(this.state.isLoading) {
        return (
          <View style={styles.viewContainer}>
            <FlatList
              horizontal={false}
              keyExtractor={( item , index ) => index.toString() }
              data={this.state.chats}
              renderItem={({item}) =>
                <TouchableOpacity onPress={ () => this.showChat(item)}>
                  <View style={styles.viewMsg}>
                    <View style={styles.viewTexts}>
                      <Image style={styles.imgProfileItem}
                        source={require('../../assets/img/bill.png')}
                      />
                      <Text style={styles.textUser}>#{item.id} {calculateTime(item.created_at)}</Text>
                    </View>
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: this.getColor(item.status),
                    }}/>
                  </View>
                </TouchableOpacity>
              }
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
            />
          </View>
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
