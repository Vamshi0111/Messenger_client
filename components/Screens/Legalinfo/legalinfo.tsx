import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const Legal = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Legal Information</Text>
      <Text style={styles.content}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
      <Image 
        source={require('@/assets/images/Legal.png')} 
        style={styles.image}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop:50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FF6347',
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontWeight:'400'
  },
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
  },
});

export default Legal;
