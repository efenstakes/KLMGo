import React from 'react'
import { View, ScrollView, AsyncStorage, StyleSheet, Image } from 'react-native'
import { Paragraph, Button, Text } from 'react-native-paper'

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
          woo_text: 'Want to ship heavy luggage?' 
        },
        { 
          name: 'babies', act_name: 'umnr', title: 'Babies',
          woo_text: 'Want to know how to book for babies?' 
        },
        { 
          name: 'pets', act_name: 'pet', title: 'Pets',
          woo_text: 'Want to know how to book for pets?' 
        },
        { 
          name: 'group', act_name: 'group', title: 'Groups',
          woo_text: 'Want to know how to book and travel as a group?' 
        }
      ]

    }

    this.viewServiceInstructions = this.viewServiceInstructions.bind(this)
  }

  componentWillMount() {
    // AsyncStorage.setItem('testkeya', 'some string here')
  }// componentWillMount() { .. }
    
  render() {
    return (
      <ScrollView>

        {/* <Image
                source={ require('../../assets/images/container_background.png') }
                style={{ height: '10%', width: '100%', zIndex: auto }} // , rotation: '180deg'
            />

        <View style={{ display: none, zIndex: 10, top: 24, left: 24, right: 24, height: '24%', backgroundColor: 'red', color: 'yellow' }}>
            
        </View> */}

        
        {
          this.state.services.map((service, index)=> {
            return <HomeServiceCard key={index} service={service} onServiceClick={this.viewServiceInstructions} />
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