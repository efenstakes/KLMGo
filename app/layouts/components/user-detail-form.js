import React from 'react'
import { StyleSheet, View } from 'react-native'
import { 
    Paragraph, Button, TextInput, Text, Title 
  } from 'react-native-paper'

import { CheckBox, Input  } from 'react-native-elements'


// book
class UserDetailForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '', email: '', phone: '',
            password: '', password_confirmation: ''
        }
    }// constructor(props) { .. }
  
  
    render() {
      return (
        <View style={ styles.user_detail_form }>
  
            <Title style={ styles.title }> Your Details </Title>

            {/** name */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter your name'
                    value={this.props.user.name}
                    onChangeText={text => this.props.klmOnDataChange('name', text )}
                    leftIcon={{ type: 'ionicons', name: 'person' }}
                    errorMessage={ 
                        this.props.errors.name.length > 0 && 
                        this.props.errors.name.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** name */}

            {/** email */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter your email'
                    value={this.props.user.email}
                    onChangeText={text => this.props.klmOnDataChange('email', text )}
                    leftIcon={{ type: 'ionicons', name: 'mail' }}
                    errorMessage={ 
                        this.props.errors.email.length > 0 && 
                        this.props.errors.email.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** email */}

            {/** phone */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter your phone'
                    value={this.props.user.phone}
                    onChangeText={text => this.props.klmOnDataChange('phone', text )}
                    leftIcon={{ type: 'ionicons', name: 'phone' }}
                    errorMessage={ 
                        this.props.errors.phone.length > 0 && 
                        this.props.errors.phone.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** phone */}

            {/** password confirmation */}
            {/* <TextInput
                    label='Email'
                    value={this.state.password_confirmation}
                    onChangeText={text => this.setState({ password_confirmation: text })}
                /> */}
            {/** password confirmation */}

        </View>
      )
    }// render() { .. }
  
} 

const styles = StyleSheet.create({

    user_detail_form: {
        marginHorizontal: 16, //  80
    },

    text_inputs: {
        marginBottom: 16
    },

    title: {
        marginBottom: 16,
        alignSelf: 'flex-start'
    },

    error_text: {
      color: '#E37222'
    }

})

  
export default UserDetailForm