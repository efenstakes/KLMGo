import React from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { Paragraph, Button, List } from 'react-native-paper'

import { Rating, Input } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'
  
// custom components
import AppResponseOverlayModal from '../components/app-response-overlay'


// server domain
const SERVER = 'http://localhost:4445'

// faq
class FaqActivity extends React.Component {

  static navigationOptions = { }
  
  constructor(props) {
    super(props)

    this.state = {
      
      faqs: [ ],
      
      rating_text: '', rating: 5,
      show_overlay: false
    }

    this.submitRating = this.submitRating.bind(this)
    this.ratingCompleted = this.ratingCompleted.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.getFaqs = this.getFaqs.bind(this)
  }
  
  componentDidMount() {
    this.getFaqs()
  }


  render() {
    return (
      <ScrollView style={ styles.page }>
        
                
        <View style={{ flex: 1, marginHorizontal: '4%', marginVertical: '4%' }}>

          {/* <View style={{ flex: 1 }}></View>
          <View style={{ flex: 3, paddingHorizontal: 24 }}> */}

          <Image
                source={ require('../../assets/images/faq.jpg') }
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



        {/* <List.Section> * title="some text" */}
        {
          this.state.faqs.map((faq, index)=> {
            return (
              <List.Accordion
                key={index} title={ faq.question }
                left={props => <List.Icon {...props} icon="info" />}
              >
                <List.Item 
                     description={ faq.answer } descriptionNumberOfLines="4" />
              </List.Accordion>
            )
          })
        }
        {/* </List.Section> */}


        {/** overlay modal to show when user makes a rating */}
        <AppResponseOverlayModal 
              show_overlay={this.state.show_overlay} 
              hideModal={ this.hideModal } 
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
                value={ this.state.rating_text }
                onChangeText={text => this.setState({ rating_text: text })  }
                leftIcon={{ type: 'ionicons', name: 'create' }}
            />
          {/** rating response */}

          <Button uppercase={false} mode="contained" onPress={ this.submitRating } style={ styles.rating_button }>
            Rate The Instructions
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
  
  //  submit rating 
  async submitRating() {
    this.setState({ show_overlay: true })

    let { rating, rating_text } = this.state
    
    const netCall = await fetch(`${SERVER}/api/faq/rating/no-auth`, {
      method: 'post', body: JSON.stringify({ rating, message: rating_text, section: 'FAQ' })
    })
  }

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
