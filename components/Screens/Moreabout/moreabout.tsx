import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Moreabout = ({ }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>About</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>About your account</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>Terms of Use</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
       
       
      </View>
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
  content: {
    marginTop: 20,
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
});

export default Moreabout;
