import React from "react";
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmEmail() {
    const navigation = useNavigation();
    
    const handlenextstep = () =>{
        navigation.navigate('Login' as never);
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',width:'100%',height:'20%',justifyContent:'center',alignItems:'center',columnGap:20}}>
            <Image source={require('../../../assets/images/Image1.png')} />
            <Text style={{fontSize:20,fontWeight:'500'}}>Lorem</Text>
            </View>
            <View style={styles.subcontainer}>
                <View style={{ width: '90%', height: '12%', backgroundColor: 'black', justifyContent: 'center', paddingLeft: '5%' }}>
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>Confirm email address</Text>
                </View>
                <Text style={{ fontWeight: '600',fontSize:14 }}>This email address connected to your account</Text>
                <View style={{width:'90%',rowGap:5}}>
                <Text>Enter email address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="lorem@gmail.com"
                    placeholderTextColor="#000"/>
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={handlenextstep}>
                    <Text style={styles.buttonText}>Next Step</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A487E7',
        justifyContent: 'flex-end',
    },
    subcontainer: {
        height: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop:'20%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        rowGap:30,
    },
    input: {
        height: 50,
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius:10,
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        width: '60%',
        height:50,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
      },
      buttonText: {
        fontSize: 18,
        fontWeight:'500',
        color:'white',
      },
});
