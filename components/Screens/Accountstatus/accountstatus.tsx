import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AccountStatus = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity >
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Status</Text>
      </View>
      <View style={styles.profileContainer}>
      <Image source={require('@/assets/images/Logo.png')} style={styles.profileImage} />
        <Text style={styles.username}>its_me_love</Text>
      </View>
      <Text style={styles.description}>
        See any actions that Instagram has taken when your account or content doesn't follow our guidelines. <Text style={styles.learnMore}>Learn more about Account Status.</Text>
      </Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Icon name="image-outline" size={24} />
          <Text style={styles.optionText}>Removed content</Text>
          <Icon name="checkmark-outline" size={24} style={styles.optionCheckmark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="chatbubble-outline" size={24} />
          <Text style={styles.optionText}>Features you can't use</Text>
          <Icon name="checkmark-outline" size={24} style={styles.optionCheckmark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop:20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop:20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    // paddingTop:20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  learnMore: {
    color: '#007AFF',
  },
  optionsContainer: {
    marginTop: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
  },
  optionCheckmark: {
    marginLeft: 'auto',
    color: 'green',
  },
});

export default AccountStatus;
