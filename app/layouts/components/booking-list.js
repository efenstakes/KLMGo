
import React from 'react'
import { View, ScrollView, AsyncStorage, Text } from 'react-native'
import { Paragraph, Button } from 'react-native-paper'


// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 


export default function BookingList({ bookings, goToBooking }) {
    if( bookings.length == 0 ) {

        return(
          <View style={{ marginTop: '40%', marginHorizontal: 48 }}>
  
          <Paragraph style={{ fontSize: 24, lineHeight: 40, alignSelf: 'center' }}> 
              You dont have any bookings yet 
          </Paragraph>
          <AwesomeIcon name='frown-o' 
                style={{ alignSelf: 'center', fontSize: 40, color: 'lightblue' }}/>
  
            <Button uppercase={false} mode='contained' onPress={ goToBooking }
                  style={{ marginVertical: 48, borderRadius: 24 }}
              > Let's Go Make Some </Button>
  
          </View>
        )
  
    }// if( bookings.length == 0 ) { .. }

    // what to show when the bookings are not an empty list
    return(
        <View>
            <Text> user bookings here </Text>

            {
            bookings.map((booking, index)=> {
                return (
                <Text key={index}> { booking._id } </Text>
                )
            })
            }

        </View>
    )
}