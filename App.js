import React, {Fragment} from 'react';
import { View, Text, Linking } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
 
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import { IconButton, Button, Colors, Chip, Card, Avatar, Paragraph, Title } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'

// app activities
import SplashScreenActivity from './app/layouts/activities/SplashScreen'
import TutorialActivity from './app/layouts/activities/Tutorial'
import HomeActivity from './app/layouts/activities/Home'
import MyBookingsActivity from './app/layouts/activities/MyBookings'
import BookingActivity from './app/layouts/activities/Booking'
import FaqActivity from './app/layouts/activities/Faq'
import InstructionActivity from './app/layouts/activities/Instruction'
import TalkToUsActivity from './app/layouts/activities/TalkToUs'
import LoginActivity from './app/layouts/activities/Login'
import RegisterActivity from './app/layouts/activities/Register'


// app colors
let primary_color = '#00A1DE'
let secondary_color = '#2cdeea'
let bottom_navigation_bar_color = '#003F72'
let active_tab_color = '#00A1DE'
let inactive_tab_color = '#2cdeea'


/**
 * routen stacks
 */
const HomeStack = createStackNavigator({
  Home: { 
          screen: HomeActivity,
          navigationOptions: {
            title: 'Explore Our Services'
          }

  },
  Instruction: {
    screen: InstructionActivity,
    navigationOptions: {
      title: 'Instructions'
    }
  },
  Book: {
    screen: BookingActivity,
    navigationOptions: {
      title: 'Make Your Booking Now'
    }
  }
})
const MyBookingsStack = createStackNavigator({
  MyBookings: { 
          screen: MyBookingsActivity,
          navigationOptions: {
            title: 'My Bookings'
          }
  },
  Book: {
    screen: BookingActivity,
    navigationOptions: {
      title: 'Make Your Booking Now'
    }
  },
  Login: {
    screen: LoginActivity,
    navigationOptions: {
      title: 'Login'
    }
  },
  Register: {
    screen: RegisterActivity,
    navigationOptions: {
      title: 'Register'
    }
  }
})
const FaqStack = createStackNavigator({
  Faq: { 
    screen: FaqActivity,

    navigationOptions: {
      title: 'Faq'
    }

  },
})

const TalkToUsStack = createStackNavigator({
  TalkToUs: { 
    screen: TalkToUsActivity,
    
    navigationOptions: {
      title: 'We are just waiting your contact'
    }

  },
})

// create the app bottom navigation
const BottomTabNav = createMaterialBottomTabNavigator({

    Home: { 
      screen: HomeStack, 

      navigationOptions:{
        header: null,  
        headerLeft: null,
        title: 'Home',
        tabBarLabel:'Home',  
        headerStyle: {        
          backgroundColor: "transparent"      
        },
        tabBarIcon:({tintColor})=>(  
          <View>
            <Icon name="home" color={tintColor} size={25}/>  
          </View>
        )  
      } 
      
    }, // Home: { ..

    MyBookings: { 
      screen: MyBookingsStack, 

      navigationOptions:{
        header: null,  
        headerLeft: null,
        tabBarLabel:'My Bookings',  
        tabBarIcon:({tintColor})=>(  
          <View>
            <Icon name="list" color={tintColor} size={25}/>  
          </View>
        )  
      } 

    }, // MyBookings: { .. 
 
    Faq: { 
        screen: FaqStack, 
  
        navigationOptions:{
          header: null,  
          headerLeft: null, 
          tabBarLabel:'Faq',  
          tabBarIcon:({tintColor})=>(  
            <View>
              <Icon name="info-circle" color={tintColor} size={25}/>  
            </View>
          )  
        } 
  
    },// Faq: { ..

    TalkToUs: { 
      screen: TalkToUsStack, 

      navigationOptions:{
        header: null,  
        headerLeft: null,
        tabBarLabel:'Talk To Us',  
        tabBarIcon:({tintColor})=>(  
          <View>
            <Icon name="phone" color={tintColor} size={25}/>  
          </View>
        )  
      } 

    }// TalkToUs: { .. }

  },
  {
    shifting: false,
    initialRouteName: 'Home',
    activeColor: primary_color, // active_tab_color, // '#f0edf6',
    inactiveColor: '#7C7F7D', // '#3e2465',
    barStyle: { 
      backgroundColor: 'white', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    },

    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
    
  }
)

// create the app wide navigator
const AppNavigator = createSwitchNavigator({

    Splash: {
      screen: SplashScreenActivity, navigationOptions: { title: 'Splash Page' }
    },

    Tutorial: {
      screen: TutorialActivity, navigationOptions: { title: 'Tutorial' }
    },

    Book: {
      screen: BookingActivity, navigationOptions: { title: 'Book' }
    },

    Instruction: {
      screen: InstructionActivity, 
      navigationOptions: { title: 'Instructions' }
    },

    Login: {
      screen: LoginActivity, navigationOptions: { title: 'Login' }
    },

    Register: {
      screen: RegisterActivity, navigationOptions: { title: 'Register' }
    },

    AppHome: {
      screen: BottomTabNav
    }

  }, 
  { 
    initialRouteName: 'Splash',
    defaultNavigationOptions: {

      headerStyle: {
        backgroundColor: '#00A1DE',
      },
      headerTintColor: '#00A1DE', // '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }

    } 
})
// use above config to create app component with the set routing configurations
const AppContainer = createAppContainer(AppNavigator)


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: primary_color,
    accent: secondary_color,
  }
}

const App = () => {
  return( 
    <PaperProvider theme={theme}>
      <AppContainer/>
    </PaperProvider> 
  )
}

export default App;