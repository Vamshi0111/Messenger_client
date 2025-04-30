import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.description}>
        Lorem apps enable real-time messaging, facilitating instant communication through individual and group chats. Users can engage in one-on-one conversations or participate in group chats with multimedia support. Presence indicators show when contacts are online or last active, aiding in communication availability. Notifications alert users to new messages for timely responses. Many apps offer end-to-end encryption for privacy and security. Some also feature voice and video calls alongside text-based messaging. Integration with other services like social media, file sharing, and productivity tools is common.
      </Text>
      <Image source={require('@/assets/images/About.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop:50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EB5757',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    color: '#4F4F4F',
    fontWeight:'400'
  },
  image: {
    width: '100%',
    height: 400,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default AboutUs;
