import React from 'react'
import { StyleSheet, View, Image } from 'react-native'



export default function TutorialItem({ color, woo_text, image }) {
    return (
        
        <View style={{ backgroundColor: color }}>
          <View style={styles.slide_upper_container}>
            
            {/* <Image
              source={ require(image) }
              style={ styles.klm_upper_slide_image }
            /> */}
            {/* <Text style={ styles.woo_text_one }> Ont go </Text> */}
            
          </View>
          <View style={styles.slide_lower_container}>
            <Text style={styles.text}>
              { woo_text }
            </Text>
          </View>
        </View>
        
    )
}



const styles = StyleSheet.create({
   
    slide_upper_container: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'black'
    },
    slide_lower_container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      // backgroundColor: 'green' 
      paddingHorizontal: 16
    },
    klm_upper_slide_image: {
      height: '72%', // 440,
      width: '88%', // 440,
      borderRadius: 16,
      resizeMode: 'stretch',
      // marginBottom: '0%',
      marginTop: '4%'
    },
  
    woo_text_one: {
      marginTop: '2%',
      fontSize: 16
    },
  
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }
  })
  