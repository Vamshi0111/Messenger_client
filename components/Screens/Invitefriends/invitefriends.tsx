import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function InviteFriendsScreen() {
  const handleEmailPress = () => {
    const email = 'mailto:example@example.com?subject=Invite&body=Join%20me%20on%20this%20awesome%20app!';
    Linking.openURL(email).catch(err => console.error('Error opening email app', err));
  };

  const handleSmsPress = () => {
    const sms = 'sms:+1234567890?body=Join%20me%20on%20this%20awesome%20app!';
    Linking.openURL(sms).catch(err => console.error('Error opening SMS app', err));
  };

  const handleFacebookPress = () => {
    const facebook = 'fb://profile/1234567890'; 
    Linking.openURL(facebook).catch(err => {
      console.error('Error opening Facebook app', err);
      // Fallback to the web URL if the Facebook app is not installed
      Linking.openURL('https://www.facebook.com/'); 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { / Add your back navigation function here / }}>
          <Ionicons name="arrow-back-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Follow and invite friends</Text>
      </View>
      <TouchableOpacity style={styles.option} onPress={handleEmailPress}>
        <Ionicons name="mail-outline" size={24} style={styles.icon} />
        <Text style={styles.optionText}>Invite friends by email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleSmsPress}>
        <Ionicons name="chatbubble-outline" size={24} style={styles.icon} />
        <Text style={styles.optionText}>Invite friends via SMS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleFacebookPress}>
        <FontAwesome name="facebook" size={24} style={styles.icon} />
        <Text style={styles.optionText}>Invite friends via Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
