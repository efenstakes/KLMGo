import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'


export default NetworkError = ({ message, retry })=> {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
            <Text style={{ fontSize: 20, marginTop: '48%', marginBottom: '8%' }}> 
              { message }
            </Text>
    
            {/* <AwesomeIcon name='network-error' color={ '#2cdeea' } size='large' /> */}
    
            <Button uppercase={false} mode='contained' onPress={ retry }
                    style={{ marginVertical: 48, borderRadius: 24 }}
                > Retry </Button>
    
        </View>
      
    )
}
