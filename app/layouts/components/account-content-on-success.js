import React from 'react'
import { View, Image } from 'react-native'
import { Paragraph, Button, Text, Title } from 'react-native-paper'


// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 

export default function AccountContentOnSuccess({ width, message, goBack }) {
    return(
      <View style={{ width: '100%', height: '100%', flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>

        <Image
            source={ require('../../assets/icons/klm_go_logo_circular.png') }
            style={{ marginTop: '8%', width: (width/3), height: (width/3) }}
          />

        <Paragraph style={{ marginTop: '16%', fontSize: 24, lineHeight: 40, alignSelf: 'center' }}> 
          {/* You have successfully logged in  */}
          { message }
        </Paragraph>

        <AwesomeIcon name='smile-o' 
            style={{ alignSelf: 'center', fontSize: 56, color: 'lightblue' }}/>
        

        <Button mode='contained' uppercase={false} onPress={ goBack }
              style={{ width: '56%', marginTop: 40, marginBottom: 24, borderRadius: 24 }}> 
            Go Back Now 
        </Button>

      </View>
    )
}