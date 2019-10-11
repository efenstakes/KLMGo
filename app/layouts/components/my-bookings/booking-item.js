import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Paragraph, Title, Text, List } from 'react-native-paper'

// import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import moment from 'moment'

import UmnrItem from './umnr-item'
import LuggageItem from './luggage-item'
import PetItem from './pet-item'
import GroupItem from './group-item'


export default class BookingItem extends Component {

    render() {
        let item = this.props.item 

        // status content
        let status_content = <Text style={ styles.text_items }>Status  Pending </Text>
        if( item.accepted.status && item.accepted.staff != null ) {
            status_content = <Text style={ styles.text_items }>Status  Accepted </Text>
        }
        if( !item.accepted.status && item.accepted.staff != null ) {
            status_content = <Text style={ styles.text_items }>Status  Denied </Text>
        }

        // travel date content
        let travel_date_content = (
                                        <Text style={ styles.text_items }> 
                                            Left { moment(new Date(item.travel_date)).fromNow() } 
                                        </Text>
                                    )
        if( moment(item.travel_date).isAfter(new Date()) ) {
            travel_date_content = (
                                <Text style={ styles.text_items }> 
                                    You leave { moment(new Date(item.travel_date)).fromNow() } 
                                </Text>
                            )
        }



        return (
          <View style={[styles.item, { marginVertical: 8 }]}>

            {/** status */}
            { status_content }

            {/** destination */}
            {/* <List.Item
                    title={ item.destination }
                    left={props => <List.Icon {...props} icon="airplane-takeoff" />}
                /> */}
            <Text style={ styles.text_items }> 
                Destination { item.destination } 
            </Text>
  
            {/** time */}
            {/* <List.Item
                    title={ item.travel_date }
                    left={props => <FontAwesome5 {...props} icon="clock-outline" />}
                /> */}
            {/* <Text style={ styles.text_items }> 
                Departure Date { moment(new Date(item.travel_date)).fromNow() } 
            </Text> */}
            { travel_date_content }

            {/** bookings */}
            <List.Accordion
                title="My Bookings"
                left={props => <List.Icon {...props} icon="flight" />}
            >

                <View style={{ marginHorizontal: '0%' }}>

                    <UmnrItem item={ item.bookings.umnr } 
                        styles={{ item: styles.booking_item, title: styles.item_title }} />
                    <GroupItem item={ item.bookings.group } 
                        styles={{ item: styles.booking_item, title: styles.item_title }} />
                    <PetItem item={ item.bookings.pet } 
                        styles={{ item: styles.booking_item, title: styles.item_title }} />
                    <LuggageItem item={ item.bookings.luggage } 
                        styles={{ item: styles.booking_item, title: styles.item_title }} />

                </View>
            </List.Accordion>


          </View>
        )
    }

}


const styles = StyleSheet.create({

    item: {
        borderRadius: 8, 
        borderWidth: .75, 
        borderBottomWidth: .5,
        borderColor: '#7C7F7D', // 2cdeea
        marginHorizontal: 2,
        marginVertical: 4,
        padding: 8
    },


    booking_item: {

        marginBottom: '4%'

    },

    item_title: {
        fontSize: 16,
        marginBottom: 8
    },

    text_items: {
        fontSize: 16,
        lineHeight: 32
    }


})