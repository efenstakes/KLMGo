import React from 'react'
import { StyleSheet, View, ScrollView, Picker, Dimensions } from 'react-native'
import { Paragraph, Button, List, Text, ProgressBar, Colors } from 'react-native-paper'

import { CheckBox, Input  } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

import AsyncStorage from '@react-native-community/async-storage'
 
// components
import UserDetailForm from '../components/user-detail-form'
import UserDetailDisplay from '../components/user-detail-display'
import GroupBookingForm from '../components/group-booking-form'
import BabyBookingForm from '../components/baby-booking-form'
import LuggageBookingForm from '../components/luggage-booking-form'
import PetBookingForm from '../components/pet-booking-form'

import BookingSuccessOverlayModal from '../components/booking-success-overlay'


// storage
import Storage from '../../models/storage'
// server domain
import Net from '../../models/net'


// book
class BookingActivity extends React.Component {
  

  constructor(props) {
    super(props)

    this.state = {
      show_overlay: false, 

      user: { name: '', email: '', phone: '' },
      baby: {
        number: 0, is_returning: false, special_instructions: ''
      },
      group: {
        name: '', number: 0, is_returning: false, special_instructions: '',
        // conference, leisure, event, students, sports, journalists,
        // group series, musicians, other
        type: 'other' 
      },
      nanny: {
        date_from: null, date_to: null, special_instructions: '' 
      },
      luggage: { weight: 0, special_instructions: '' },
      // carriage types
      pet: {
        number: 0, weight: 0, is_vaccinated: false, 
        carriage: null, special_instructions: ''
      },

      destination: '', travel_date: null,
      class: 'economy', // economy/business

      step: 1,
      is_loading: false,

      // errors
      errors: {
        user: { name: [], email: [], phone: [] },
        baby: { number: [] },
        group: { number: [], name: [] },
        luggage: { weight: [] },
        pet: { number: [], weight: [], carriage: [] },
        booking: '',
        destination: [], 
        travel_date: []
      }// errors: { .. }

    }

    this.goNext = this.goNext.bind(this)
    this.goPrevious = this.goPrevious.bind(this)
    this.book = this.book.bind(this)
    this.userDataChange = this.userDataChange.bind(this)
    this.babyDataChange = this.babyDataChange.bind(this)
    this.groupDataChange = this.groupDataChange.bind(this)
    this.luggageDataChange = this.luggageDataChange.bind(this)
    this.petDataChange = this.petDataChange.bind(this)
    
    this.isUserValid = this.isUserValid.bind(this)
    this.isDestinationValid = this.isDestinationValid.bind(this)
    this.isBookingsValid = this.isBookingsValid.bind(this)
    
    this.getUserIfAny = this.getUserIfAny.bind(this)
    this.seeForm = this.seeForm.bind(this)
    this.goToLogin = this.goToLogin.bind(this)

    this.hideModal = this.hideModal.bind(this)
  }// constructor(props) { .. }

  componentDidMount() {
    this.getUserIfAny()
  }// componentDidMount() { .. }

  booking_forms() {
    return(
      <View>

        <List.Accordion style={ styles.form_containers } title='Baby Booking'>
            <BabyBookingForm baby={this.state.baby} klmOnDataChange={this.babyDataChange}
                             errors={this.state.errors.baby} />
        </List.Accordion>
        
        <List.Accordion style={ styles.form_containers } title='Group Booking'>
            <GroupBookingForm group={this.state.group} klmOnDataChange={this.groupDataChange}
                              errors={this.state.errors.group} />
        </List.Accordion>
        
        <List.Accordion style={ styles.form_containers } title='Pet Booking'>
            <PetBookingForm pet={this.state.pet} klmOnDataChange={this.petDataChange}
                            errors={this.state.errors.pet} />
        </List.Accordion>
        
        <List.Accordion style={ styles.form_containers } title='Luggage Booking'>
            <LuggageBookingForm luggage={this.state.luggage} klmOnDataChange={this.luggageDataChange}
                                errors={this.state.errors.luggage} />
        </List.Accordion>

      </View>
    )
  }// booking_forms() { .. }

