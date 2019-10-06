import React from 'react'
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Paragraph } from 'react-native-paper'

import { Button, Card, Icon } from 'react-native-elements'


function HomeServiceCard({ service, onServiceClick }) {
    return (

      <TouchableHighlight
        underlayColor={'white'}
        onPress={ ()=> onServiceClick(service) }>
      
        <Card
          containerStyle={[ styles.service_card, { overflow: 'hidden' }]}
          featuredSubtitle={ service.title }
          featuredSubtitleStyle={{ position: 'absolute', bottom: 8, left: 8 }}
          // image={ service.image }
          // require('../../assets/images/klm-1.jpg')
          >

            <View>

                {/* <Image
                    source={ service.image }
                    style={{ height: 160, width: '110%', left: -16, flexGrow: 1, alignSelf: 'stretch' }} // , rotation: '180deg'
                /> */}
                
                <Image
                    source={ service.image }
                    style={{ height: 176, width: '116%', left: -16, alignSelf: 'stretch' }} 
                />

                <Paragraph style={{ marginTop: 8, marginBottom: 16 }}>
                  { service.woo_text }
                </Paragraph>
  
                <View style={{ flex: 1, flexDirection: 'row' }}>

                  <View style={{ flex: 5 }}></View>
                  <View style={{ flex: 4 }}>

                    <Button
                        // icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={ styles.cta_button }
                        title='Explore Now' type='outline'
                        onPress={ ()=> onServiceClick(service) } 
                    />

                  </View>

                </View>

            </View>
          
  
        </Card>
        
      </TouchableHighlight>
    
    )
}

const styles = StyleSheet.create({

    service_card: {
        flex: 1,
        margin: '2%',
        paddingTop: '0%',
        // backgroundColor: 'lightgray',
        borderRadius: 16,
        // borderBottomRightRadius: 8,
        overflow: 'hidden'
    },

    service_card_image_container: {
        flex: 3
    },

    service_card_content: {
        flex: 2
    },

    service_card_image: {
        // width: 100, 
        margin: '3%',
        resizeMode: 'stretch'
    },
  
    cta_button: {
        borderWidth: 2,
        borderRadius: 24, 
        // borderBottomRightRadius: 8, 
        // marginBottom: 8
    }

})
  
    

export default HomeServiceCard

/*

        <Card 
            style={[ styles.service_card, {  overflow: 'hidden' }] }
            featuredSubtitle={ 'God missile' }
            // featuredSubtitleStyle={{ position: 'absolute', bottom: 8, left: 8 }}
          >
          
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          
          <Card.Content>

            <Title>  { this.props.service.title } </Title>
            <Paragraph> { this.props.service.woo_text } </Paragraph>

     
            <View style={{ flex: 1, flexDirection: 'row' }}>

              <View style={{ flex: 5 }}></View>
              <View style={{ flex: 4 }}>

                <Button
                    // icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{borderRadius: 24, marginLeft: 0, marginRight: 0, marginTop: 8}}
                    title='Explore Now' type='outline'
                    onPress={ ()=> this.props.onServiceClick(this.props.service) } 
                />

              </View>

            </View>

          </Card.Content>

        </Card>
        */