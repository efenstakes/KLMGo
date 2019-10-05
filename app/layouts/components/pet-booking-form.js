import React from 'react'
import { StyleSheet, View, Picker } from 'react-native'
import { 
    Paragraph, Button, TextInput, Text, Title, Switch 
  } from 'react-native-paper'
import { CheckBox, Input  } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'

/*
number: 0, weight: 0, is_vaccinated: false, 
        carriage: null, special_instructions: ''
        */

// book
class PetBookingForm extends React.Component {

    constructor(props) {
        super(props)
        // alert(this.props.errors)
        this.state = {
            number: '', weight: 0, carriage: null, 
            is_returning: false, instructions: ''
        }
    }// constructor(props) { .. }
  
  
    render() {
      return (
        <View style={ styles.form }>
  
            {/** number */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter number of pets'
                    value={this.props.pet.number}
                    onChangeText={text => this.props.klmOnDataChange('number', text) }
                    leftIcon={{ type: 'font-awesome', name: 'calculator' }}
                />
            {/** number */}

            {/** weight */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter weight of pets'
                    value={this.props.pet.weight}
                    onChangeText={text => this.props.klmOnDataChange('weight', text) }
                    leftIcon={{ type: 'font-awesome', name: 'calculator' }}
                    // errorMessage={ 
                    //     this.props.errors.weight.length > 0 && 
                    //     this.props.errors.weight.join("\n")
                    // }
                    errorStyle={ styles.error_text }
                />
            {/** weight */}

            {/** carriage */}
            <View style={{ flex: 1, flexDirection: 'row' }}>
               
               <View style={{ flex: 3, marginBottom: 24, marginTop: 24 }}>
                    <Text> In which carriage do you want your pets </Text>
               </View>
               <View style={{ flex: 1 }}>
                   
                    <Picker
                        selectedValue={ this.props.pet.carriage }
                        style={{ marginTop: 8, width: 320 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.klmOnDataChange('carriage', itemValue )
                        }>
                        <Picker.Item label="Cabin" value="CABIN" />
                        <Picker.Item label="Baggage Hold" value="BAGGAGE HOLD" />
                    </Picker>

               </View>

            </View>
            {/** carriage */}

            {/** instructions */}
            <Input
                    style={ styles.text_inputs } 
                    multiline={true} numberOfLines={4} 
                    label='Enter any special instructions'
                    value={this.props.pet.instructions}
                    onChangeText={text => this.props.klmOnDataChange('instructions', text) }
                    leftIcon={{ type: 'ionicons', name: 'create' }}
                />
            {/** instructions */}

        </View>
      )
    }// render() { .. }
  
} 

const styles = StyleSheet.create({

    form: {
        marginHorizontal: 16, // 80
    },

    text_inputs: {
        marginBottom: 16
    },

    title: {
        marginBottom: 16
    },

    error_text: {
      color: '#E37222'
    }

})

  
export default PetBookingForm