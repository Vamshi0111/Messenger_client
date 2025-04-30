import React from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');


const isSmallScreen = width < 768;

export default function Interface() {

  const navigation = useNavigation();

  const handleStartChatting = () => {
    navigation.navigate("Login" as never);
  };

  return (
    <View style={styles.maincontainer}>
      <ImageBackground 
        source={require('../../../assets/images/Background img.png')} 
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      />
      <View style={styles.subcontainer}>
        <View style={styles.container}>
          <View style={styles.textcontainer}>
            <Text style={isSmallScreen ? styles.smallTitle : styles.title}>Begin fostering new friendships.</Text>
            <Text style={isSmallScreen ? styles.smallSubtitle : styles.subtitle}>Dive into creating new circles.</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.classbutton}>
              <TouchableOpacity style={styles.button} onPress={handleStartChatting}>
                <Text style={styles.buttonText}>Start Chatting</Text>
               </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute', 
    resizeMode: 'cover', 
  },
  imageStyle: {
    opacity: 0.3, 
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height:'45%',
    // backgroundColor:'red',
    justifyContent:'space-between',
    paddingBottom:'8%',
    alignItems: 'center',
  },
  textcontainer: {
    paddingLeft: '2%',
    width:'100%',
    alignItems: isSmallScreen ? 'flex-start' : 'flex-start', 
  },
  buttonContainer: {
    width: '100%',
    height: 60,
    marginTop: 100,
  },
  classbutton: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B55D3',
    borderRadius: 10,
    width: isSmallScreen ? 200 : 215,
    height: 60,
    marginBottom:20
  },
  buttonText: {
    fontWeight: '400',
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 40,
    alignItems:'flex-start',
    textAlign: isSmallScreen ? 'left' : 'left',
  },
  smallTitle: {
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'left',
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 21,
    marginTop: 20,
    textAlign: isSmallScreen ? 'left' : 'left', 
  },
  smallSubtitle: {
    fontWeight: '500',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
});
