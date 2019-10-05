import React from 'react'
import { View, ScrollView, AsyncStorage, Text } from 'react-native'
import { Paragraph, Button } from 'react-native-paper'


// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 



// show this if user is not logged in
export default function UserNotLoggedIn(props) {
    return(
      <View style={{ marginTop: '32%', paddingHorizontal: '0%', flex: 1 }}>

        <Paragraph style={{ fontSize: 24, lineHeight: 40, alignSelf: 'center' }}> 
          You are not logged in 
        </Paragraph>
        <AwesomeIcon name='frown-o' 
              style={{ alignSelf: 'center', fontSize: 40, color: 'lightblue' }}/>
        <Paragraph style={{ fontSize: 20, alignSelf: 'center', lineHeight: 40 }}> 
          Log in to get more from KLM Go 
        </Paragraph>

        <Button mode='contained' onPress={ props.goToLogin }
                style={{ marginTop: 40, marginBottom: 24, borderRadius: 24 }}> 
          Log In Now 
        </Button>
        <Button mode='contained' onPress={ props.goToRegister }
                style={{ marginBottom: 160, borderRadius: 24 }}> 
          Register Now 
        </Button>

      </View>
    )
}