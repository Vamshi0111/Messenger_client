import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const permissions = [
  { name: 'Camera', status: 'Allowed' },
  { name: 'Contacts', status: 'Not allowed' },
  { name: 'Location services', status: 'Allowed' },
  { name: 'Microphone', status: 'Allowed' },
  { name: 'Notifications', status: 'Allowed' },
  { name: 'Photos and videos', status: 'Allowed · All' },
];

const PermissionsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { / Add your back navigation function here / }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Device permissions</Text>
      </View>
      <Text style={styles.subtitle}>Your preferences</Text>
      <View style={styles.content}>
        {permissions.map((item, index) => (
          <TouchableOpacity key={index} style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{item.status}</Text>
              <Ionicons name="chevron-forward" size={20} color="black" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="videocam-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtitle: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#888',
  },
  content: {
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 5,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PermissionsScreen;
