import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { 
    Paragraph, Button, TextInput, Text, Title, Switch 
  } from 'react-native-paper'
import { CheckBox, Input  } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'


// book
class BabyBookingForm extends React.Component {

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
            {/* <Input
                    style={ styles.text_inputs }
                    label='Enter number of children'
                    value={this.props.baby.number}
                    onChangeText={text => this.props.klmOnDataChange('number', text) }
                    leftIcon={{ type: 'font-awesome', name: 'users' }}
                /> */}

            <Text style={{ marginBottom: 8 }}> Enter number of children </Text>
            <View style={{ flex: 1, flexDirection: 'row', height: 50, marginBottom: 16 }}>

               <View style={{ flex: 2, alignItems: 'center' }}>
              
                    {/* icon='remove' */}
                    <Button mode='contained' color='red'
                        style={{ 
                            width: 44, height: 44, borderRadius: 22
                        }} 
                        onPress={() => this.props.klmOnDataChange('number', 'minus') }
                    > - </Button>
 
               </View>
               <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text> {this.props.baby.number} </Text>
               </View>
               <View style={{ flex: 2, alignItems: 'center' }}>
                    {/* icon='add' */}
                    <Button mode='contained' 
                        style={{ 
                            width: 44, height: 44, borderRadius: 22 
                        }}
                        onPress={() => this.props.klmOnDataChange('number', 'add') }
                    > + </Button>

               </View>


            </View>

            {/** number */}
            
            {/** if returning */}
            <TouchableHighlight 
               underlayColor={'white'}
               onPress={ ()=> this.props.klmOnDataChange('is_returning', null) }>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 16 }}>
               
               <View style={{ flex: 3 }}>
                    <Text> Need a return ticket? </Text>
               </View>
               <View style={{ flex: 1 }}>
                
                    <Switch
                        value={this.props.baby.is_returning}
                        label='Need a return ticket?'
                        // onValueChange={() => this.props.klmOnDataChange('is_returning', null) }
                    />

               </View>

            </View>
            </TouchableHighlight>
            {/** if returning */}

            {/** instructions */}
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 8 }}>
                
                <Input
                    style={ styles.text_inputs } 
                    multiline={true} numberOfLines={4} 
                    label='Enter any special instructions'
                    value={this.props.baby.instructions}
                    onChangeText={text => this.props.klmOnDataChange('instructions', text) }
                    leftIcon={{ type: 'ionicons', name: 'create' }}
                />

            </View>
            {/** instructions */}

        </View>
      )
    }// render() { .. }
  
} 

const styles = StyleSheet.create({

    form: {
        marginHorizontal: 16, //80
    },

    text_inputs: {
        marginBottom: 16
    },

    title: {
        marginBottom: 16
    }

})

  
export default BabyBookingForm