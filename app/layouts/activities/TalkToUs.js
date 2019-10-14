import React from 'react'
import { StyleSheet, ScrollView, View, Image, Linking, Dimensions } from 'react-native'
import { Paragraph, Button, List, Colors, Text, TextInput } from 'react-native-paper'
import { Input } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'

import AsyncStorage from '@react-native-community/async-storage'
 
// custom components
import ContactItem from '../components/contact-item'
import AppResponseOverlayModal from '../components/app-response-overlay'
import ActivityTopImage from '../components/activity-top-image'

// storage
import Storage from '../../models/storage'
// server domain
import Net from '../../models/net'



// talk to us
class TalkToUsActivity extends React.Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      response_text: '', response_text_error: '',
      show_overlay: false,
      is_submitting_rating: false, 

      user: {}
    }
    
    this.submitResponse = this.submitResponse.bind(this)
    this.hideModal = this.hideModal.bind(this)

    this.getUserIfAny = this.getUserIfAny.bind(this)
  }//constructor(props) { .. }

  componentDidMount() {
    this.getUserIfAny()
  }
  
  render() {
    let height = Dimensions.get('window').height
    let width = Dimensions.get('window').width
    let image_height = height/4

    return (
      <ScrollView>

        <ActivityTopImage image={ require('../../assets/images/talk_to_us.jpg') }
                          height={ image_height } />


        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'flex-start', height: '100%' }}>

          <Paragraph style={{
            marginTop: '8%', marginLeft: '4%', fontSize: 28, lineHeight: 40, 
            marginBottom: '4%'
          }}> We are always listening </Paragraph>  

         
          {/** call */}
          <View style={{ 
            flex: 1, flexDirection: 'row', width: '100%', height: 100
            }}>

            <View style={{ 
              flex: 1, alignContent: 'center', alignItems: 'flex-end', height: 44 
              }}>
              {/* <Text> Image </Text> */}
              <Image
                source={ require('../../assets/icons/phone.png') }
                style={{ height: 88, width: 88 }}
              />
            </View>
            <View style={{ 
                    flex: 2,  paddingTop: 0, marginLeft: 16, alignContent: 'flex-start', alignItems: 'flex-start', height: 44 
                  }}>
              <Button style={{ height: 32 }} onPress={ ()=> Linking.openURL('tel:+254721222888') }>
                +254721222888
              </Button>
              <Button style={{ height: 32 }} onPress={ ()=> Linking.openURL('tel:+254711333888') }>
                +254711333888
              </Button>
            </View>

          </View>
          {/** call */}


          {/** whatsapp */}
          <View style={{ 
            flex: 1, flexDirection: 'row', width: '100%' 
            }}>

            <View style={{ 
              flex: 1, alignContent: 'center', alignItems: 'flex-end' 
              }}>
              {/* <Text> Image </Text> */}
              <Image
                source={ require('../../assets/icons/whatsapp.png') }
                style={{ height: 88, width: 88 }}
              />
            </View>
            <View style={{ 
                    flex: 2,  paddingTop: 0, marginLeft: 16, alignItems: 'flex-start' 
                  }}>
              <Button style={{ height: 32 }} 
                      onPress={ ()=> Linking.openURL('whatsapp://send?phone=+254721222888') }>
                +254721222888
              </Button>
              <Button style={{ height: 32 }} 
                      onPress={ ()=> Linking.openURL('whatsapp://send?phone=+254711333888') }>
                +254711333888
              </Button>
            </View>

          </View>
          {/** whatsapp */}


          {/** email */}
          <View style={{ 
            flex: 1, flexDirection: 'row', width: '100%'  
            }}>

            <View style={{ 
              flex: 1, alignContent: 'center', alignItems: 'flex-end' 
              }}>
              {/* <Text> Image </Text> */}
              <Image
                source={ require('../../assets/icons/email.png') }
                style={{ height: 88, width: 88 }}
              />
            </View>
            <View style={{ 
                    flex: 2,  paddingTop: 16, marginLeft: 16, alignItems: 'flex-start' 
                  }}>
              <Button style={{ height: 32 }} 
                      onPress={ ()=> Linking.openURL('mailto:care.klm.go@klm.com?subject=Support&body=') }>
                care.klm.go@klm.com
              </Button>
            </View>

          </View>
          {/** email */}


          {/** <View style={ styles.response_form_container }> */}
          <View style={ styles.response_form_container }>
          
            <Paragraph style={{ 
                              fontSize: 24, lineHeight: 32, marginTop: '4%',
                              marginBottom: '8%' 
                            }}> 
              Would you rather write us? 
            </Paragraph>

      
            <Input
                label='Write a note to us' 
                mode='flat' multiline={true} numberOfLines={4}
                value={this.state.response_text}
                onChangeText={(text) => this.setState({ response_text: text })}
                leftIcon={{ type: 'ionicons', name: 'create' }}
                errorMessage={ this.state.response_text_error }
                errorStyle={{ color: '#E37222' }}
              />

            <Button uppercase={false} mode="contained" 
                    loading={ this.state.is_submitting_rating }
                    onPress={ this.submitResponse } 
                    style={ styles.response_button }>
              { this.state.is_submitting_rating ? 'Dropping Your Note' : 'Drop my Note' }
            </Button>

          </View>
          {/** <View style={ styles.response_form_container }> */}
          

          {/** overlay modal to show when user makes a rating */}
          <AppResponseOverlayModal width={ width }
                show_overlay={this.state.show_overlay} hideModal={ this.hideModal } 
            ></AppResponseOverlayModal>
          {/** overlay modal to show when user makes a rating */}
         


        </View>

      </ScrollView>
    )
  }// render() { .. }

 
  // get user from app storage
  async getUserIfAny() {
    let user = await AsyncStorage.getItem(Storage.USER)
    if( user != null ) {
      this.setState({ user: JSON.parse(user) })
    }
  }// async getUserIfAny() { .. }

  // submit what user wrote
  async submitResponse() {
    // reset response error
    this.setState({ response_text_error: '' })

    // get response data
    let { response_text, response_text_error, user } = this.state
    
    // sanitize data
    response_text = response_text.trim()

    if( response_text.length < 20 ) {
      response_text_error = 'Please write something to submit'
      this.setState({ response_text_error })
      return
    }
    
    let rating_data = { rating: 4, message: response_text, section: 'OTHER' }
    
    this.setState({ is_submitting_rating: true })
    // make network request here
    if( !user.hasOwnProperty('password') ) {

      try{
        await fetch(`${Net.SERVER}/api/faq/rating/no-auth`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },  
            body: JSON.stringify(rating_data)
        })  
        this.setState({ is_submitting_rating: false, show_overlay: true })
      }catch(e) {
        this.setState({ is_submitting_rating: false })
      }

    }// if( !user.hasOwnProperty('password') ) { .. }

        
    try{ console.log('rate with token ', token)

      let token = await AsyncStorage.getItem(Storage.TOKEN)
      let token_offer_time = await AsyncStorage.getItem(Storage.TOKEN_TIME)

      console.log('(Date.now() - parseFloat(token_offer_time) ', (Date.now() - parseFloat(token_offer_time)), ' bool ', ((Date.now() - parseFloat(token_offer_time)) > 300000) )

      console.log('vook with token ', token)
      // if token expired
      if( token == undefined || token == null || token_offer_time == null || ((Date.now() - parseFloat(token_offer_time)) > 300000 ) ) {
        console.log('logiin ', user)
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
      this.setState({ is_submitting_rating: false, show_overlay: true })
      console.log('lets rate 2 ', rating_result)
      
    }catch(e) {
      console.log('rating err ', e)
      this.setState({ is_submitting_rating: false })
    }


  }// submitResponse() { .. }

  
  
  // hide the overlay modal
  hideModal() {
    this.setState({ show_overlay: false })
  }


} 
  
const styles = StyleSheet.create({

  response_form_container: {
    padding: '4%'
  },

  response_button: {
    borderRadius: 24,
    marginTop: 24
  },

})
 
export default TalkToUsActivity 
