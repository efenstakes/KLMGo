import React from 'react'
import { 
        View, StyleSheet, ScrollView, Image, ImageBackground, Dimensions 
      } from 'react-native'
import { Paragraph, Button, Text } from 'react-native-paper'

import { Rating, Input } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage'
 
import Icon from 'react-native-vector-icons/FontAwesome'

// custom components
import AppResponseOverlayModal from '../components/app-response-overlay'

// instruction containers
import LuggageInstructions from '../components/instructions/luggage'
import GroupsInstructions from '../components/instructions/groups'
import BabiesInstructions from '../components/instructions/babies'
import PetsInstructions from '../components/instructions/pets'


// storage
import Storage from '../../models/storage'
// server domain
import Net from '../../models/net'



// Instruction
class InstructionActivity extends React.Component {
  
  constructor(props) {
    super(props)
  
    this.state = {

      instructions: [],
      user: {},

      rating_text: '', rating: 4,
      show_overlay: false

    }
    
    this.goToBook = this.goToBook.bind(this)
    this.ratingCompleted = this.ratingCompleted.bind(this)
    this.submitRating = this.submitRating.bind(this)
    this.hideModal = this.hideModal.bind(this)

    this.getUserIfAny = this.getUserIfAny.bind(this)
    this.addVisit = this.addVisit.bind(this)
  }// constructor(props) { .. }

  componentDidMount() {
    // this.getInstructions()
    this.getUserIfAny()
  }

  componentWillUnmount() {
    this.setState({ show_overlay: false })
  }
  
  render() {
    let height = Dimensions.get('window').height
    let width = Dimensions.get('window').width
    let image_height = height/4

    let service = this.props.navigation.getParam('service')
    let instruction_set_container = null

    let image = null
    let service_title = service.title.toLowerCase()
    switch ( service_title ) {
      case 'babies':
        instruction_set_container = <BabiesInstructions />
        image = require('../../assets/images/baby.jpg')
        break;
      case 'groups':
        instruction_set_container = <GroupsInstructions />
        image = require('../../assets/images/friends.jpg')
        break;
      case 'luggage':
        instruction_set_container = <LuggageInstructions />
        image = require('../../assets/images/baggage.jpg')
        break;
      case 'pets':
        instruction_set_container = <PetsInstructions />
        image = require('../../assets/images/pets.jpg')
        break;
    
      default:
        break;
    }

    return (
      <ScrollView style={{ width: '100%' }}> 
        
        <View style={{ flex: 1, marginHorizontal: '8%', marginVertical: '4%' }}>

          <Image
                source={ image } 
                style={{ 
                  height: image_height, 
                  width: '100%', 
                  borderRadius: 16,
                  justifyContent: 'center',
                  // margin: 24,
                  // marginRight: 240
                }} 
            />

        </View>


        {/** instructions container */}
        { instruction_set_container }
        {/** instructions container */}

        {/** overlay modal to show when user makes a rating */}
          <AppResponseOverlayModal  width={ width }
              show_overlay={this.state.show_overlay} hideModal={ this.hideModal } 
          ></AppResponseOverlayModal>
        {/** overlay modal to show when user makes a rating */}
         
        {/** rating form */}
        <View style={ styles.response_form_container }>
          
          <Paragraph style={{ fontSize: 24, lineHeight: 32 }}> 
            Tell us how do you find the instructions? 
          </Paragraph>

          <Rating
            type='star' style={{ marginVertical: 24 }} /** 24 */
            ratingCount={5} imageSize={40}
            showRating
            ratingTextColor='lightblue'
            onFinishRating={this.ratingCompleted}
          />

          {/** rating response */}
          <Input
                    multiline={true} numberOfLines={4} 
                    label='Tell us how you find our instructions'
                    value={ this.state.rating_text }
                    onChangeText={text => this.setState({ rating_text: text })  }
                    leftIcon={{ type: 'ionicons', name: 'create' }}
                />
          {/** rating response */}

          <Button uppercase={false} mode="contained" onPress={ this.submitRating } style={ styles.rating_button }>
            Rate The Instructions
          </Button>

        </View>
        {/** rating form */}
        
        {/** book now cta */}
        <View style={{ flex: 1, alignItems:'stretch', marginHorizontal: 56 }}>
        
          <Button icon='flight' mode='outlined' onPress={ this.goToBook } 
                  style={ styles.booking_button }> Book Now </Button>
        
        </View>
        {/** book now cta */}

        <View style={{ marginBottom: 40 }}></View>

      </ScrollView>
    )
  }// render() { .. }
  
  // get user from app storage
  async getUserIfAny() {
    let user = await AsyncStorage.getItem(Storage.USER)
    if( user != null ) {
      this.setState({ user: JSON.parse(user) })
      this.addVisit()
    }
  }// async getUserIfAny() { .. }

  // set rating whenever rating is done
  ratingCompleted(rating) {
    this.setState({ rating: rating })
  }

  // redirect to booking page
  goToBook() {
    this.props.navigation.navigate('Book')
  }

