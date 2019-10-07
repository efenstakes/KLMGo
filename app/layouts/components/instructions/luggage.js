import React, { Component } from 'react'
import { View } from 'react-native'
import { Paragraph } from 'react-native-paper'

import styles from './styles'


export default class LuggageInstructions extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            
            instructions: {

                regular: [
                  'Get a discount when purchasing your extra baggage online at least 24 hours before departure',
                  'If you are a Flying Blue member you can pay for extra baggage with earned Miles',

                ],

                cargo: [
                    'Items of check-in baggage that weigh more than 32 kg',
                    'More than 10 pieces of check-in baggage per passenger',
                    'Items larger than L + W + H 300 cm (118 inch)',
                    'Fragile or unusual baggage'
                ],

                gotchas: [
                    'You’re departing from some specific airports',
                    'Part of your trip is operated by another airline',
                    'Part of your trip will be by rail or bus'
                ]


            }// instructions: { .. }

        }
    }// constructor(props) { .. }
    

    
    render() {
        return (
            <View style={ styles.instruction_container }>
                
                {
                    this.state.instructions.regular.map((instruction, index)=> {
                    return (
                        <Paragraph key={index} style={ styles.instruction_text }> 
                            { instruction } 
                        </Paragraph>
                    )
                    })
                }


                <Paragraph style={ styles.section_title }>
                  Transporting baggage as cargo
                </Paragraph>
                {
                    this.state.instructions.cargo.map((instruction, index)=> {
                    return (
                        <Paragraph key={index} style={ styles.instruction_text }> 
                            { instruction } 
                        </Paragraph>
                    )
                    })
                }

                <Paragraph style={ styles.section_title }>
                  Arranging extra items of baggage online on KLM.com may not be possible if:
                </Paragraph>
                {
                    this.state.instructions.gotchas.map((instruction, index)=> {
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

