import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CloseFriendsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back-outline" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Close friends</Text>
      </View>
      <Text style={styles.description}>
        We don't send notifications when you edit your Close Friends list.{' '}
        <Text style={styles.linkText}>How it works.</Text>
      </Text>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} style={styles.searchIcon} />
        <TextInput 
          placeholder="Search" 
          style={styles.searchInput} 
        />
      </View>
      {/* <View style={styles.middleContainer}>
        <Text style={styles.headersText}>NO friends ur close</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  description: {
    color: '#666',
    marginBottom: 20,
  },
  linkText: {
    color: '#007aff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headersText: {
    fontSize: 16,
    color: '#333',
  },
});
