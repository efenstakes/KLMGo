import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { Overlay } from 'react-native-elements'


export default AppResponseOverlayModal = ({ show_overlay, hideModal, width })=> {
    
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

          <Text style={{ marginTop: '8%', fontSize: 16 }}> Thank you for your rating </Text>
          
          <Image
            source={ require('../../assets/icons/klm_go_logo.png') }
            style={[ styles.overlay_image, {
              width: (width/2), 
              height: (width/2), 
              borderRadius: (width/4), 
            } ]}
          />

          <Text style={{ marginTop: '16%', fontSize: 16 }}> 
            We are always listening 
          </Text>
          
          <Button mode='contained' uppercase={ false }
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
    width: '80%', 
    height: '40%', 
    borderRadius: 90, 
    marginTop: 32, 
    // borderColor: 'lightblue', 
    // borderWidth: 1
  }



})