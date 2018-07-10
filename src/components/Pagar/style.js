import { StyleSheet, Platform  } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        width: '80%',
        resizeMode: 'contain',
        flex: 1,
    },
    contentRegister: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    textLight: {
        fontSize: 20,
        color: '#3BBDA6',
    },
    textRegister: {
        fontSize: 22,
        color: '#3BBDA6',
        marginBottom: 30,
        ...Platform.select({
            android: {
                marginTop: -30,
            },
        }),
    },
    textRegisterContinue: {
        fontSize: 22,
        color: '#3BBDA6',
        marginBottom: 30,
        textAlign: 'center',
        ...Platform.select({
            android: {
                marginTop: -30,
            },
        }),
    },
    textIam: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    textphoto: {
        fontSize: 18,
        color: '#333',
        marginBottom: 0,
        textAlign: 'center',
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3BBDA6',
        marginBottom: 25,
    },
    inputStyle: {
        backgroundColor: '#ffffff',
        width: 250,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 10,
        ...Platform.select({
            ios: {
                height: 30,
            },
            android: {
                height: 45,
                paddingTop: 12,
            },
          }),
    },
    inputStyleFecha: {
        backgroundColor: '#ffffff',
        height: 40,
        width: 250,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: 100,
        paddingRight: 10,
        marginBottom: 10,
    },
    viewButtonStyleFecha: {
        position: 'absolute',
        zIndex: 999,
        top: 10,
        left: 17,
        width: 230,
    },
    textButtonStyleFecha: {
        color: '#ccc',
    },
    textFecha: {
        color: '#3BBDA6',
    },
    buttomRegisterStyle: {
        marginTop: -10,
        marginBottom: 10,
        width: 250,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#3BBDA6',

    },
    inputStylesss: {
        backgroundColor: '#ffffff',
        width: 300,
        textAlign: 'center',
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        marginTop: 15,
        paddingRight: 10,
        marginBottom: 10,
    },
    buttomStyle: {
        marginTop: 25,
    },
    buttomUploadStyle: {
        marginTop: 5,
        marginBottom: 15,
        width: 170,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttomUpload: {
        width: 120,
        height: 120,
        flex: 0,
        resizeMode:'contain'
    },
    buttomToUpload: {
        width: 120,
        height: 120,
        flex: 0,
        borderRadius: 60,
    },
    buttomRegisterSexOff: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#ccc',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonTextOff: {
        color: '#ccc',
        fontSize: 16,
    },
    buttomRegisterSexOn: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: '#3BBDA6',
        borderRadius: 50,
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonTextOn: {
        color: '#3BBDA6',
        fontSize: 16,
    },

    buttomFacebookStyle: {
        marginTop: 5,
        marginBottom: 10,
        width: 250,
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
    contentSocial:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    opt:{
      justifyContent: 'center',
      alignItems: 'center',
      color: '#777',
    },
    lineOpt:{
      width: 50,
      height: 1,
      backgroundColor: '#777',
    },
    optBox:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    buttomCancelStyle: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        marginRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: 'transparent',
        ...Platform.select({
            android: {
                paddingTop: 0,
                paddingBottom: 10,
            },
        }),
    },
    buttonTextCancel: {
        fontSize: 16,
    },
    buttonTextTerms: {
        color: '#333',
        fontSize: 16,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText2: {
        color: '#fff',
        backgroundColor: '#3BBDA6',
        fontSize: 16,
        height: 20,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    buttonText3: {
        color: '#3BBDA6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttomBackLogin: {
        marginTop: 30,
    },
    grupBtn:{
      flex: 1, flexDirection: 'row',  justifyContent: 'center',
      width: '90%',
    },
    radioStyle:{
      paddingTop: 5,
      paddingBottom: 5,
    },
    teclado: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        ...Platform.select({
            ios: {},
            android: {},
        }),
    },
    picker: {
        position: 'absolute',
        zIndex: 999,
        top: 10,
        left: 17,
        width: 230
    },
    scrollContainer: {
        backgroundColor: '#FFF',
        flex:1,
    },
        container: {
        ...Platform.select({
            ios: {
                marginTop: -45,                        
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            android: {
                marginTop: 30,                        
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
          }),
    },
    
})