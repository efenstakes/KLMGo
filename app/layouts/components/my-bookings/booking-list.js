import React from 'react'
import { View } from 'react-native'
import { Paragraph, Title, Text, Button } from 'react-native-paper'


// import Icon from 'react-native-vector-icons/FontAwesome'
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'
 
import BookingItem from './booking-item'



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
            <Text style={{ fontSize: 20, marginTop: 16, marginBottom: 8, alignSelf: 'flex-end' }}> 
              We Found { bookings.length } Bookings For You
            </Text>

            {
                bookings.length > 0 &&
                bookings.map((booking, index)=> {
                    return (
                        <BookingItem key={index} item={ booking } />
                    )
                })
            }

            

            {/** prompt user to make another booking  */}
            <Button uppercase={false} mode='contained' onPress={ goToBooking }
                  style={{ marginVertical: 48, borderRadius: 24 }}
              > Make A Booking Now </Button>
              {/** prompt user to make another booking  */}

        </View>
    )
}