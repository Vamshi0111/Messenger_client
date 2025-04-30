import React from "react";
import { Text, StyleSheet, View, Button, TextInput, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PasswordRecovery() {

    const navigation = useNavigation();
    
    const handleNextStep = () => {
        navigation.navigate('Confirmemail' as never);
      };
    const handleLoginPage = () =>{
        navigation.navigate('Login' as never);
    };
    const handleForgotUsername = () =>{
        navigation.navigate('Usernamerecovery' as never);
    };

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',width:'100%',height:'20%',justifyContent:'center',alignItems:'center',columnGap:20}}>
            <Image source={require('../../../assets/images/Image1.png')} />
            <Text style={{fontSize:20,fontWeight:'500'}}>Lorem</Text>
            </View>
            <View style={styles.subcontainer}>
                <View style={{ width: '90%', height: '10%', backgroundColor: 'black', justifyContent: 'center', paddingLeft: '5%' }}>
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>Password Recovery</Text>
                </View>
                <Text style={{ fontWeight: '600',fontSize:19 }}>Forget password? Let's reset it</Text>
                <Image source={require('../../../assets/images/Cat.png')} />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#000"/>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleNextStep}>
                    <Text style={styles.buttonText}>Next Step</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginPage}>
                    <Text style={{fontSize:15,fontWeight:'500'}}>Login Page</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgotUsername}>
                    <Text style={{fontSize:15,fontWeight:'500'}}>Forgot Username?</Text>
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
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        rowGap:17,
    },
    input: {
        width: '90%',
        height: 45,
        borderWidth: 1,
        marginTop: 10,
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
