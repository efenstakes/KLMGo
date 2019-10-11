import React, { Component } from 'react'
import { View } from 'react-native'
import { Paragraph, Text } from 'react-native-paper'


export default GroupItem = ({ item, styles }) => {

    if( item.number < 2 || item.name.length < 4  ) {
        return(

            <View style={{ ...styles }}>

               <Text style={{ fontSize: 16 }}> Group Booking - Not Made </Text>

            </View>

        )
    }// if( item.number < 2 || item.name.length < 4  ) { .. }

    let instruction_content = <Paragraph> No Special Instructions Given </Paragraph>
    if( item.special_instructions.length > 1 ) {
        instruction_content = (
            <Paragraph>
               { item.special_instructions }
            </Paragraph> 
        )
    }
    let return_content = <Paragraph> No Return Ticket Requested </Paragraph>
    if( item.is_returning ) {
        return_content = (
            <Paragraph>
               Return Ticket Requested
            </Paragraph> 
        )
    }
    
    return(
        <View style={{ ...styles.item }}>

          <Text style={{ ...styles.title }}> Group Booking </Text>
 
           <Text> Group name: { item.name } </Text>
           <Text> Number of people: { item.number } </Text>
           <Text> Type of Group: { item.type } </Text>
           { return_content }
           { instruction_content }

        </View>
    )

}
