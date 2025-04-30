import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons,  } from '@expo/vector-icons';

export default function BlockedAccountsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black"  />
        </TouchableOpacity>
        <Text style={styles.headerText}>Blocked accounts</Text>
        <TouchableOpacity >
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});
