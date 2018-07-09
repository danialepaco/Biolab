import { StyleSheet, Platform  } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  contentLogin: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLight: {
    fontSize: 20,
    marginTop: 35,
    color: '#3BBDA6',
  },
  textRecover: {
    fontSize: 26,
    marginTop: 30,
    marginBottom: 35,
    color: '#3BBDA6',
  },
  textBold: {
    fontSize: 20,
    marginBottom: 35,
    fontWeight: 'bold',
    color: '#3BBDA6',
  },
  inputStyle: {
    backgroundColor: '#ffffff',
    height: 40,
    width: 250,
    borderColor: '#ccc',
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 10,
  },
  buttomLoginStyle: {
    marginTop: 5,
    marginBottom: 20,
    width: 250,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#3BBDA6',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttomBackLogin: {
    marginTop: 15,
    marginBottom: 20,
  },
  errorMessages:{
    color: 'red'
  },
  teclado: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    ...Platform.select({
      ios: {

      },
      android: {

      },
    }),
  }

});