  destination_form() {
    return(
      <View style={ styles.form }>

        {/** country and city */}
        <View style={{ marginBottom: 8 }}>
          
          <Input
              style={ styles.text_inputs }
              label='Enter your destination'
              value={this.state.destination}
              onChangeText={text => this.setState({ destination: text })}
              leftIcon={{ type: 'font-awesome', name: 'globe' }}
              errorMessage={ 
                  this.state.errors.destination.length > 0 &&  
                  this.state.errors.destination.join('\n')
              }
              errorStyle={ styles.error_text }
          />

        </View>
        {/** country and city */}

        {/** date the travel is */}
        <View style={{ width: '100%', marginVertical: 16, marginLeft: 8,  }}>
          <Text style={{ fontSize: 16, fontFamily: 'Verdana' }}> When do you travel </Text>

          <DatePicker
            style={{ width: '100%', marginTop: 8 }}
            date={ this.state.travel_date }
            mode="date"
            placeholder="When would you like to travel"
            format="YYYY-MM-DD"
            minDate="2019-09-01"
            maxDate="2050-09-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { this.setState({ travel_date: date}) } }
          />
          {
            this.state.errors.travel_date.length > 0 && 
            <Text style={{ color: '#E37222', fontSize: 12, marginTop: 8 }}>
              { this.state.errors.travel_date[0] }
            </Text> 
          }
        </View>
        
        {/** date the travel is */}


          {/** class */}
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 8 }}>
              
