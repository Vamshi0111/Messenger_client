import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Languages() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [searchQuery, setSearchQuery] = useState('');

  const languages = [
    'English', 'English(UK)', 'Spanish', 'French', 'Brazilian Portuguese', 'Italian',
    'Polish', 'Portuguese', 'Swedish',
  ];

  const filteredLanguages = languages.filter(language =>
    language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguagePress = (language:any) => {
    setSelectedLanguage(language);
    setSearchQuery(''); // Reset search query
  };

  return (
    < View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { / Add your back navigation function here / }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>App Language</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.footer}>
        {filteredLanguages.map((language) => (
          <TouchableOpacity
            key={language}
            style={styles.option}
            onPress={() => handleLanguagePress(language)}
          >
            <Text style={styles.optionText}>{language}</Text>
            {selectedLanguage === language && (
              <Ionicons name="checkmark-outline" size={20} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20,
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
  searchInput: {
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  footer: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
