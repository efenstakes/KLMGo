import React from 'react'
import { 
        View, StyleSheet, ScrollView, AsyncStorage, Image, ImageBackground 
      } from 'react-native'
import { 
          Paragraph, Button, Text
      } from 'react-native-paper'

import { Rating, Input } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'

// custom components
import AppResponseOverlayModal from '../components/app-response-overlay'

// instruction containers
import LuggageInstructions from '../components/instructions/luggage'
import GroupsInstructions from '../components/instructions/groups'
import BabiesInstructions from '../components/instructions/babies'
import PetsInstructions from '../components/instructions/pets'


// server domain
const SERVER = 'http://localhost:4445'

// Instruction
class InstructionActivity extends React.Component {
  
  constructor(props) {
    super(props)
  
    this.state = {

      instructions: [],

      rating_text: '', rating: 5,
      show_overlay: false

    }
    
    this.goToBook = this.goToBook.bind(this)
    this.ratingCompleted = this.ratingCompleted.bind(this)
    this.submitRating = this.submitRating.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.getInstructions = this.getInstructions.bind(this)
  }

  componentDidMount() {
    // this.getInstructions()
  }

  componentWillUnmount() {
    this.setState({ show_overlay: false })
  }
  
  render() {
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
        image = require('../../assets/images/klm-2.jpg')
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
        {/** padding: 48 */}
   
        {/* <Image
                source={ require('../../assets/images/klm-1.jpg') }
                style={{ 
                  height: 176,
                  width: '100%', 
                  borderRadius: 16,
                  justifyContent: 'center',
                  // margin: 24,
                  // marginRight: 240
                }} 
            />      */}
        
        <View style={{ flex: 1, marginHorizontal: '8%', marginVertical: '4%' }}>

          {/* <View style={{ flex: 1 }}></View>
          <View style={{ flex: 3, paddingHorizontal: 24 }}> */}

          <Image
                source={ image } 
                style={{ 
                  height: 200, 
                  width: '100%', 
                  borderRadius: 16,
                  justifyContent: 'center',
                  // margin: 24,
                  // marginRight: 240
                }} 
            />

          {/* </View>
          <View style={{ flex: 1 }}></View> */}

        </View>


        {/** instructions container */}
        { instruction_set_container }
        {/** instructions container */}

        {/** overlay modal to show when user makes a rating */}
          <AppResponseOverlayModal 
              show_overlay={this.state.show_overlay} 
              hideModal={ this.hideModal } 
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
    let { rating, rating_text } = this.state
    
    const netCall = await fetch(`${SERVER}/api/faq/rating/no-auth`, {
      method: 'post', body: JSON.stringify({ rating, message: rating_text, section: (service.title).toUpperCase() })
    })
  }

  // hide the overlay modal
  hideModal() {
    this.setState({ show_overlay: false })
  }

  async getInstructions() {

    let instructions = [ 
      "Look for the kid in question",
      "Ensure that you also go online and fill the minors form",
      "The child has to be tested for any diseases before travel",
      "The child has to be checked, vaccinated against any diseases before travel",
      "The child has to be **** for any diseases before travel",
      "The child has to be ++++ for any diseases before travel"
    ]
    this.setState({ instructions })
    return
    try{
      const instructionCall = await fetch(`${SERVER}/api/instruction`)
      const instructions = await instructionCall.json()
      this.setState({ instructions: instructions })
    }catch(e){}

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