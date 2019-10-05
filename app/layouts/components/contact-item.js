import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Paragraph, Button, List, Colors, Text } from 'react-native-paper'



const ContactItem = ()=> {
    return (
        <View style={{ 
            flex: 1, flexDirection: 'row', height: 50 
            }}>

            <View style={{ 
              flex: 1, alignContent: 'center', 
              
              alignItems: 'flex-end' 
              }}>
              {/* <Text> Image </Text> */}
              <Image
                source={ require('../../assets/icons/whatsapp.png') }
                style={{ height: 80, width: 80 }}
              />
            </View>
            <View style={{ flex: 2, paddingTop: 16, marginLeft: 16 }}>
              <TouchableOpacity onPress={ ()=> alert('call') }>
                <Text> text one </Text>
              </TouchableOpacity>
              <Text> text two </Text>
            </View>

          </View>
    )
}

export default ContactItem