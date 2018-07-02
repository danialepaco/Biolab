import {StackNavigator, SwitchNavigator} from 'react-navigation';
import Splash from './src/components/Splash';
import Terms from './src/components/Terms';
import Authentication from './src/components/Authentication/index';
import LoginPage from './src/components/Login';
import RegisterPage from './src/components/Register';
import HomePage from './src/components/Home';
import Ver from './src/components/Ver';
import Profile from './src/components/Profile';
import EditProfile from './src/components/EditProfile';
import PublicProfile from './src/components/PublicProfile';
import ForgotPage from './src/components/Forgot';
import Message from './src/components/Message';
import Pagar from './src/components/Pagar';
import Topbar from './src/utils/TopBar';

const AppStack = StackNavigator({Message:Message,Ver:Ver,Pagar:Pagar,Bar: Topbar, Home: HomePage, Profile: Profile, EditProfile: EditProfile, PublicProfile: PublicProfile});
const AuthStack = StackNavigator({SignIn: Authentication, Register: RegisterPage, Terms: Terms, Login: LoginPage, Forgot: ForgotPage});

export default SwitchNavigator(
    {
        AuthLoading: Splash,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
