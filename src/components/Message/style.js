import { StyleSheet, Platform, Dimensions } from 'react-native';
var width = Dimensions.get('window').width;

export default styles = StyleSheet.create({

    viewContainer: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
    },
    viewMsg: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    imgProfileItem:{
      width: 35,
      height: 35,
      resizeMode: 'cover',
    },
    containers: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    viewTexts:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textUser:{
      marginLeft: 12,
      fontWeight: '500',
      flex: 1,
      fontSize: 16,
    },
    textChat:{
      marginLeft: 12,
      fontSize: 14,
    },
    buttonRight: {
      marginRight: 18
    },
    navRight: {
      height:18,
      width:18
    },
});
