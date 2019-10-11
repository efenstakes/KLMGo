import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Paragraph, Title, Text, List } from 'react-native-paper'

import AwesomeIcon from 'react-native-vector-icons/FontAwesome'

import UmnrItem from './umnr-item'
import LuggageItem from './luggage-item'
import PetItem from './pet-item'
import GroupItem from './group-item'


export default class BookingItem extends Component {

    render() {
        let item = this.props.item 

        let status_content = (
                                <List.Item
                                    title={ 'Pending' }
                                    left={props => <List.Icon {...props} icon="timer-sand" />}
                                />
                            )
        if( item.accepted.status && item.accepted.staff != null ) {
            status_content = (
                <List.Item
                    title={ 'Accepted' }
                    left={props => <List.Icon {...props} icon="timer-sand" />}
                />
            )
        }
        if( !item.accepted.status && item.accepted.staff != null ) {
            status_content = (
                <List.Item
                    title={ 'Denied' }
                    left={props => <List.Icon {...props} icon="timer-sand" />}
                />
            )
        }

        return (
          <View style={[styles.item, { marginVertical: 8 }]}>

            {/** status */}
            { status_content }

            {/** destination */}
            <List.Item
                    title={ item.destination }
                    left={props => <List.Icon {...props} icon="airplane-takeoff" />}
                />
            {/* <Text> { item.destination } </Text> */}

            {/** time */}
            <List.Item
                    title={ item.travel_date }
                    left={props => <List.Icon {...props} icon="clock-outline" />}
                />
            {/* <Text> { item.travel_date } </Text> */}

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
        borderWidth: 1, 
        borderColor: '#7C7F7D', // 2cdeea
        margin: 4,
        padding: 8
    },


    booking_item: {

        marginBottom: '4%'

    },

    item_title: {
        fontSize: 16,
        marginBottom: 8
    }


})