import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Paragraph, Button, List, Text, ProgressBar, Colors } from 'react-native-paper'

import { CheckBox, Input  } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

// components
import UserDetailForm from '../components/user-detail-form'
import GroupBookingForm from '../components/group-booking-form'
import BabyBookingForm from '../components/baby-booking-form'
import LuggageBookingForm from '../components/luggage-booking-form'
import PetBookingForm from '../components/pet-booking-form'


// book
class BookingActivity extends React.Component {
  

  constructor(props) {
    super(props)

    this.state = {

      user: { name: '', email: '', phone: '' },
      baby: {
        number: 0, is_returning: false, special_instructions: ''
      },
      group: {
        number: 0, is_returning: false, special_instructions: ''
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

      step: 1,

      // errors
      errors: {
        user: { name: [], email: [], phone: [] },
        baby: { number: [] },
        group: { number: [] },
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
  }// constructor(props) { .. }

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
        <Input
              style={ styles.text_inputs }
              label='Enter your destination'
              value={this.state.destination}
              onChangeText={text => this.setState({ destination: text })}
              leftIcon={{ type: 'font-awesome', name: 'globe' }}
              errorMessage={ 
                  this.state.errors.destination
              }
              errorStyle={ styles.error_text }
          />
        {/** country and city */}

        {/** date the travel is */}
        <View style={{ width: '100%', marginVertical: 16, marginLeft: 8,  }}>
          <Text style={{ fontSize: 16 }}> When do you travel </Text>

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
          <Text style={{ color: '#E37222', fontSize: 12, marginTop: 8 }}> { this.state.errors.travel_date } </Text>
        </View>
        
        {/** date the travel is */}

      </View>
    )
  }// destination_form() { .. }

  
  render() {

    let show = null
    let prev_btn = <Button onPress={ this.goPrevious } style={ styles.nav_buttons } mode="outlined" uppercase={false}> Previous </Button>
    let next_btn = <Button onPress={ this.goNext } style={ styles.nav_buttons } mode="outlined" uppercase={false}> Next </Button>
    let cta_btn = null

    if( this.state.step == 1 ) {
      show = this.booking_forms()
      prev_btn = null
    } else if(  this.state.step == 2 ) {
      show = this.destination_form()
    } else {
      show = <UserDetailForm user={this.state.user} 
                             klmOnDataChange={this.userDataChange}
                             errors={this.state.errors.user} />
      next_btn = null
      cta_btn = <Button onPress={ this.book } style={ styles.cta_btn } mode="contained" uppercase={false}> Book Now </Button>
    }

    return (
      <ScrollView style={ styles.page }>
        
        {/** show progress */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: '8%' }}>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            <ProgressBar progress={ ( this.state.step/3 ) } color={Colors.lightBlueA100} />
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
        

      </ScrollView>
    )
  }// render() { .. }

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
  }
  goPrevious() {
    let current_step = this.state.step
    if( current_step == 1 ) return 
    let next_step = current_step - 1
    
    // let { booking, ...errorz } = this.state.errors
    // this.setState({ step: next_step, errors: { booking: '', ...errorz } })
    let errors = this.state.errors
    errors.booking = ''
    this.setState({ step: next_step, errors })
  }

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
    } else {
      baby[property] = value
    }

    this.setState({ baby })
  }
  // set properties for the group structure 
  groupDataChange(property, value) {
    let group = this.state.group 

    if ( property == 'is_returning' ) {
      group[property] = !group[property]
    } else {
      group[property] = value
    }

    this.setState({ group })
  }
  // set properties for the luggage structure
  luggageDataChange(property, value) {
    let luggage = this.state.luggage 
    luggage[property] = value
    this.setState({ luggage })
  }
  // set properties for the pet structure
  petDataChange(property, value) {
    let pet = this.state.pet 
    
    pet[property] = value
    this.setState({ pet })
  }



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
    
    alert('no errors')
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
    destination = destinatn.trim()


    let errors = { destination: [], travel_date: [] }

    // if they select a date in the future
    if( Date.now() > (new Date(travel_dat)).valueOf() ) {
      errors.travel_date.push('Select a valid date')  
    }

    // validate destination length and format
    if( destinatn.length < 6 ) {
        errors.destination = 'Destination should be at least 6 characters'
    }
    // validate travel date  
    if( !travel_dat ) {
        errors.travel_date = 'Travel date should be provided'
    }

    let apperrors = this.state.errors
    apperrors.travel_date = errors.travel_date
    apperrors.destination = errors.destination
    // set errors 
    this.setState({ errors: apperrors })

    if( errors.destination.length > 0 || errors.travel_date.length > 0 ) {
        return false
    }    
    
    alert('no errors in destinatn and travel date')
    
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
      baby: { number: [] }, group: { number: [] },
      luggage: { weight: [] },
      pet: { number: [], weight: [], carriage: [] }
    }

    if( 
        baby.number == 0 && group.number < 2 && luggage.weight == 0 && 
        pet.number == 0 && pet.weight == 0
      ) {
        let app_errors = this.state.errors
        app_errors.booking = 'Make one booking to proceed'
        this.setState({ errors: app_errors })
        return false
    }

    if( pet.number > 0 && pet.weight == 0 ) {
      errors.pet.weight.push('Pet weight should be provided')
      
      // alert(errors.pet.weight.join('\n'))
      
      if( baby.number == 0 && group.number < 2 && luggage.weight == 0 ) {
        let apperrors = this.state.errors
        apperrors.booking = 'Make one booking to proceed'
        this.setState({ errors: apperrors })
        return false
      }

    }// if( pet.number > 0 && pet.weight == 0 ) { .. }
    this.setState({ errors })

    return true
  }// isBookingsValid() { .. }


  // make user booking
  book() {
    if( !this.isUserValid() ) return

    let user = this.state.user
    alert(`submitted`)
  }// book() { .. }


  
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
    marginVertical: 24,
    paddingHorizontal: 8,
    marginHorizontal: 0, // 40
    borderRadius: 24,
    // borderBottomRightRadius: 8
  },

  error_text: {
    color: '#E37222'
  }

})
  
export default BookingActivity