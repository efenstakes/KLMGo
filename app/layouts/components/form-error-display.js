import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function FormErrorDisplay ({ errors }){
  return(
    <View style={{ marginLeft: 8, marginBottom: 16, marginTop: 8 }}>
        {
            errors.map((error, index)=> {
                return <Text style={{ color: '#E37222', fontSize: 16 }} key={index}> { error } </Text>
            })
        }
    </View>
  )
}