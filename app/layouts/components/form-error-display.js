import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function FormErrorDisplay ({ errors }){
  return(
    <View style={{ marginLeft: 8, marginBottom: 16, marginTop: 8 }}>
        {
            errors.map((error)=> {
                return <Text style={{ color: 'red' }}> { error } </Text>
            })
        }
    </View>
  )
}