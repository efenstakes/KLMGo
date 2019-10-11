import React from 'react'
import { StyleSheet, View, TouchableHighlight, Picker } from 'react-native'
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
  
    componentDidMount() {
        // console.log(this.props.errors.name.length)
    }
  
    render() {
      return (
        <View style={ styles.form }>
            
            {/** number */}

            <Text style={{ marginBottom: 8 }}> Enter number of people </Text>
            <View style={{ flex: 1, flexDirection: 'row', height: 50, marginBottom: 16 }}>

                <View style={{ flex: 2, alignItems: 'center' }}>

                    <Button mode='contained' color='red'
                        style={{ 
                            width: 44, height: 44, borderRadius: 22 
                        }} 
                        onPress={() => this.props.klmOnDataChange('number', 'minus') }
                    > - </Button>

                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text> {this.props.group.number} </Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    
                    <Button mode='contained'
                        style={{ 
                            width: 44, height: 44, borderRadius: 22 
                        }}
                        onPress={() => this.props.klmOnDataChange('number', 'add') }
                    > + </Button>

                </View>


            </View>
            {/** number */}

            {/** type */}
            <View style={{ flex: 1, flexDirection: 'row' }}>
               
               <View style={{ flex: 3, marginBottom: 24, marginTop: 24 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Verdana' }}> Type </Text>
               </View>
               <View style={{ flex: 1 }}>
                   
                    <Picker
                        selectedValue={ this.props.group.type }
                        style={{ marginTop: 8, width: 320 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.klmOnDataChange('type', itemValue )
                        }>
                        <Picker.Item label="conference" value="conference" />
                        <Picker.Item label="leisure" value="leisure" />
                        <Picker.Item label="event" value="event" />
                        <Picker.Item label="students" value="students" />
                        <Picker.Item label="sports" value="sports" />
                        <Picker.Item label="journalists" value="journalists" />
                        <Picker.Item label="group series" value="group series" />
                        <Picker.Item label="musicians" value="musicians" />
                        <Picker.Item label="other" value="other" />
                    </Picker>

               </View>

            </View>
            {/** type */}

            {/** if returning */}
            <TouchableHighlight 
               underlayColor={'white'}
               onPress={ ()=> this.props.klmOnDataChange('is_returning', null) }>
                
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 8 }}>
                
                    <View style={{ flex: 3 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Verdana' }}> Need a return ticket? </Text>
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

            </TouchableHighlight>
            {/** if returning */}


            {/** name */}
            <View style={{ marginBottom: 8 }}>
                <Input
                        style={ styles.text_inputs }
                        label='Enter group name'
                        value={this.props.group.name}
                        onChangeText={text => this.props.klmOnDataChange('name', text) }
                        leftIcon={{ type: 'font-awesome', name: 'users' }}
                    />
            </View>
            {/** name */}

            {/** instructions */}
            <View style={{ flex: 1, marginBottom: 8 }}>
                
                <Input
                        style={ styles.text_inputs } 
                        multiline={true} numberOfLines={4} 
                        label='Enter any special instructions'
                        value={this.props.group.instructions}
                        onChangeText={text => this.props.klmOnDataChange('special_instructions', text)  }
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