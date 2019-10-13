import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'
import { Paragraph, Button, Text, Title, ActivityIndicator } from 'react-native-paper'
import { Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-community/async-storage'

// custom components
import FormErrorDisplay from '../components/form-error-display'
import AccountContentOnSuccess from '../components/account-content-on-success'

// storage
import Storage from '../../models/storage'
// server domain
import Net from '../../models/net'


// Register page
class RegisterActivity extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        name: '', email: '', phone: '', password: '',
        password_confirmation: '',
        errors: {
            name: [], email: [], phone: [], 
            password: [], password_confirmation: [],
            register: ''
        },
        
        is_loading: false,
        is_register_successful: false,
    }

    this.register = this.register.bind(this)
    this.goBack = this.goBack.bind(this)
  }// constructor(props) { .. }


  // form
  register_form() {
    let app_loader = null 
    if( this.state.is_loading ) {
      app_loader = (
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                     <ActivityIndicator animating={ this.state.is_loading } size={'large'} />
                    </View>
                   )
    }

    return(
        
      <View style={{ width: '100%', flex: 1, flexDirection: 'row', paddingTop: '8%' }}>

                
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 10 }}>

            <Text style={ styles.woo_text }> 
                Register now to get more from KLM Go 
            </Text>


            {/** name */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter your name'
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text }) }
                    leftIcon={{ type: 'ionicons', name: 'person' }}
                    errorMessage={ 
                        this.state.errors.name.length > 0 && 
                        this.state.errors.name.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** name */}

            {/** email */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter your email'
                    value={this.state.email}
                    onChangeText={text => this.setState({email: text }) }
                    leftIcon={{ type: 'ionicons', name: 'mail' }}
                    errorMessage={ 
                        this.state.errors.email.length > 0 && 
                        this.state.errors.email.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** email */}

            {/** phone */}
            <Input
                    style={ styles.text_inputs }
                    label='Enter your phone'
                    value={this.state.phone}
                    onChangeText={text => this.setState({ phone: text }) }
                    leftIcon={{ type: 'ionicons', name: 'phone' }}
                    errorMessage={ 
                        this.state.errors.phone.length > 0 && 
                        this.state.errors.phone.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** phone */}

            {/** password */}
            <Input
                    label='Password'
                    label='Enter your password'
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    leftIcon={{ type: 'ionicons', name: 'lock' }}
                    errorMessage={ 
                        this.state.errors.password.length > 0 && 
                        this.state.errors.password.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** password */}

            {/** password confirmation */}
            <Input
                    label='Password Confirmation'
                    label='Enter your confirmation password'
                    value={this.state.password_confirmation}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password_confirmation: text }) }
                    leftIcon={{ type: 'ionicons', name: 'lock' }}
                    errorMessage={ 
                        this.state.errors.password_confirmation.length > 0 && 
                        this.state.errors.password_confirmation.join("\n")
                    }
                    errorStyle={ styles.error_text }
                />
            {/** password confirmation */}

            {/** show register errors */}
            <FormErrorDisplay errors={[ this.state.errors.register ]} />

            {/** show app loader */}
            {/* { app_loader } */}
            {/** show app loader */}

            {/** register button */}
            <Button uppercase={false} mode="contained" 
                    loading={ this.state.is_loading }
                    onPress={ this.register }
                    style={{ marginVertical: 40, borderRadius: 24 }}>
                { this.state.is_loading ? 'Wait While We Create Your Account' : 'Register Now' }
            </Button>
            {/** register button */}
            
            <View style={{ marginBottom: 100 }}></View>

        </View>
        <View style={{ flex: 1 }}></View>

      </View>

    )
  }// register_form() { .. }


  render() {
    let width = Dimensions.get('window').width

    let show = this.state.is_register_successful ? <AccountContentOnSuccess width={width} goBack={ this.goBack } message='Your Account Has Successfully Been Created' /> : this.register_form()

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
  
  // register the user 
  async register() {
    // reset errors
    let empty_errors = {
        name: [], email: [], phone: [], 
        password: [], password_confirmation: [],
        register: ''
    }
    this.setState({ errors: empty_errors })

    // regular expression to validate email
    let email_regex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    let pwd_regex = new RegExp('.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*')
    let phone_reqex = /^\+?([0-9]{2,3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,5})$/

    // get the email and password values
    let { name, email, phone, password, password_confirmation } = this.state
    

    // sanitize data
    name = name.trim()
    email = email.trim()
    phone = phone.trim()
    password = password.trim()
    password_confirmation = password_confirmation.trim()

    let errors = empty_errors

    // validate name length and format
    if( name.length < 6 ) {
        errors.name.push('Name should be at least 6 characters')
    }
    if( /^[0-9]+$/.test(name) ) {
        errors.name.push('Name should be valid')
    }
    // validate email length and format
    if( email.length < 6 ) {
        errors.email.push('Email should be at least 6 characters')
    }
    if( !email_regex.test(email) ) {
        errors.email.push('Email should be valid')
    }
    
    // validate phone 
    if( phone.length > 0 && !phone_reqex.test(phone) ) {
        errors.phone.push('Phone should be valid')
    }
    

    // validate password length 
    if( password.length < 6 ) {
        errors.password.push('Password should be at least 6 characters')
    }    
    // validate password format and strength 
    if( !pwd_regex.test(password) ) {
        errors.password.push('Password should have numbers, capital and lowercase letters and a special character')
    }
    // check if passwords match
    if( password != password_confirmation ) {
        errors.password.push('Passwords should be matching')
        errors.password_confirmation.push('Passwords should be matching')
    }  
    // set errors 
    this.setState({ errors })

    if( 
        errors.name.length > 0 || errors.email.length > 0 ||
        errors.phone.length > 0 || errors.password.length > 0 
    ) {
        return
    }
    
    this.setState({ is_loading: true })
    try{

        let register_result = await fetch(`${Net.SERVER}/api/user`, {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                }, 
                                body: JSON.stringify({ 
                                            name, email, password, phone,
                                            password_confirmation 
                                        })
                                })
        
        let register_result_json = await register_result.json()
        console.log(register_result_json['saved'])
       
        if( !register_result_json.saved || !register_result_json.id ) {
            let apperrors = this.state.errors
            apperrors.register = 'Check your credentials and try again'
            this.setState({ errors: apperrors, is_loading: false })
            
            return
        } 
        
        this.setState({ is_register_successful: true, is_loading: false })
        await AsyncStorage.setItem(Storage.USER, JSON.stringify({
                                name, email, password, phone, _id: register_result_json.id 
                            }))
       
    }catch(e) {
        console.log(e)
        this.setState({ is_loading: false })
    }
    
    
  }// async register() { .. }


}


const styles = StyleSheet.create({

    user_detail_form: {
        marginHorizontal: 80
    },

    text_inputs: {
        marginBottom: 40, // 16
        paddingVertical: 40
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

  

export default RegisterActivity