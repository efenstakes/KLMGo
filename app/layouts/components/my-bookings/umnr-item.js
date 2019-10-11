import React, { Component } from 'react'
import { View } from 'react-native'
import { Paragraph, Text, Title } from 'react-native-paper'


export default UmnrItem = ({ item, styles }) => {

    if( item.number == 0 ) {
        return(

            <View style={{ ...styles }}>

               <Text style={{ fontSize: 16 }}> Unaccompanied Minors - Not Made </Text>

            </View>

        )
    }// if( item.weight == 0 ) { .. }

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
           
           <Text style={{ ...styles.title }}> Unaccompanied Minors </Text>
 
           <Text> Number of children: { item.number } </Text>
           { return_content }
           { instruction_content }

        </View>
    )

}
