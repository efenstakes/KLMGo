import React from 'react'
import { View, ScrollView, AsyncStorage, Text } from 'react-native'
import { Paragraph, Button } from 'react-native-paper'


// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 
// custom components
import UserNotLoggedIn from '../components/my-bookings-user-not-logged-in'
import BookingList from '../components/booking-list'

// my-bookings
class MyBookingsActivity extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {

      // list of user bookings
      bookings: [
        { 
          _id: 'iv6q3CQ3$T', 
          accepted: { 
              status: true,
              staff: '$%asd'
          }
        },
        { 
          _id: 'iv6q3CQ3$T', 
          accepted: { 
              status: false 
          }
        },
        { 
          _id: 'iv6q3CQ3$T', 
          accepted: { 
              status: true 
          }
        },
        { 
          _id: 'iv6q3CQ3$T', 
          accepted: { 
              status: false,
              staff: '$%asd' 
          }
        }
      ],
      // current user 
      user: null,

    }

    this.goToLogin = this.goToLogin.bind(this)
    this.goToRegister = this.goToRegister.bind(this)
  }// constructor(props) { .. }

  async componentDidMount() {
    this.getUserAndBookings()
  }

  
  render() {

    let show = <BookingList bookings={this.state.bookings} goToBooking={this.goToBooking} /> //this.show_bookings()
    if( this.state.user == null ) {
      show = <UserNotLoggedIn goToLogin={this.goToLogin} goToRegister={this.goToRegister} />  // this.render_not_logged_in()
    }

    return (
      <ScrollView>

        <View style={{ flex: 1, height: '100%', flexDirection: 'row' }}>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 12 }}>

            { show }

          </View>
          <View style={{ flex: 1 }}></View>

        </View>
        
      </ScrollView>
    )
  }// render() { .. }
  


  // get user logged in and their bookings
  getUserAndBookings() {
    AsyncStorage.getItem('klm:user')
      .then((val)=> {
        this.setState({ user: val })
        this.getBookings()
      })
  }// getUserAndBookings() { .. }
  
  // get logged in user 
  async getUser() {
    let user = await AsyncStorage.getItem('klm:user')
    // alert(user)
    this.setState({ user })
  }
  // get user bookings
  async getBookings() {
    // alert(`bookings ${this.state.user}`)
  }

  // redirect to login activity
  goToLogin() {
    this.props.navigation.navigate('Login', { from: 'MyBookings' })
  }
  // redirect to register activity
  goToRegister() {
    this.props.navigation.navigate('Register', { from: 'MyBookings' })
  }

  // redirect user to go to make a booking
  goToBooking() {
    this.props.navigation.navigate('Book', { from: 'MyBookings' })
  }

} 

export default MyBookingsActivity