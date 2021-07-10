import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignInScreen from './src/screens/SignInScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import ScanScreen from './src/screens/ScanScreen'
import AttendanceScreen from "./src/screens/AttendanceScreen";
import TripScreen  from "./src/screens/TripScreen";
import UpcomingDelScreen from './src/screens/UpcomingDelScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SP from './src/components/ScrollPicker';

const SecondStack=createStackNavigator(
  {
    Profile: ProfileScreen,
    Scroll: SP,
    Attendance: AttendanceScreen,
    DutyLog: SignInScreen,
    Scanner: ScanScreen,
    Trip: TripScreen,
    Upcoming: UpcomingDelScreen,
    Progress: ProgressScreen,
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
    //   headerStyle: {
    //     backgroundColor: '#5497A7',
    //   },
    //   headerTitleStyle: {
    //     color: '#F4FAFF',
    // }
    },
  }
)

const DrawerStack= createDrawerNavigator(
  {
    Main: {screen:SecondStack}
  },
   { contentComponent: HomeScreen }
)
const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    DrawerNav: {
      screen: DrawerStack,
      navigationOptions: { headerShown: false } } 
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'App',
      headerTitleAlign: 'center'
    },
  }
);






export default createAppContainer(navigator);
