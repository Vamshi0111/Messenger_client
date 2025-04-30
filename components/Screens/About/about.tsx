import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const About = () => {

    const navigation = useNavigation();

  const handleSendMessage = () => {
    // Handle the send message logic here
    console.log('Send message');
  };

  const handleCheckServer = () => {
    // Handle the check server logic here
    console.log('Check server');
  };

  const handleback = () =>{
    navigation.navigate('Profile' as never)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About lerom chat</Text>
        <TouchableOpacity onPress={handleback}>
          <Text style={styles.closeButton}><AntDesign name="close" size={24} color="black" /></Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>lerom chat is powered by lerom chat software.</Text>

      <Text style={styles.sectionTitle}>Contact</Text>
      <TouchableOpacity style={styles.sendMessageButton} onPress={handleSendMessage}>
        <Text style={styles.sendMessageButtonText}>Send message</Text>
      </TouchableOpacity>
      <Text style={styles.emailSupport}>Email Support - mailto:support@lerom.in</Text>

      <Text style={styles.sectionTitle}>Credits</Text>
      <Text style={styles.creditText}>Emoticons: https://www.emojione.com</Text>
      <Text style={styles.creditText}>Notifications Sounds: notificationsounds.com</Text>
      <Text style={styles.creditText}>Icons: icons8.com</Text>
      <Text style={styles.creditText}>CDN: cloudflare.com</Text>
      <Text style={styles.creditText}>Backgrounds: pixabay.com</Text>
      <Text style={styles.creditText}>Emojis: twitter, google</Text>

      <Text style={styles.note}>If you believe we have missed crediting someone, let us know.</Text>

      <Text style={styles.version}>Version: 4038</Text>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:'10%',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#000',
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  sendMessageButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  sendMessageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailSupport: {
    fontSize: 16,
    marginVertical: 10,
  },
  creditText: {
    fontSize: 16,
    marginVertical: 2,
  },
  note: {
    fontSize: 16,
    marginVertical: 10,
  },
  version: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold'
  },
  serverStatus: {
    fontSize: 16,
    backgroundColor: '#D3B8FF',
    padding: 5,
    marginVertical: 10,
  },
  serverCheckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  serverCheckText: {
    fontSize: 16,
    marginRight: 10,
  },
  latency: {
    fontSize: 16,
    marginVertical: 10,
  },
  advancedUsersButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  advancedUsersText: {
    fontSize: 16,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    marginVertical: 20,
    
  },
  closeText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'right',
    marginTop: 20,
  },
});

export default About;
