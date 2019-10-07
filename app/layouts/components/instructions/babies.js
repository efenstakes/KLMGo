import React, { Component } from 'react'
import { View } from 'react-native'
import { Paragraph } from 'react-native-paper'

import styles from './styles'


export default class BabiesInstructions extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            
            instructions: [

                'Booking the service is mandatory for children aged '+
                    '5 up to and including 14 who are travelling alone, or '+
                    'travelling in a different travel class than you as a '+
                    'parent or accompanying adult',

                'Before departure and after arrival, our KLM staff, '+
                    'will accompany your child to and from the aircraft, '+ 
                    'even in the event of delay',

                'During the flight, our cabin attendants will keep a close '+ 
                    'eye on your child and keep you informed by telephone, '+
                    'e-mail and text message about any changes in your '+
                    'child’s flight schedule',

                'At the end of the journey, we will personally accompany your '+ 
                    'child to the person you have authorised to collect '+
                    'him or her',

                'For children aged 15 up to and including 17 years old, '+
                    'the service is optional',

                'If you choose not to book the Unaccompanied Minor service, '+
                    'we will consider your child an adult passenger',

                'Book the flight for a child travelling alone together with the '+
                    'Unaccompanied Minor service at least 24 hours before departure',

                'To accompany your child during its journey, you need to authorise '+
                    'us by handing in 4 filled out and signed copies of the Handling Advice '+
                    'form at the check-in desk at the airport',

                'You can fill it out it at the check-in desk, but please anticipate on 15 '+
                    'minutes extra time',

                'During online check-in, you will receive a check-in confirmation, but no '+
                    'boarding pass. The boarding pass you will receive at the check-in desk '+
                    'at the airport',

                'A parent or guardian aged 18 years or older with identification needs to '+
                    'bring the child to the check-in desk at least 2,5 hours before departure '+
                    'and stay till flight leaves',

                'Upon arrival, we will bring your child to the person '+ 
                    'authorised to pick him or her up, according to the Handling '+
                    'Advice form. This person needs to bring a valid type of '+
                    'identification'


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

