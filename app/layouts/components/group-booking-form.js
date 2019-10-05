import React from 'react'
import { StyleSheet, View } from 'react-native'
import { 
    Paragraph, Button, TextInput, Text, Title, Switch 
  } from 'react-native-paper'
import { CheckBox, Input  } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'


// book
class GroupBookingForm extends React.Component {

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
                    label='Enter number of people'
                    value={this.props.group.number}
                    onChangeText={text => this.props.klmOnDataChange('number', text) }
                    leftIcon={{ type: 'font-awesome', name: 'users' }}
                />
            {/** number */}
            
            {/** if returning */}
            <View style={{ flex: 1, flexDirection: 'row' }}>
               
               <View style={{ flex: 3 }}>
                    <Text> Need a return ticket? </Text>
               </View>
               <View style={{ flex: 1 }}>
                <Switch
                        value={this.props.group.is_returning}
                        label='Need a return ticket?'
                        onValueChange={() => { 
                                this.props.klmOnDataChange('is_returning', null) 
                            }}
                    />
               </View>

            </View>
            {/** if returning */}

            {/** instructions */}
            <Input
                    style={ styles.text_inputs } 
                    multiline={true} numberOfLines={4} 
                    label='Enter any special instructions'
                    value={this.props.group.instructions}
                    onChangeText={text => this.props.klmOnDataChange('special_instructions', text)  }
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

  
export default GroupBookingForm