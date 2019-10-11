import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { 
         Paragraph, Button, Text, ActivityIndicator, Colors 
       } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

import AsyncStorage from '@react-native-community/async-storage'

// storage vars
import Storage from '../../models/storage'


// splash screen page
class SplashScreenActivity extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = { todos: [] }

    this.goNext = this.goNext.bind(this)
  }

  componentDidMount() { 
    this.timeout = setTimeout(()=> this.goNext() , 400)
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }


  render() {
    let { navigation } = this.props
    return (
      <View style={styles.page}>
        <LinearGradient 
           start={{x: 0, y: 0}} end={{x: 1, y: 1}} 
          //  locations={[0,0.5,0.6]}
           colors={['#2cdeea', '#005B82']} 
           style={[ styles.page, { flex: 1, width: '100%' } ]}>
        
            <Text style={styles.title_one}> KLM Go </Text>
            {/* <Paragraph style={{ fontFamily: 'noa', fontSize: 32 }}> KLM GO </Paragraph> */}
            
            <Image
                source={ require('../../assets/icons/klm_go_logo.png') }
                style={ styles.klm_image }
              />

            <ActivityIndicator animating={true} color='#003145'
                  size='40' style={ styles.klm_spinner } />  

            <Text style={styles.klm_brandtext}>
              Journeys of Inspiration made convenient
            </Text>
            
      </LinearGradient>
      </View>
    )
  }// render() { .. }


  async goNext() {
    const hasVisited = await AsyncStorage.getItem(Storage.IS_FIRST_VISIT)

    if( hasVisited == null ) {
      this.props.navigation.navigate('Tutorial')
      return
    }

    this.props.navigation.navigate('AppHome')
  }// async goNext() { .. }

  
}



const styles = StyleSheet.create({
  
  page: {
    // backgroundColor: '#00A1DE',
    // opacity: 0.5,
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  title_one: {
    marginTop: '16%',
    color: 'black',
    fontSize: 32,
    // fontWeight: 'bold',
    // fontFamily: 'noa'
  },

  klm_image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'stretch',
    marginTop: '4%',
    opacity: 0.9
  },

  klm_brandtext: {
    position: 'absolute',
    bottom: 24, 
    // fontStyle: 'italic',
    fontSize: 16,
    // fontFamily: 'verdana'
  },

  klm_spinner: {
    marginTop: '16%'
  }
  
})

  
export default SplashScreenActivity