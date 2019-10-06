import React from 'react'
import { StyleSheet, ScrollView, View, Image, Linking } from 'react-native'
import { Paragraph, Button, List, Colors, Text, TextInput } from 'react-native-paper'
import { Input } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'

// custom components
import ContactItem from '../components/contact-item'
import AppResponseOverlayModal from '../components/app-response-overlay'


// talk to us
class TalkToUsActivity extends React.Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      response_text: '', response_text_error: '',
      show_overlay: false
    }
    
    this.submitResponse = this.submitResponse.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  
  render() {
    return (
      <ScrollView>

        
        <View style={{ flex: 1, marginHorizontal: '4%', marginTop: '4%' }}>

          <Image
                source={ require('../../assets/images/talk_to_us.jpg') }
                style={{ 
                  height: 200, 
                  width: '100%', 
                  borderRadius: 16,
                  justifyContent: 'center',
                  // margin: 24,
                  // marginRight: 240
                }} 
            />

        </View>



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
              <Button style={{ height: 32 }} onPress={ ()=> Linking.openURL('tel:0799919960') }>
                0799919960
              </Button>
              <Button style={{ height: 32 }} onPress={ ()=> Linking.openURL('tel:0799919960') }>
                0799919960
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
                      onPress={ ()=> Linking.openURL('whatsapp://send?phone=0799919960') }>
                0799919960
              </Button>
              <Button style={{ height: 32 }} 
                      onPress={ ()=> Linking.openURL('whatsapp://send?phone=0799919960') }>
                0799919960
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
                      onPress={ ()=> Linking.openURL('mailto:support.klm.go@gmail.com?subject=Support&body=') }>
                klm.go@gmail.com
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
                label='Write a note for us' 
                mode='flat' multiline={true} numberOfLines={4}
                value={this.state.response_text}
                onChangeText={(text) => this.setState({ response_text: text })}
                leftIcon={{ type: 'ionicons', name: 'create' }}
                errorMessage={ this.state.response_text_error }
                errorStyle={{ color: '#E37222' }}
              />

            <Button uppercase={false} mode="contained" onPress={ this.submitResponse } 
                    style={ styles.response_button }>
              Drop my Note
            </Button>

          </View>
          {/** <View style={ styles.response_form_container }> */}
          

          {/** overlay modal to show when user makes a rating */}
          <AppResponseOverlayModal 
                show_overlay={this.state.show_overlay} 
                hideModal={ this.hideModal } 
            ></AppResponseOverlayModal>
          {/** overlay modal to show when user makes a rating */}
         


        </View>

      </ScrollView>
    )
  }// render() { .. }


  // submit what user wrote
  async submitResponse() {
    // reset response error
    this.setState({ response_text_error: '' })

    // get response data
    let { response_text, response_text_error } = this.state
    
    // sanitize data
    response_text = response_text.trim()

    if( response_text.length < 20 ) {
      response_text_error = 'Please write something to submit'
      this.setState({ response_text_error })
      return
    }

    // make network request here
    this.setState({ show_overlay: true })
    
    try{
      await fetch(`${SERVER}/api/faq/rating/no-auth`, {
        method: 'post', body: JSON.stringify({ rating: 4, message: response_text, section: 'OTHER' })
      })  
    }catch(e) {}

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
