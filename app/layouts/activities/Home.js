import React from 'react'
import { View, ScrollView, AsyncStorage, StyleSheet, Image, ImageBackground } from 'react-native'
import { Paragraph, Button, Text } from 'react-native-paper'

import { Card, Icon } from 'react-native-elements'

// components
import HomeServiceCard from '../components/home-service-card'


// server domain
const SERVER = 'http://localhost:4445'

// home  
class HomeActivity extends React.Component {
  static navigationOptions = {
    // header: null, headerLeft: null,
    title: 'Explore Our Services'
  }

  constructor(props) {
    super(props)

    this.state = {

      services: [
        { 
          name: 'luggage', act_name: 'luggage', title: 'Luggage',
          woo_text: 'Travelling with heavy luggage or want to ship heavy luggage?',
          image: require('../../assets/images/klm-2.jpg') 
        },
        { 
          name: 'babies', act_name: 'umnr', title: 'Babies',
          woo_text: 'Book for an unaccompanied minor or get instructions of how to book for babies here.',
          image: require('../../assets/images/baby-cropped.jpg') 
        },
        { 
          name: 'pets', act_name: 'pet', title: 'Pets',
          woo_text: 'Travelling the world with pets has never been this easy. Book or get instructions here.',
          image: require('../../assets/images/pets.jpg') 
        },
        { 
          name: 'group', act_name: 'group', title: 'Groups',
          woo_text: 'Want to know how to book and travel as a group?',
          image: require('../../assets/images/friends.jpg')
        }
      ]

    }

    this.viewServiceInstructions = this.viewServiceInstructions.bind(this)
  }

  componentDidMount() {
    // AsyncStorage.setItem('testkeya', 'some string here')
  }// componentWillMount() { .. }
    
  render() {
    return (
      <ScrollView>

        {/* <Card
            containerStyle={{ 
                  overflow: 'hidden', borderBottomRightRadius: 16,
                  borderBottomLeftRadius: 16
                }}
            featuredSubtitle={ 'Check Out Our New Services' }
            featuredSubtitleStyle={{ position: 'absolute', bottom: 8, left: 8 }}
            image={ require('../../assets/images/klm-1.jpg') }
          /> */}

        <ImageBackground
                source={ require('../../assets/images/plane_wing.jpg') }
                style={{ 
                  width: '100%', height: 200, 
                  borderRadius: 50,
                  borderBottomLeftRadius: 16, 
                  borderBottomRightRadius: 16, 
                  justifyContent: 'flex-end',
                  marginBottom: 24,
                  // transform: [{ rotate: '180deg' }]
                }} 
            >

            <Image
                source={ require('../../assets/icons/klm_go_logo.png') } 
                style={{ 
                  height: 112, width: 112, 
                  borderRadius: 56,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  // margin: 24,
                  // marginRight: 240
                }} 
            />  

            <Text style={{ 
                    marginBottom: 16, marginLeft: 16, fontSize: 18,
                    fontWeight: 'bold', color: 'black',
                    alignSelf: 'center' 
                  }}> 
              {/* Travel the world with us */}
              Travel the world with a trusted partner
            </Text>
        </ImageBackground>

        {/* <Image
                source={ require('../../assets/images/container_background.png') }
                style={{ height: '10%', width: '100%', zIndex: auto }} // , rotation: '180deg'
            /> */}

        {/* <View style={{ display: none, zIndex: 10, top: 24, left: 24, right: 24, height: '24%', backgroundColor: 'red', color: 'yellow' }}>
            
        </View> */}

        
        {
          this.state.services.map((service, index)=> {
            return <HomeServiceCard key={index} 
                        service={service} 
                        onServiceClick={this.viewServiceInstructions} 
                      />
          })
        }


      {/** book now cta */}
      <View style={{ flex: 1, alignItems: 'stretch', marginVertical: 24, marginHorizontal: 8 }}>
        <Button icon='flight' mode='contained' style={ styles.booking_button }
                onPress={ ()=> this.props.navigation.navigate('Book') }> 
                Book Now 
        </Button>
      </View>
      {/** book now cta */}

      </ScrollView>
    )
  }// render() { .. }

  // redirect user to instrction page
  async viewServiceInstructions(service) {
        
    try{
      await fetch(`${SERVER}/api/faq/visit/no-auth`, {
        method: 'post', body: JSON.stringify({ section: (service.title).toUpperCase() })
      })  
      // alert('made')
    }catch(e) {
      // alert(`error in visit ${e}`)
    }

    this.props.navigation.navigate('Instruction', { service: service })
  }
  
}

const styles = StyleSheet.create({

  booking_button: {
    // paddingHorizontal: 32, 
    // paddingVertical: 8, 
    borderRadius: 40,
    // borderBottomRightRadius: 8,
    height: '100%'
  }

})

export default HomeActivity