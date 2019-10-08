import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"


export default class Accordion extends React.Component{

    constructor(props) {
        super(props)
        this.state = { 
        //   data: props.data,
          expanded : false,
        }
    }
  
  render() {

    return (
       <View style={{ marginBottom: 8 }}>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={ 'gray' } />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text>{this.props.data}</Text>    
                </View>
            }
       </View>
    )
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: 'gray',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'white',
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%'
    },
    child:{
        backgroundColor: 'white',
        paddingBottom: 16,
        paddingTop: 8,
        paddingHorizontal: 24
    }
    
});
