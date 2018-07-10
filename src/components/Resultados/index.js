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
import { getChat } from './MessageActions';
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
        title: strings('main.results'),
      };
    };

    getBillID() {
      return this.props.navigation.getParam('bill_id', '0').toString()
    }

    componentDidMount() {

      this.publicProfile = APP_STORE.PUBLICEDITPROFILE_EVENT.subscribe(state => {
        console.log("Messages:componentDidMount:chatsVar", state);
        if (state.publicProfile) {

          this.setState({
            chats: state.publicProfile,
            isLoading: true,
            refreshing: false,
          })
          return;
        }

        if (state.error) {
          toastMsg(state.error);
        }
      });
      getChat(this.getBillID())
    }

    showPdf(id) {
      this.props.navigation.navigate('EditProfile');
    }

    componentWillUnmount() {
      this.publicProfile.unsubscribe();
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

    render() {
      if(this.state.isLoading) {
        return (
          <View style={styles.viewContainer}>
            <FlatList
              horizontal={false}
              keyExtractor={( item , index ) => index.toString() }
              data={this.state.chats}
              renderItem={({item}) =>
                <TouchableOpacity onPress={ () => this.showPdf(item.id)}>
                  <View style={styles.viewMsg}>
                    <View style={styles.viewTexts}>
                      <Image style={styles.imgProfileItem}
                        source={require('../../assets/img/pdf.png')}
                      />
                      <Text style={styles.textUser}>#{item.id} {item.test.name}</Text>
                    </View>
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
