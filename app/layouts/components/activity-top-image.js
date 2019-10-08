import React from 'react'
import { View, Image } from 'react-native'


export default function ActivityTopImage({ image, height }) {

   return (
      <View style={{ flex: 1, marginHorizontal: '4%', marginVertical: '4%' }}>

        <Image
            source={ image }
            style={{ 
                height: height, // 200, 
                width: '100%', 
                borderRadius: 16,
                justifyContent: 'center',
            }} 
        />

      </View>
   )

}