  //  submit rating 
  async submitRating() {
    this.setState({ show_overlay: true })

    let service = this.props.navigation.getParam('service') 
    let { rating, rating_text, user } = this.state
    let rating_data = { rating, message: rating_text, section: (service.act_name).toUpperCase() }

    if( !user.hasOwnProperty('password') ) {

      try{

        await fetch(`${Net.SERVER}/api/faq/rating/no-auth`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify(rating_data)
        })
  
      }catch(e){  }

    }// if( !user.hasOwnProperty('password') ) { .. }

    
        
    try{ console.log('rate with token ', token)

      let token = await AsyncStorage.getItem(Storage.TOKEN)
      let token_offer_time = await AsyncStorage.getItem(Storage.TOKEN_TIME)

      console.log('(Date.now() - parseFloat(token_offer_time) ', (Date.now() - parseFloat(token_offer_time)), ' bool ', ((Date.now() - parseFloat(token_offer_time)) > 300000) )

      console.log('vook with token ', token)
      // if token expired
      if( token == undefined || token == null || token_offer_time == null || ((Date.now() - parseFloat(token_offer_time)) > 300000 ) ) {
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
      }// if( token_offer_time == null || (Date.now() .. }

      console.log('lets rate ')
      let rating_result = await fetch(`${Net.SERVER}/api/faq/rating/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(rating_data)
      })

      console.log('lets rate 2 ', rating_result)
      
      
    }catch(e) {
      console.log('rating err ', e)
    }




  }// async submitRating() { .. }


  async addVisit() {
    let { user } = this.state
    let service = this.props.navigation.getParam('service')
    let visit_data = { section: (service.act_name).toUpperCase() }

    if( !user.hasOwnProperty('password') ) {

      fetch(`${Net.SERVER}/api/faq/visit/no-auth`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }, 
        body: JSON.stringify(visit_data)
      }) 
      .then((req)=> req.json()).then((res)=> { return })
      .catch((error)=>{
        console.log('error in no auth ', error)
        return
      }) 
      
      
    }// if( !user.hasOwnProperty('password') ) { .. }


    let token = await AsyncStorage.getItem(Storage.TOKEN)
    let token_offer_time = await AsyncStorage.getItem(Storage.TOKEN_TIME)

    console.log('(Date.now() - parseFloat(token_offer_time) ', (Date.now() - parseFloat(token_offer_time)), ' bool ', ((Date.now() - parseFloat(token_offer_time)) > 300000) )

    console.log('visit with token ', token)
    // if token expired
    if( token == undefined || token == null || token_offer_time == null || ((Date.now() - parseFloat(token_offer_time)) > 300000 ) ) {
      console.log('logiin ', user)
      fetch(`${Net.SERVER}/api/user/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }, 
        body: JSON.stringify({ email: user.email, password: user.password })
      })
      .then((rq)=> rq.json())
      .then((res)=> {

          AsyncStorage.setItem(Storage.TOKEN, res.token)
          AsyncStorage.setItem(Storage.TOKEN_TIME, (Date.now()).toString() )
          
          // add visit
          console.log('calling this.addVisit')
          console.log('lets visit ')
          fetch(`${Net.SERVER}/api/faq/visit/`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${res.token}`
            }, 
            body: JSON.stringify(visit_data)
          })
          .then((req)=> req.json())
          .then((res)=> {
            console.log('visit added ', res) 
            return
          })
          .catch((error)=> {
            console.log('visit err ', error) 
            return
          })

      })
      .catch((error)=> { 
        console.log('promise error')
        return
      })

    }// if( token_offer_time == null || (Date.now() .. }

    console.log('lets visit ')
    fetch(`${Net.SERVER}/api/faq/visit/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }, 
      body: JSON.stringify(visit_data)
    })
    .then((req)=> req.json())
    .then((res)=> { console.log('visit 2 added ', res) })
    .catch((error)=> { console.log('visit 2 err ', error) })

  }// addVisit(status) { .. }


  // hide the overlay modal
  hideModal() {
    this.setState({ show_overlay: false })
  }


  
} 

const styles = StyleSheet.create({

  instruction_container: {
    // flex: 1,
    width: '100%',
    paddingLeft: '8%',
    paddingRight: '8%',
    // backgroundColor: 'yellow'
  },

  instruction_text: {
    fontSize: 16,
    fontFamily: 'verdana',
    lineHeight: 32,
    letterSpacing: 1,
    marginVertical: 8
  },

  book_floating_button: {
    position: 'relative',
    bottom: '2%',
    // justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center'
  },

  fab: {
    position: 'absolute',
    // margin: 16,
    // right: '42%',
    bottom: 0,
  },

  response_form_container: {
    paddingHorizontal: '8%',
    paddingVertical: '4%'
  },

  rating_button: {
    borderRadius: 24,
    marginTop: 24,
    marginBottom: 40
  },

  response_form_emojis: {
    flex: 1, alignItems: 'center', alignContent: 'center',
    justifyContent: 'center', 
    flexDirection: 'row', height: 120, padding: 16, margin: 8 
  },

  booking_button: {
    borderRadius: 40,
    // borderBottomRightRadius: 8
  }

})

export default InstructionActivity