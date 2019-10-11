import React from 'react'
import { View, ScrollView } from 'react-native'
import { Paragraph, Button, Text, ActivityIndicator } from 'react-native-paper'


import AsyncStorage from '@react-native-community/async-storage'


// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 
// custom components
import UserNotLoggedIn from '../components/my-bookings/user-not-logged-in'
import BookingList from '../components/my-bookings/booking-list'

// storage
import Storage from '../../models/storage'
// server domain
import Net from '../../models/net'

// my-bookings
class MyBookingsActivity extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {

      // list of user bookings
      bookings: [ ],
      is_loading: true,
      // current user 
      user: {},
      network_errored: false

    }

    this.goToLogin = this.goToLogin.bind(this)
    this.goToRegister = this.goToRegister.bind(this)
    this.goToBooking = this.goToBooking.bind(this)
    
    this.network_error_content = this.network_error_content.bind(this)
  }// constructor(props) { .. }

  async componentDidMount() {
    this.getUserAndBookings()
  }

  is_loading_content() {
    return(

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ fontSize: 20, marginTop: '48%', marginBottom: '8%' }}> 
          Please wait while we get your Bookings 
        </Text>

        <ActivityIndicator animating={true} color={ '#2cdeea' } size='large' />

  
      </View>

    )
  }// is_loading_content() { .. }

  
  network_error_content() {
    return(

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ fontSize: 20, marginTop: '48%', marginBottom: '8%' }}> 
          A Network Error Occured While Getting Your Bookings 
        </Text>

        {/* <AwesomeIcon name='network-error' color={ '#2cdeea' } size='large' /> */}

        <Button uppercase={false} mode='contained' onPress={ this.getUserAndBookings }
                  style={{ marginVertical: 48, borderRadius: 24 }}
              > Retry </Button>
  

      </View>

    )
  }// network_error_content() { .. }

  
  render() {

    let show = <BookingList bookings={this.state.bookings} goToBooking={this.goToBooking} /> //this.show_bookings()
    if( !this.state.user.hasOwnProperty('name') ) {
      show = <UserNotLoggedIn goToLogin={this.goToLogin} goToRegister={this.goToRegister} />  // this.render_not_logged_in()
    }

    if( this.state.is_loading ) {
      show = this.is_loading_content()
    }
    if( this.state.network_errored ) {
      show = this.network_error_content()
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
    AsyncStorage.getItem(Storage.USER)
      .then((val)=> {

        if( val == null || val == undefined ) {
          this.setState({ is_loading: false })
          return
        } 

        let user = JSON.parse(val)
        this.setState({ user })
        this.getBookings()

      })
  }// getUserAndBookings() { .. }
  
  // get logged in user 
  async getUser() {
    let user = await AsyncStorage.getItem(Storage.USER)
    this.setState({ user })
  }// async getUser() { .. }

  // get user bookings
  async getBookings() {
    // console.log(`bookings pwd ${this.state.user.password}`)
    let token = await AsyncStorage.getItem(Storage.TOKEN)
    let token_offer_time = await AsyncStorage.getItem(Storage.TOKEN_TIME)
    let user = this.state.user

    this.setState({ is_loading: true })

    console.log('if token')
    // get a token
    if( token == undefined || token == null || token_offer_time == null || (Date.now() - parseFloat(token_offer_time)) > 30000 ) {
      console.log('lets get token')
      
      try{

        let login_result = await fetch(`${Net.SERVER}/api/user/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify({ email: user.email, password: user.password })
        })
  
        console.log('login_result ', login_result)
        if( login_result.status != 200 ) {
          this.setState({ network_errored: true })
        }

        let login_result_json = await login_result.json()
        
        token = login_result_json.token 
        
        await AsyncStorage.setItem(Storage.TOKEN, token)
        await AsyncStorage.setItem(Storage.TOKEN_TIME, (Date.now()).toString() )

      }catch(e){
        console.log('e34 ', e)
        this.setState({ is_loading: false, network_errored: true })
        return
      }
      
    }
    // console.log(`has token ${token}`)

    // get bookings
    try{

      let url = `${Net.SERVER}/api/user/${user._id}/bookings`
      let bookings_req = await fetch(url, {
                            method: 'get', 
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            }
                          })

      console.log('bookings_req ', bookings_req)
      if( bookings_req.status != 200 ) {
        this.setState({ network_errored: true })
      }

      let req_json = await bookings_req.json()
      console.log(`${req_json.bookings.length}`)

      // console.log(req_json.bookings[0]['bookings'])
      console.log('umnr ', req_json.bookings[0]['bookings']['umnr'])
      console.log('pet ', req_json.bookings[0]['bookings']['pet'])
      console.log('luggage ', req_json.bookings[0]['bookings']['luggage'])
      console.log('group ', req_json.bookings[0]['bookings']['group'])

      this.setState({ bookings: req_json.bookings, is_loading: false })

    }catch(e) {
      console.log(e)
      this.setState({ is_loading: false, network_errored: true })
      return
    }

  }// async getBookings() { .. }


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