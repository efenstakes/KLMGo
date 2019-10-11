import React, { Component } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'


export default LuggageItem = ({ item, styles }) => {

    if( item.weight == 0 ) {
        return(

            <View style={{ ...styles }}>

               <Text style={{ fontSize: 16 }}> Luggage - Not Made </Text>

            </View>

        )
    }// if( item.weight == 0 ) { .. }

    let instruction_content = <Paragraph> No Special Instructions Given </Paragraph>
    if( item.instruction_content.length > 1 ) {
        instruction_content = (
            <Paragraph>
               { item.special_instructions }
            </Paragraph> 
        )
    }
    
    return(
        <View style={{ ...styles.item }}>
 
          <Text style={{ ...styles.title }}> Luggage Booking </Text>
 
           <Text> Weight: { item.weight } </Text>
           { instruction_content }

        </View>
    )

}
