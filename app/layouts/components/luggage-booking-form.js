import React from 'react'
import { StyleSheet, View } from 'react-native'
import { 
    Paragraph, Button, TextInput, Text, Title, Switch 
  } from 'react-native-paper'
import { CheckBox, Input  } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'


// book
class LuggageBookingForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            number: '', is_returning: false, instructions: ''
        }
    }// constructor(props) { .. }
  
  
    render() {
      return (
        <View style={ styles.form }>
  
            {/** number */}
            <Input
                style={ styles.text_inputs }
                label='Enter the weight of luggage'
                value={this.props.luggage.weight}
                onChangeText={ text => this.props.klmOnDataChange('weight', text) }
                leftIcon={{ type: 'font-awesome', name: 'users' }}
            />
            {/** number */}
        
            {/** instructions */}
            <Input
                    style={ styles.text_inputs } 
                    multiline={true} numberOfLines={4} 
                    label='Enter any special instructions'
                    value={this.props.luggage.instructions}
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
    }

})

  
export default LuggageBookingForm