              <View style={{ flex: 3, marginBottom: 24, marginTop: 24 }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Verdana' }}> Which class do you want to book </Text>
              </View>
              <View style={{ flex: 1 }}>
                  
                  <Picker
                      selectedValue={ this.state.class }
                      style={{ marginTop: 8, width: 320 }}
                      onValueChange={(itemValue, itemIndex) =>
                          this.setState({ class: itemValue })
                      }>
                      <Picker.Item label="business" value="business" />
                      <Picker.Item label="economy" value="economy" />
                  </Picker>

              </View>

          </View>
          {/** carriage */}


      </View>
    )
  }// destination_form() { .. }

  
  render() {
    let width = Dimensions.get('window').width
    let height = Dimensions.get('window').height

    let show = null
    let prev_btn = <Button onPress={ this.goPrevious } style={ styles.nav_buttons } mode="outlined" uppercase={false}> Previous </Button>
    let next_btn = <Button onPress={ this.goNext } style={ styles.nav_buttons } mode="outlined" uppercase={false}> Next </Button>
    let cta_btn = null

    let booking_button = (
      <Button onPress={ this.book } style={ styles.cta_btn } 
              icon='flight' mode="contained" 
              uppercase={false}
              loading={ this.state.is_loading }
      > 
      { this.state.is_loading ? 'Wait While We Submit Your Booking' : 'Book Now' } 
      </Button>
    )

    if( this.state.step == 1 ) {
      show = this.booking_forms()
      prev_btn = null
    } else if(  this.state.step == 2 ) {
      show = this.destination_form()
    } else if( this.state.step == 3 && this.state.user.hasOwnProperty('password') && !this.state.see_form ) {

      show = <UserDetailDisplay user={this.state.user} width={width}
                    goToLogin={ this.goToLogin } seeForm={ this.seeForm } 
                />
      next_btn = null
      cta_btn = booking_button

    } else if( this.state.step == 3 && this.state.see_form ) {
      show = <UserDetailForm user={this.state.user} 
                            klmOnDataChange={this.userDataChange}
                            errors={this.state.errors.user} />
      next_btn = null
      cta_btn = booking_button
    } else {
      show = <UserDetailForm user={this.state.user} 
                            klmOnDataChange={this.userDataChange}
                            errors={this.state.errors.user} />
      next_btn = null
      cta_btn = booking_button
    }

    

    return (
      <ScrollView style={ styles.page }>
        
        {/** show progress */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: '8%', marginBottom: '4%' }}>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            {/* <ProgressBar progress={ ( this.state.step/3 ) } color={Colors.lightBlueA100} /> */}
            {/** 003F72 */}
            <View style={{ 
                    height: 80, width: 80, borderRadius: 40, 
                    borderColor: '#00A1DE', borderWidth: 2,
                    justifyContent: 'center', alignItems: 'center', 
                    alignSelf: 'center' 
                  }}>
              <Text style={{ color: '#00A1DE', fontSize: 24 }}> { this.state.step }/3 </Text>
            </View>

          </View>
          <View style={{ flex: 1 }}></View>

        </View>
        {/** show progress */}

        { show } 

        {/** show error */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={styles.error_text}> { this.state.errors.booking } </Text>
        </View>
        {/** show error */}
        
        {/** buttons to move from one form to the other */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>

          <View style={{ flex: 3 }}>
             { prev_btn }
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 3 }}>
            { next_btn }
          </View>

        </View>
        {/** cta button - show at last step */}
        { cta_btn }
        
        
        {/** overlay modal to show when user booking is successful */}
        <BookingSuccessOverlayModal width={ width } height={ height }
              show_overlay={this.state.show_overlay} 
              hideModal={ this.hideModal } 
          ></BookingSuccessOverlayModal>
        {/** overlay modal to show when user booking is successful */}
         

      </ScrollView>
    )
  }// render() { .. }

  goToLogin() {
    this.props.navigation.navigate('Login')
  }// goToLogin() { .. }

  seeForm() {
    this.setState({ see_form: true })
  }

  // get user from app storage
  async getUserIfAny() {
    let user = await AsyncStorage.getItem(Storage.USER)
    if( user != null ) {
      this.setState({ user: JSON.parse(user) })
    }
  }// async getUserIfAny() { .. }

  goNext() {
    let current_step = this.state.step

    // if step is 1, then validate bookings
    // if valid proceed else remain here and show errors
    if( current_step == 1 && !this.isBookingsValid() ) return

    // if step is 2, then validate location
    // if valid proceed else remain here and show errors
    if( current_step == 2 && !this.isDestinationValid() ) return


    if( current_step == 3 ) return
    let next_step = this.state.step + 1

    // let { booking, ...errorz } = this.state.errors
    // this.setState({ step: next_step, errors: { booking: '', ...errorz } })
    let errors = this.state.errors
    errors.booking = ''
    this.setState({ step: next_step, errors })
  }// goNext() { .. }
  goPrevious() {
    let current_step = this.state.step
    if( current_step == 1 ) return 
    let next_step = current_step - 1
    
    // let { booking, ...errorz } = this.state.errors
    // this.setState({ step: next_step, errors: { booking: '', ...errorz } })
    let errors = this.state.errors
    errors.booking = ''
    this.setState({ step: next_step, errors })
  }// goPrevious() { .. }

  // set properties for the user 
  userDataChange(property, value) {
    let user = this.state.user 
    user[property] = value
    this.setState({ user })
  }
  // set properties for the baby structure 
  babyDataChange(property, value) {
    let baby = this.state.baby 
    
    if ( property == 'is_returning' ) {
      baby[property] = !baby[property]
    } else if ( property == 'number' ) {
    
      if( value == 'minus' ) {

        if( baby['number'] > 1 ) {
          baby['number'] = (baby['number'] - 1)
        } 

      } else {
        baby['number'] = (baby['number'] + 1)   
      }

    } else {
      baby[property] = value
    }

    this.setState({ baby })
  }// babyDataChange(property, value) { .. }
  // set properties for the group structure 
  groupDataChange(property, value) {
    let group = this.state.group 

    if ( property == 'is_returning' ) {
      group[property] = !group[property]
    } else if ( property == 'number' ) {
    
      if( value == 'minus' ) {

        if( group['number'] > 1 ) {
          group['number'] = (group['number'] - 1)
        } 

      } else {
        group['number'] = (group['number'] + 1)   
      }

    } else {
      group[property] = value
    }

    this.setState({ group })
  }// groupDataChange(property, value) { .. }
  // set properties for the luggage structure
  luggageDataChange(property, value) {
    let luggage = this.state.luggage 
    luggage[property] = value
    this.setState({ luggage })
  }
  // set properties for the pet structure
  petDataChange(property, value) {
    let pet = this.state.pet 

    if ( property == 'number' ) {
    
      if( value == 'minus' ) {

        if( pet['number'] > 1 ) {
          pet['number'] = (pet['number'] - 1)
        } 

      } else {
        pet['number'] = (pet['number'] + 1)   
      }

    } else {
      pet[property] = value
    }

    this.setState({ pet })
  }// petDataChange(property, value) { .. }



  // validations
  
  isUserValid() {
    // reset errors
    let apperrors = this.state.errors
    apperrors.user = { name: [], email: [], phone: [] }
    this.setState({ errors: apperrors })

    // regular expression to validate email
    let email_regex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    let phone_reqex = /^\+?([0-9]{2,3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,5})$/

    // get the email and password values
    let { email, name, phone } = this.state.user
    // sanitize data
    email = email.trim()
    name = name.trim()
    phone = phone.trim()

    let errors = { name: [], email: [], phone: [] }

    // validate email length and format
    if( email.length < 6 ) {
        errors.email.push('Email should be at least 6 characters')
    }
    if( !email_regex.test(email) ) {
        errors.email.push('Email should be valid')
    }
    // validate phone 
    if( phone.length > 0 && !phone_reqex.test(phone) ) {
        errors.phone.push('Phone should be valid')
    }
    
    // validate name length 
    if( name.length < 6 ) {
        errors.name.push('Name should be at least 6 characters')
    }
    // validate name format 
    if( name.length < 6 ) {
        errors.name.push('Name should be at least 6 characters')
    }

    let app_errors = this.state.errors
    app_errors.user = errors
    // set errors 
    this.setState({ errors: app_errors })

    if( errors.email.length > 0 || errors.name.length > 0 || errors.phone.length > 0 ) {
        return false
    }    
    
    console.log('no errors')
    return true
  }// isUserValid() { .. }

  isDestinationValid() {
    // reset errors let errors = this.state.errors
    let app_errors = this.state.errors
    app_errors.destination = []
    app_errors.travel_date = []
    this.setState({ errors: app_errors })

    // regular expression to validate destination

    // get the email and password values
    let travel_dat = this.state.travel_date
    let destinatn = this.state.destination
    // sanitize data
    destinatn = destinatn.trim()


    let errors = { destination: [], travel_date: [] }

    // if they select a date in the future
    if( Date.now() > (new Date(travel_dat)).valueOf() ) {
      errors.travel_date.push('Select a valid date')  
    }

    // validate destination length and format
    if( destinatn.length < 6 ) {
        errors.destination.push('Destination should be at least 6 characters')
    }
    // validate travel date  
    if( !travel_dat ) {
        errors.travel_date.push('Travel date should be provided')
    }

    let apperrors = this.state.errors
    apperrors.travel_date = errors.travel_date
    apperrors.destination = errors.destination
    // set errors 
    this.setState({ errors: apperrors })

    if( errors.destination.length > 0 || errors.travel_date.length > 0 ) {
        return false
    }    
    
    console.log('no errors in destinatn and travel date')
    
    return true
  }// isDestinationValid() { .. }


  
  // baby: { number: [] },
  // group: { number: [] },
  // luggage: { weight: [] },
  // pet: { number: [], weight: [], carriage: [] },
  isBookingsValid() {
    let { baby, group, luggage, pet } = this.state

    // check atleast one was provided
    let errors = {
      baby: { number: [] }, group: { number: [], name: [] },
      luggage: { weight: [] },
      pet: { number: [], weight: [], carriage: [] }
    }

    if( 
        baby.number == 0 && 
        (group.number < 2 || group.name.length < 5) &&
        luggage.weight == 0 && 
        pet.number == 0 && pet.weight == 0
      ) {
        let app_errors = this.state.errors
        app_errors.booking = 'Make one booking to proceed'
        this.setState({ errors: app_errors })
        return false
    }

    if( pet.number > 0 && pet.weight == 0 ) {
      errors.pet.weight.push('Pet weight should be provided')
      
      // console.log(errors.pet.weight.join('\n'))
      
      if( baby.number == 0 && (group.number < 2 || group.name.length < 5) && luggage.weight == 0 ) {
        let apperrors = this.state.errors
        apperrors.booking = 'Make one booking to proceed'
        this.setState({ errors: apperrors })
        return false
      }

    }// if( pet.number > 0 && pet.weight == 0 ) { .. }
    
    if( group.number > 2 && group.name.length < 5 ) {
      let apperrors = this.state.errors
      apperrors.group.name = 'Enter group name to proceed'
      this.setState({ errors: apperrors })
      return false
    }
    if( group.number < 2 && group.name.length > 4 ) {
      let apperrors = this.state.errors
      apperrors.group.name = 'Enter number of people in group name to proceed'
      this.setState({ errors: apperrors })
      return false
    }

    // this.setState({ errors })

    return true
  }// isBookingsValid() { .. }


  // make user booking
  async book() {
    if( !this.state.user.hasOwnProperty('password') && !this.isUserValid() ) return

    let user = this.state.user 
    let { password, ...uzer } = user
    let { pet, baby, group, luggage, travel_date, destination } = this.state
    let classe = this.state.class
    let bookings = { pet, umnr: baby, group, luggage }

    let booking_result
    if( !user.hasOwnProperty('password') ) { console.log('lets go no token')
      
      try{
        booking_result = await fetch(`${Net.SERVER}/api/book/no-auth`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify({ bookings, user: uzer, destination, travel_date, class: classe })
        })
  
        let booking_result_json = await booking_result.json()
  
        console.log(booking_result_json.saved)
        if( booking_result_json.saved ) {
          this.setState({ show_overlay: true })
        }

      }catch(e) {}

      return
    }
    
    try{ console.log('vook with token ', token)

      let token = await AsyncStorage.getItem(Storage.TOKEN)
      let token_offer_time = await AsyncStorage.getItem(Storage.TOKEN_TIME)

      console.log('(Date.now() - parseFloat(token_offer_time) ', (Date.now() - parseFloat(token_offer_time)))

      console.log('vook with token ', token)
      // if token expired
      // if( token == undefined || token == null || token_offer_time == null || ((Date.now() - parseFloat(token_offer_time)) > 3000000 ) ) {
console.log('logiin')
        let login_result = await fetch(`${Net.SERVER}/api/user/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify({ email: user.email, password: user.password })
        })

        let login_result_json = await login_result.json()
        
        token = login_result_json.token
        console.log('login token ', token)
      // }// if( token_offer_time == null || (Date.now() .. }

      console.log('lets book ')
      booking_result = await fetch(`${Net.SERVER}/api/book`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({ bookings, user: uzer, destination, travel_date, class: classe })
      })

      console.log('lets book 2 ', booking_result)
      
      if( booking_result.status != 200 ) {
        console.log('error in request')
        let app_errors = this.state.errors
        app_errors.booking = 'There was an error making your booking. Try after a while'
        this.setState({ errors: app_errors })
      }
      let booking_result_json = await booking_result.json()
      
      console.log('save status ', booking_result_json)
      if( booking_result_json.saved ) {
        this.setState({ show_overlay: true })
      } 
      
    }catch(e) {
      console.log('booking err ', e)
    }

    

  }// book() { .. }


  
  // hide the overlay modal
  hideModal() {
    this.setState({ show_overlay: false })
  }

} 

const styles = StyleSheet.create({

  page: {
    marginHorizontal: 4, 
    // paddingRight: 40,
    height: '100%'
  },

  page_sub_container: {
    marginTop: '4%', //'8%'
    marginBottom: 4,
    paddingHorizontal: 8
  },

  form: {
    marginHorizontal: 0 // 80  
  },

  form_containers: {
    paddingHorizontal: 0,  // 40,
    marginBottom: 24
  },

  nav_buttons: {
    marginHorizontal: 0 // 56 //40
  },

  cta_btn: {
    marginVertical: 96,
    paddingHorizontal: 8,
    marginHorizontal: 0, // 40
    borderRadius: 24,
    // borderBottomRightRadius: 8
  },

  error_text: {
    color: '#E37222',
    fontSize: 12
  }

})
  
export default BookingActivity