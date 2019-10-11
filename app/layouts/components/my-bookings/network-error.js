import React from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default NetworkError = ({ message, retry })=> {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
            <Text style={{ fontSize: 20, marginTop: '48%', marginBottom: '8%' }}> 
              { message }
            </Text>
    
            <Icon name='alert' color='#E37222' size={ 64 } />
    
            <Button uppercase={false} mode='contained' onPress={ retry }
                    style={{ marginVertical: 48, borderRadius: 24 }}
                > Retry </Button>
    
        </View>
      
    )
}
