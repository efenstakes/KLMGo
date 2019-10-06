import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { Overlay } from 'react-native-elements'

// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 

export default function BookingSuccessOverlayModal ({ show_overlay, hideModal }) {
    
  return(
        
    <Overlay
      isVisible={show_overlay}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor='white'
      onBackdropPress={() => hideModal() }
      width='80%' height='72%' 
    >
      {/** width='48%' height='48%' */}
      <View style={{ flex: 1, flexDirection: 'row' }}>

        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 10, flexDirection: 'column', alignItems: 'center' }}>

          <Text style={{ marginTop: 16, fontSize: 16 }}> 
            Thank you for choosing KLM. Your trusted partner. 
          </Text>
          
          <Image
            source={ require('../../assets/icons/klm_go_logo.png') }
            style={ styles.overlay_image }
          />

          <Text style={{ marginTop: 48, fontSize: 16 }}> 
            Your booking was successfully made 
          </Text>
          <AwesomeIcon name='smile-o' 
              style={{ alignSelf: 'center', fontSize: 40, color: 'lightblue' }}/>
          
          <Button mode='contained'
            style={{ position: 'absolute', bottom: 16, width: '100%' }}
            onPress={ ()=> hideModal() }> Close </Button>

        </View>
        <View style={{ flex: 1 }}></View>

      </View>
    </Overlay>

  )


}

const styles = StyleSheet.create({

  overlay_image: {
    width: '80%', 
    height: '40%', 
    borderRadius: 90, 
    marginTop: 32, 
    // borderColor: 'lightblue', 
    // borderWidth: 1
  }



})