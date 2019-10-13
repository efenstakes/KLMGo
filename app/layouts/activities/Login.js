import React from 'react'
import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native'
import { Paragraph, Button, Text, Title, ActivityIndicator } from 'react-native-paper'
import { Input } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage'

// custom components
import FormErrorDisplay from '../components/form-error-display'
import AccountContentOnSuccess from '../components/account-content-on-success'

// storage
import Storage from '../../models/storage'
// server domain
import Net from '../../models/net'


// Login page
class LoginActivity extends React.Component { 

  constructor(props) {
    super(props)
    
    this.state = {
        email: '', password: '',
        errors: { email: [], password: [], login: '' },

        is_loading: false,
        is_login_successful: false,

        show_password: false
    }

    this.login = this.login.bind(this)
    this.togglePasswordShow = this.togglePasswordShow.bind(this)
    this.goBack = this.goBack.bind(this)
  }// constructor(props) { .. }


  // login form
  login_form() {

    let app_loader = null 
    if( this.state.is_loading ) {
      app_loader = (
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                     <ActivityIndicator animating={ this.state.is_loading } size={'large'} />
                    </View>
                   )
    }

    return(

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

          {/** show login errors */}
          <FormErrorDisplay errors={[ this.state.errors.login ]} />

          {/** show app loader */}
          {/* { app_loader } */}
          {/** show app loader */}

          {/** login button */}
          <Button uppercase={false} mode="contained" 
                  loading={ this.state.is_loading }
                  onPress={ this.login }
                  style={{ marginVertical: 40, borderRadius: 24 }}>
              { this.state.is_loading ? 'Wait While We Log You In' : 'Login Now' } 
          </Button>
          {/** login button */}


        <View style={{ marginBottom: 100 }}/>

        </View>
        <View style={{ flex: 1 }}></View>


      </View>


    )
  }// login_form() { .. }

  render() {
    let width = Dimensions.get('window').width

    let show = this.state.is_login_successful ? <AccountContentOnSuccess width={ width } goBack={ this.goBack } message='You have successfully logged in'/> : this.login_form()
 
    return(
      <ScrollView>

        { show }
       
      </ScrollView>
    )
  }// render() { .. }

  // go back
  goBack() {
    this.props.navigation.goBack()
  }
  
  // login the user 
  async login() {
    // reset errors
    this.setState({ errors: { email: [], password:  [], login: '' } })

    // regular expression to validate email
    let email_regex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    // get the email and password values
    let { email, password } = this.state
    // sanitize data
    email = email.trim()
    password = password.trim()

    let errors = { email: [], password: [], login: '' }

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

    if( errors.email.length > 0 || errors.password.length > 0 ) return
    
    
    this.setState({ is_loading: true })
    try{

      let login_result = await fetch(`${Net.SERVER}/api/user/login`, {
                            method: 'post',
                            headers: {
                              'Content-Type': 'application/json;charset=utf-8'
                            }, 
                            body: JSON.stringify({ email, password })
                          })

      let login_result_json = await login_result.json()

      if( !login_result_json.token || !login_result_json.user._id ) {
        let login_error = 'Check your credentials and try again'
        this.setState({ errors: { email: [], password: [], login: login_error }, is_loading: false })
        
        return
      } 
      
      this.setState({ is_login_successful: true })
      await AsyncStorage.setItem(Storage.USER, JSON.stringify({ ...login_result_json.user, password }))
      await AsyncStorage.setItem(Storage.TOKEN, login_result_json.token)
      await AsyncStorage.setItem(Storage.TOKEN_TIME, Date.now())
      
    }catch(e) { }

    this.setState({ is_loading: false })
    
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