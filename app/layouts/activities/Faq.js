import React from 'react'
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native'
import { Paragraph, Button, List } from 'react-native-paper'

import { Rating, Input } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage'
 
import Icon from 'react-native-vector-icons/FontAwesome'  

// custom components
import AppResponseOverlayModal from '../components/app-response-overlay'
import ActivityTopImage from '../components/activity-top-image'
import Accordion from '../components/accordion'

// storage
import Storage from '../../models/storage'
// server domain
import Net from '../../models/net'


// faq
class FaqActivity extends React.Component {

  static navigationOptions = { }
  
  constructor(props) {
    super(props)

    this.state = {
      
      faqs: [ ],
      user: {},
      
      rating_text: '', rating: 5,
      show_overlay: false
    }

    this.submitRating = this.submitRating.bind(this)
    this.ratingCompleted = this.ratingCompleted.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.getFaqs = this.getFaqs.bind(this)

    this.getUserIfAny = this.getUserIfAny.bind(this)
  }// constructor(props) { .. }
  
  componentDidMount() {
    this.getFaqs()
    this.getUserIfAny()
  }


  render() {
    let height = Dimensions.get('window').height
    let width = Dimensions.get('window').width
    let image_height = height/4

    return (
      <ScrollView style={ styles.page }>
        
        <ActivityTopImage image={ require('../../assets/images/faq.jpg') }
                          height={ image_height } />



        {/* <List.Section> * title="some text" */}
        {
          this.state.faqs.map((faq, index)=> {
            return (
              // <List.Accordion
              //   key={index} title={ faq.question }
              //   left={props => <List.Icon {...props} icon="info" />}
              //   style={{ margin: 0, paddingVertical: 0 }}
              // >
              //   <List.Item style={{ marginTop: -10, paddingVertical: 0 }}
              //        description={ faq.answer } descriptionNumberOfLines={8} />
              // </List.Accordion>
              <Accordion title={ faq.question } data={ faq.answer } key={index} ></Accordion>
            )
          })
        }
        {/* </List.Section> */}


        {/** overlay modal to show when user makes a rating */}
        <AppResponseOverlayModal width={ width }
              show_overlay={this.state.show_overlay} hideModal={ this.hideModal } 
          ></AppResponseOverlayModal>
        {/** overlay modal to show when user makes a rating */}
         
        {/** response form to rate the faq */} 
        <View style={ styles.response_form_container }>
          
          <Paragraph style={{ fontSize: 20, lineHeight: 24 }}> 
            {/* Tell us how you find the instructions?  */}
            Help us make the instructions better for you
          </Paragraph>

          <Rating
            type='star' style={{ marginBottom: 24 }}
            ratingCount={5} imageSize={40}
            showRating
            ratingTextColor='lightblue'
            onFinishRating={this.ratingCompleted}
            ratingBackgroundColor='black'
            ratingColor='black'
          />

          {/** rating response */}
          <Input
                multiline={true} numberOfLines={4} 
                label='Tell us how you find our instructions'
                labelStyle={{ fontFamily: 'noa' }}
                value={ this.state.rating_text }
                onChangeText={text => this.setState({ rating_text: text })  }
                leftIcon={{ type: 'ionicons', name: 'create' }}
            />
          {/** rating response */}

          <Button uppercase={false} mode="contained" onPress={ this.submitRating } style={ styles.rating_button }>
            Rate The Faq
          </Button>

        </View>
        {/** response form to rate the faq */}
         

        <View style={{ marginBottom: 72 }}></View>

      </ScrollView>
    )
  }// render() { .. }


  // set rating whenever rating is done
  ratingCompleted(rating) {
    this.setState({ rating: rating })
  }

  
  // get user from app storage
  async getUserIfAny() {
    let user = await AsyncStorage.getItem(Storage.USER)
    if( user != null ) {
      this.setState({ user: JSON.parse(user) })
    }
  }// async getUserIfAny() { .. }

  //  submit rating 
  async submitRating() {
    this.setState({ show_overlay: true })

    let { rating, rating_text, user } = this.state
    let rating_data = { rating, message: rating_text, section: 'FAQ' }

    if( !user.hasOwnProperty('password') ) {

      try{
        await fetch(`${Net.SERVER}/api/faq/rating/no-auth`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }, 
          body: JSON.stringify(rating_data)
        })
      }catch(e){ }

      return
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

  // hide the overlay modal
  hideModal() {
    this.setState({ show_overlay: false })
  }

  async getFaqs() {

    let faqs = [
      {
        question: 'Instruction 1',
        answer: 'Look for the kid in question'
      },
      {
        question: 'Instruction 2',
        answer: 'Ensure that you also go online and fill the minors form'
      },
      {
        question: 'Instruction 3',
        answer: 'The child has to be tested for any diseases before travel'
      },
      {
        question: 'Instruction 4',
        answer: 'The child has to be ---- for any diseases before travel'
      },
      {
        question: 'Instruction 5',
        answer: 'The child has to be **** for any diseases before travel'
      },
      {
        question: 'Instruction 6',
        answer: 'The child has to be ++++ for any diseases before travel'
      }
    ]
    this.setState({ faqs: faqs })
    return

    
    
    // try{
    //   const faqCall = await fetch(`${SERVER}/api/faq`)
    //   const faqs = await faqCall.json()
    //   this.setState({ faqs: faqs })
    // }catch(e){ }

  }// async getFaqs() { .. }

  
} 

const styles = StyleSheet.create({

  page: {
    padding: '0%' // '8%'
  },
  
  response_form_container: {
    padding: '4%', // '4%'
    marginTop: 40,
    marginBottom: 40,
    // height: '100%'
  },

  rating_button: {
    borderRadius: 24,
    marginTop: 24
  },

  response_form_emojis: {
      flex: 1, alignItems: 'center', alignContent: 'center',
      justifyContent: 'center', 
      flexDirection: 'row', height: 120, padding: 16, margin: 8 
  }


})


export default FaqActivity
