import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Postlogout = () => {
  const navigation = useNavigation();

  const handlereview = () =>{
    navigation.navigate('Feedback' as never)
  }

  const handlegotochat = () =>{
    navigation.navigate('Login' as never)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have been logged out</Text>
      <TouchableOpacity style={styles.chatButton} onPress={handlegotochat}>
        <Text style={styles.chatButtonText}>GO TO CHAT</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Click to start chatting again.</Text>
      <Text style={styles.message}>Come back soon!</Text>
      <Text style={styles.description}>
        We don’t want you to leave us but it’s good to take a break once in a while.
      </Text>
      <Image source={require('@/assets/images/Logo.png')} style={styles.image} />
      <Text style={styles.feedbackTitle}>Give your feedback</Text>
      <Text style={styles.feedbackSubtitle}>You can also write a review</Text>
      <View style={styles.stars}>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.star}>⭐</Text>
        <Text style={styles.star}>⭐</Text>
      </View>
      <TouchableOpacity style={styles.reviewButton} onPress={handlereview}>
        <Text style={styles.reviewButtonText}>Write a Review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.okButton}>
        <Text style={styles.okButtonText}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight:29,
  },
  chatButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackSubtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    fontSize: 24,
    marginHorizontal: 2,
  },
  reviewButton: {
    backgroundColor: '#7B55D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  reviewButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  okButton: {
    backgroundColor: '#7B55D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Postlogout;
