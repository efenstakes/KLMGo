import React from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { Paragraph, Button, Text, Title } from 'react-native-paper'
import { Input } from 'react-native-elements'

// custom components
import FormErrorDisplay from '../components/form-error-display'


// Login page
class LoginActivity extends React.Component { 

  constructor(props) {
    super(props)
    
    this.state = {
        email: '', password: '',
        errors: { email: [], password: [] },

        show_password: false
    }

    this.login = this.login.bind(this)
    this.togglePasswordShow = this.togglePasswordShow.bind(this)
  }// constructor(props) { .. }

    

  render() {
    return(
      <ScrollView>


        <View style={{ width: '100%', flex: 1, flexDirection: 'row', paddingTop: '16%' }}>

     
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 10 }}>

            <Text style={ styles.woo_text }> 
              Login now to get more from KLM Go 
            </Text>
   

            {/** email */}
            <Input
                ref='email'
                style={ styles.text_inputs }
                label='Enter your email'
                value={this.state.email}
                onChangeText={text => this.setState({ email: text }) }
                leftIcon={{ type: 'ionicons', name: 'mail' }}
                errorMessage={ 
                    this.state.errors.email.length > 0 && 
                    this.state.errors.email.join("\n")
                }
                errorStyle={ styles.error_text }
                />
            {/** email */}
  
            {/** password */}
            <Input
                ref='password'
                label='Password'
                label='Enter your password'
                value={this.state.password}
                secureTextEntry={ !this.state.show_password }
                onChangeText={text => this.setState({ password: text })}
                leftIcon={{ type: 'ionicons', name: 'lock' }}
                // rightIcon={ 
                //     this.state.show_password ? { type: 'ionicons', name: 'eye-off', onPress={this.togglePasswordShow} : { type: 'ionicons', name: 'eye', onPress={this.togglePasswordShow} }
                // }
                // rightIcon={{
                //     type: 'ionicons', name: (this.state.show_password ? 'eye' : 'eye-off'), onPress={ this.togglePasswordShow }
                // }}
                errorMessage={ 
                    this.state.errors.password.length > 0 && 
                    this.state.errors.password.join("\n")
                }
                errorStyle={ styles.error_text }
                />
            {/** password */}
  

            {/** login button */}
            <Button uppercase={false} mode="contained" onPress={ this.login }
                    style={{ marginVertical: 40, borderRadius: 24 }}>
                Login Now
            </Button>
            {/** login button */}


        <View style={{ marginBottom: 100 }}/>

        </View>
        <View style={{ flex: 1 }}></View>


      </View>


      </ScrollView>
    )
  }// render() { .. }

  
  // login the user 
  login() {
    // reset errors
    this.setState({ errors: { email: [], password:  [] } })

    // regular expression to validate email
    let email_regex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    // get the email and password values
    let { email, password } = this.state
    // sanitize data
    email = email.trim()
    password = password.trim()

    let errors = { email: [], password: [] }

    // validate email length and format
    if( email.length < 6 ) {
        errors.email.push('Email should be at least 6 characters')
    }
    if( !email_regex.test(email) ) {
        errors.email.push('Email should be valid')
    }
    
    // validate password length 
    if( password.length < 6 ) {
        errors.password.push('Password should be at least 6 characters')
    }
    // set errors 
    this.setState({ errors })

    if( errors.email.length > 0 || errors.password.length > 0 ) {
        return
    }
    
    
    alert('no errors')
    
  }// login() { .. }

  togglePasswordShow() {
    let show_password = this.state.show_password
    this.setState({ show_password: !show_password })
  }


}


const styles = StyleSheet.create({

    user_detail_form: {
        marginHorizontal: 80
    },

    text_inputs: {
        marginBottom: 16
    },

    title: {
        marginBottom: 16,
        marginHorizontal: -40
    },

    woo_text: {
      marginBottom: '24%', 
      fontSize: 16,
      alignSelf: 'center'
    },

    error_text: {
      color: '#E37222'
    }

})

  

export default LoginActivity