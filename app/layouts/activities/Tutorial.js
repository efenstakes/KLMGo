import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Paragraph, Button, Text } from 'react-native-paper'


import Swiper from 'react-native-swiper'

// tutorial page
class TutorialActivity extends React.Component {

  static navigationOptions = {
    header: null
  }
 
  
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} 
              dotColor='#00A1DE' activeDotColor='#003F72' loop={false}>
      
        <View style={styles.slide1}>
          <View style={styles.slide_upper_container}>
            
            <Image
              source={ require('../../assets/images/klm-1.jpg') }
              style={ styles.klm_upper_slide_image }
            />
            {/* <Text style={ styles.woo_text_one }> Ont go </Text> */}
            
          </View>
          <View style={styles.slide_lower_container}>
            <Text style={styles.text}>
              Explore your journeys of inspirations with KLM Go
            </Text>
          </View>
        </View>
        
        <View style={styles.slide2}>
          <View style={styles.slide_upper_container}>
            
            <Image
              source={ require('../../assets/images/klm-2.jpg') }
              style={ styles.klm_upper_slide_image }
            />
            {/* <Text style={ styles.woo_text_one }> Two to go </Text> */}
            
          </View>
          <View style={styles.slide_lower_container}>
            <Text style={styles.text}> 
              Travelling with pets, in groups, with huge luggage or 
              unaccompanied minors? we have you sorted 
            </Text>
          </View>
        </View>

        <View style={styles.slide3}>
          
          <View style={styles.slide_upper_container}>
            
            <Image
              source={ require('../../assets/images/klm-3.jpg') }
              style={ styles.klm_upper_slide_image }
            />
            {/* <Text style={ styles.woo_text_one }> Close to go </Text> */}
            
          </View>
          <View style={styles.slide_lower_container}>
            <Text style={styles.text}> 
              Get the best deals all year round with us with just a click
            </Text>
          </View>
          
        </View>

        <View style={styles.slide4}>
          
          <View style={styles.slide_upper_container}>
            
            <Image
              source={ require('../../assets/images/klm-4.jpg') }
              style={ styles.klm_upper_slide_image }
            />
            {/* <Text style={ styles.woo_text_one }> Hello lets go </Text> */}
            
          </View>
          <View style={styles.slide_lower_container}>
            <Text style={styles.text}> 
              Now you're ready to KLM Go
            </Text>

            <Button onPress={ ()=> this.props.navigation.navigate('AppHome') }
                    uppercase={false} mode="contained"
                    style={ styles.lets_go_button }
            > Ready, Let's Go </Button>

          </View>
          
          
        </View>

      </Swiper>
    )
  }// render() { .. }
  
}


const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    backgroundColor: '#2cdeea', // '#9DD6EB',
    width: '100%'
  },
  slide2: {
    flex: 1,
    backgroundColor: '#5EB6E4', // '#97CAE5',
  },
  slide3: {
    flex: 1,
    backgroundColor: '#00A1DE', // '#92BBD9',
  },
  slide4: {
    flex: 1,
    backgroundColor: '#005B82', // '#92BBD9',
  },

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
  lets_go_button: {
    borderRadius: 50, 
    marginTop: '8%'
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

export default TutorialActivity  