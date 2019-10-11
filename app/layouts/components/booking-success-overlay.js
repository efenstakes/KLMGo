import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

import { Overlay } from 'react-native-elements'

// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 

export default function BookingSuccessOverlayModal ({ show_overlay, hideModal, width, height }) {
    
  return(
        
    <Overlay
      isVisible={show_overlay}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor='white'
      onBackdropPress={() => hideModal() }
      width='72%' height='72%' 
    >
      {/** width='80%' height='72%'  */}
        
        {/** width='48%' height='48%' */}
        <View style={{ flex: 1, flexDirection: 'row' }}>

          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 10, flexDirection: 'column', alignItems: 'center' }}>

            <Text style={{ marginTop: '8%', fontSize: 16 }}> 
              Thank you for choosing KLM. Your trusted partner. 
            </Text>
            
            <Image
              source={ require('../../assets/icons/klm_go_logo.png') }
              style={[ styles.overlay_image, {
                width: (width/4), 
                height: (width/4), 
                borderRadius: (width/8), 
              } ]}
            />

            <Text style={{ marginTop: '16%', marginBottom: 8, fontSize: 16 }}> 
              Your booking was successfully made 
            </Text>
            <AwesomeIcon name='smile-o' 
                style={{ alignSelf: 'center', fontSize: 56, color: 'lightblue' }}/>
            
            <Button mode='contained' uppercase={ true }
              style={{ position: 'absolute', bottom: '8%', width: '100%', borderRadius: 24 }}
              onPress={ ()=> hideModal() }> Close </Button>

          </View>
          <View style={{ flex: 1 }}></View>

        </View>


    </Overlay>

  )


}

const styles = StyleSheet.create({

  overlay_image: {
    marginTop: 40, 
    // borderColor: 'lightblue', 
    // borderWidth: 1
  },

  cta_btn: {
    marginVertical: 96,
    paddingHorizontal: 8,
    marginHorizontal: 0, 
    borderRadius: 24,
  },



})