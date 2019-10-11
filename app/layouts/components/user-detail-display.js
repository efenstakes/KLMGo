import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Paragraph, Text, Title, List, Button, Avatar  } from 'react-native-paper'


export default UserDetailDisplay = ({ user, width, goToLogin, seeForm }) => {

    return(

        <View>

          <View>

            {/* <Image
                source={ require('../../assets/icons/klm_go_logo_circular.png') }
                style={{ marginTop: '4%', marginBottom: '4%', width: (width/4), height: (width/4), alignSelf: 'center' }}
            /> */}
            {/* <Avatar.Icon size={ (width/4) } icon="person"
                style={{ 
                    marginTop: '4%', marginBottom: '4%', backgroundColor: '#FFF', 
                    color: '#2cdeea', borderColor: '#2cdeea', borderWidth: 4, 
                    alignContent: 'center', width: (width/4), height: (width/4), 
                    alignSelf: 'center', alignItems: 'center' 
                }} /> */}

          </View>

          <View style={{ flex: 1, marginHorizontal: '20%', width: '100%'  }}>
            
            <Text
                style={{ marginTop: '4%', marginBottom: '4%', fontSize: 24 }}>
                    Your Details
            </Text>

            {/** name */}
            <List.Item
                    title={ user.name }
                    left={props => <List.Icon {...props} icon="verified-user" />}
                />
            {/** email */}
            <List.Item
                    title={ user.email }
                    left={props => <List.Icon {...props} icon="email" />}
                />
            {/** phone */}
            <List.Item
                    title={ user.phone }
                    left={props => <List.Icon {...props} icon="phone" />}
                />

            
            {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: '80%' }}>

                <Button onPress={ goToLogin } 
                        style={ styles.cta_btn } 
                        mode="contained" uppercase={false}> 
                        Switch Account
                </Button>
                <Button onPress={ seeForm } 
                        style={ styles.cta_btn } 
                        mode="contained" uppercase={false}> 
                        Use Other Credentials
                </Button>

            </View> */}

          </View>


        </View>

    )

}

const styles = StyleSheet.create({

    cta_btn: {
        marginVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 24
    },

})