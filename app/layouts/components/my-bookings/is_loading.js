import React from 'react'
import { View } from 'react-native'
import { Text, ActivityIndicator } from 'react-native-paper'


export default IsLoading = ({ message }) => {
    return (
        
        
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text style={{ fontSize: 20, marginTop: '48%', marginBottom: '8%' }}> 
            { message }
        </Text>

        <ActivityIndicator animating={true} color={ '#2cdeea' } size='large' />

      </View>

    )
}
