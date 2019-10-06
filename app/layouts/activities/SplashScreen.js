import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { 
         Paragraph, Button, Text, ActivityIndicator, Colors 
       } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

// splash screen page
class SplashScreenActivity extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = { }

    this.goNext = this.goNext.bind(this)
  }

  componentDidMount() {
    this.timeout = setTimeout(()=> this.goNext() , 1000)
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


  goNext() {
    this.props.navigation.navigate('Tutorial')
    // this.props.navigation.navigate('AppHome')
  }
  async test() {
    
    // try{
    //   // let string_res = await fetch('192.168.42.3:4445/api/tester')
    //   let string_res = await fetch('http://10.0.2.2:4445/api/tester')
    //   // let json_res = await string_res.json()
    //   alert(string_res)
    // }catch(e){
    //   alert(`error ${e}`)
    // }

  }

  
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
    fontSize: 24,
    fontWeight: 'bold'
  },

  klm_image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'stretch',
    marginTop: '4%',
    opacity: 0.5
  },

  klm_brandtext: {
    position: 'absolute',
    bottom: 24, 
    fontStyle: 'italic',
    fontSize: 16
  },

  klm_spinner: {
    marginTop: '16%'
  }
  
})

  
export default SplashScreenActivity