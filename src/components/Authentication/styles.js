import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
    headerLogin: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        resizeMode: 'contain',
    },
    imageStyle: {
        height: 300,
        flex: 2,
        width: null,
    },
    contentLogin: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
    },
    textLight: {
        fontSize: 20,
        color: '#3BBDA6',
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3BBDA6',
        marginBottom: 40,
    },

    buttomLoginIntagramStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 300,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#9605CC',
    },
    buttonInstagramText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttomRegister: {
        marginTop: 20,
    },
    buttonTextRegister: {
        color: '#333333',
        fontSize: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttomFacebookStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 260,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b5998',
    },
    logoFacebook:{
      width: 18,
      height: 18,
      flex: 1,
      alignItems: 'center',
      marginTop: 2,
    },
    buttonTextFacebook: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 10,
        marginTop: -5,
    },
    buttomLoginStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 240,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#3BBDA6',
    },
    scrollContainer: {
        backgroundColor: '#fff',
        height: '100%'
    },

    buttomIconProfile:{
    position: 'absolute',
    top: 22,
    left: 15,
    width: 10,
    height: 10,
    zIndex: 999,
    },
    imgIconProfile:{
      width: 28,
      height: 28,
    },

    buttomIconMsg:{
      position: 'absolute',
      top: 22,
      right: 35,
      width: 10,
      height: 10,
      zIndex: 999,
    },
    imgIconMsg:{
      width: 30,
      height: 27,
    },

});
