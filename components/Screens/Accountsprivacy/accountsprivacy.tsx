import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AccountPrivacy() {
  const [isPrivate, setIsPrivate] = useState(false);

  const toggleSwitch = () => {
    setIsPrivate(!isPrivate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Private account</Text>

      </View>
      <Text style={styles.descriptionText}>
        When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don't have an Instagram account.
      </Text>
      <Text style={styles.descriptionText}>
        When your account is private, only the followers that you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. Certain info on your profile, such as your profile picture and username, is visible to everyone on and off Instagram.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backIcon: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
  },
  descriptionText: {
    paddingHorizontal: 16,
    marginBottom: 10,
   
  },
  linkText: {
    color: '#007aff',
  },
});
