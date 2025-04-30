import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import React from 'react'

export default function Help() {
    const navigation =useNavigation();
  return (
    <View style={styles.maincontainer}>
        <View style={styles.container}>
            <TouchableOpacity>
            <Icon name="arrow-back-outline" size={20}/>
            </TouchableOpacity>
     
        <Text style={styles.helpcontainer}>Help</Text>
        </View>
         
         <TouchableOpacity style={styles.option}>
       <Text style={styles.optiontext}>Report a problem</Text>
       <Icon name="caret-forward-outline" size={20} style={styles.optionDetail}/>
         </TouchableOpacity>


       
         
         <TouchableOpacity style={styles.option}>
              <Text style={styles.optiontext}>Support Requests</Text>
              <Icon name="caret-forward-outline" size={20} style={styles.optionDetail}/>

         </TouchableOpacity>
      
    </View>
  )
}

const styles=StyleSheet.create({
    maincontainer:{
            paddingTop:35,
    },
    helpcontainer:{
               fontSize:16,
               fontWeight:"800",
    },
    container:{
          flexDirection:"row",
          gap:20,
          margin:10, 
    },
    option:{
        
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
          },
    
    optiontext:{
        
            fontSize: 16,
            marginLeft: 8,
          
    },
    optionDetail:{
        marginLeft: 'auto',
        color: '#888',
    },
    
})