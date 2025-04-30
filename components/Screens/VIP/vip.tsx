import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const handleBECOMEAPATREON = () => {
  
};

function handleVIPSUPPORT() {
  
}

export default function Vip() {
    const navigation = useNavigation();

    const handleback = () =>{
        navigation.navigate('Profile' as never)
    }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Ionicons name="arrow-back-circle-outline" style={styles.icon} size={24} onPress={handleback}/>
        <Text style={styles.backToChat}>Back to chat</Text>
      </View>
      <Text style={styles.sub}>Become a VIP</Text>
      <Text style={styles.four}>Like us? To support our work, visit our Patreon page.</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleBECOMEAPATREON}>
        <Text style={[styles.buttonText, { borderRadius: 30 }]}>BECOME A VIP</Text>
      </TouchableOpacity>
      <Text style={styles.five}>Contact VIP Support</Text>
      <Text style={styles.six}>You do not have a VIP plan activated on your account. If you have just bought one, try re-logging into your account.</Text>
      <TouchableOpacity style={styles.vipContainer} onPress={handleVIPSUPPORT}>
        <Text style={styles.buttonText}>VIP SUPPORT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '3%',
    paddingTop:'20%',
    gap:15
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    height:'10%'
  },
  icon: {
    marginRight: 10,
    fontSize: 24,
  },
  backToChat: {
    fontWeight: "700",
    fontSize:16,
  },
  sub: {
    fontWeight: "bold",
    marginTop: 10, 
    fontSize:16,
  },
  four: {
    fontSize:17,

  },
  buttonContainer: {
    width: '40%',
    height: 40,
    marginTop: 7,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  five: {
    fontWeight: "700",
    marginTop: 20,
    fontSize:16,

  },
  six: {
        fontSize:16,
  },
  vipContainer: {
    width: '40%',
    height: 40,
    paddingLeft: 10,
    marginTop: 7,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
