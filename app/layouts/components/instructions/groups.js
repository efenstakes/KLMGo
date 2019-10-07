import React, { Component } from 'react'
import { View } from 'react-native'
import { Paragraph } from 'react-native-paper'

import styles from './styles'



export default class GroupInstructions extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            
            instructions: [

                `You may book your group trip between eleven months and two days before departure`,

                `If you need to book a trip less than two working days before departure, contact the Direct Sales Group Desk`,

                `Have you already booked and wish to addmore group members? The fare will depend on the number of tickets available at the time`,

                `No fee applies for your seat reservation from 8 days before departure`,      

                `Baggage allowance of each person in the group is equal to that of the number of individual passengers`,

                `If you are a Flying Blue member, you may use your Flying Blue-number for your flights within a group booking`,

                `You can provide the bluebiz number to the Direct Sales Group Desk. It is also possible to redeem blue credits on your group booking. Groups are not entitled to any other bluebiz programme benefits`     

            ]

        }
    }// constructor(props) { .. }
    

    
    render() {
        return (
            <View style={ styles.instruction_container }>
                
                {
                    this.state.instructions.map((instruction, index)=> {
                    return (
                        <Paragraph key={index} style={ styles.instruction_text }> 
                            { instruction } 
                        </Paragraph>
                    )
                    })
                }

            </View>
        )
    }// render() { .. }

}
