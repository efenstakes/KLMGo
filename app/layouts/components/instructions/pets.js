import React, { Component } from 'react'
import { View } from 'react-native'
import { Paragraph } from 'react-native-paper'

import styles from './styles'

export default class PetsInstructions extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            
            instructions: {
                
                hold: [

                    `Your pet must be at least 10 weeks old`,
                    `Your pet must travel in a kennel that complies  with the IATA rules (for example those of the “Sky” and “Vari” brands). See below for precise rules for your pet’s kennel`,
                    `Total weight of your pet and kennel combined may be max. 75 kg (165 lbs)`,
                    `2 adult animals of comparable size that are compatible, up to 14 kg (30 lbs) each, can travel together in 1 kennel. This also goes for 3 animals up to 6 months old from the same litter, up to 14 kg (30 lbs) each`,
                    `* Your pet cannot travel in the hold of our Boeing 787-9 and Boeing 787-10 aircraft`,
                    `During the flight, we are not able to give pets travelling in the hold any food or water`

                ],

                cabin: [

                    `Your pet must be at least 10 weeks old`,
                    `Your pet must travel in a suitable pet travel bag of max. 46 x 28 x 24 cm (L x W x H). Your pet must be able to stand up and lay down comfortably`,
                    `Total weight of your pet and travel bag or kennel combined may be max. 8 kg (18 lbs)`,
                    `The kennel must be put under the seat in front of you (therefore exit rows are excluded). It is not allowed to take your pet out of the travel bag or kennel during the flight`
                    
                ],

                cargo: [

                    `You have more than 3 pets`,

                    `Your pet and kennel combined weigh more than 75 kg (165 lbs)`,

                    `The kennel is larger than 292 cm/115 inch (l + w + h)`,

                    `Your pet is not travelling on the same flight as you are`,

                    `Your pet is travelling to a country whose authorities allow the transportation of pets as cargo only`

                ],

                kennels: [

                    `The kennel must have a fiberglass or rigid plastic shell. Wooden, metal bar or welded wire mesh kennels are not allowed`,
                    `The wheels must be removed, or if retractable they must be taken off or blocked with duct tape`,
                    `The door must have a centralised locking system which fastens both locks on top and at the bottom of the door`,
                    `The door hinge and locking pins must extend the container by at least 1,6 cm (5/8 inch) beyond the horizontal extrusions above and below the door opening where the pins are fitted`,
                    `The 2 parts of the kennel must be joined by bolts. Any other locking system is strictly forbidden`,
                    `The kennel must be large enough for your pet to stand up without touching the top, to be able to turn around easily and to lie down in a natural position`,
                    `The kennel must have a blanket, newspaper, or other absorbent material on the floor. Please note that straw is not allowed`,
                    `The kennel must have either 2 fixed food bowls, or 1 fixed food bowl with 2 compartments for food and water`

                ]

            }

        }
    }// constructor(props) { .. }
    

    
    render() {
        return (
            <View style={ styles.instruction_container }>
                
                {/** cabin */}
                <Paragraph style={ styles.section_title }> Pets In the Cabin </Paragraph>
                {
                    this.state.instructions.cabin.map((instruction, index)=> {
                    return (
                        <Paragraph key={index} style={ styles.instruction_text }> 
                            { instruction } 
                        </Paragraph>
                    )
                    })
                }
                {/** cabin */}

                
                {/** hold */}  
                <Paragraph style={ styles.section_title }> Pets In the Hold </Paragraph>
                {
                    this.state.instructions.hold.map((instruction, index)=> {
                    return (
                        <Paragraph key={index} style={ styles.instruction_text }> 
                            { instruction } 
                        </Paragraph>
                    )
                    })
                }
                {/** hold */} 

                 
                {/** cargo */} 
                <Paragraph style={ styles.section_title }>
                    Your pets must be shipped as cargo if:
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
                {/** cargo */} 

                 
                {/** kennels */} 
                <Paragraph style={ styles.section_title }>
                    When transporting your pet in the hold, its kennel 
                    needs to comply with several rules:
                </Paragraph>
                {
                    this.state.instructions.kennels.map((instruction, index)=> {
                    return (
                        <Paragraph key={index} style={ styles.instruction_text }> 
                            { instruction } 
                        </Paragraph>
                    )
                    })
                }
                {/** kennels */}

            </View>
        )
    }// render() { .. }

}

