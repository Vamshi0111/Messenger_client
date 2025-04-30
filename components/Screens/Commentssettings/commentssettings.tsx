import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CommentsSettings() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back-outline" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Comments</Text>
      </View>
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Block comments from</Text>
        <View style={styles.rightContainer}>
          <Text style={styles.rightText}>0 people</Text>
          <Icon name="chevron-forward-outline" size={24} style={styles.chevronIcon} />
        </View>
      </View>
      <Text style={styles.descriptionText}>
        Any new comments from people you block won't be visible to anyone but them.
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  chevronIcon: {
    color: '#666',
  },
  descriptionText: {
    paddingHorizontal: 16,
    color: '#666',
  },
});
