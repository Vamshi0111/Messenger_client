import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { feedbackapi } from "@/app/api-request/feedback"; // Assuming you have the feedback function in feedbackApi.ts

interface FeedbackState {
  inputText: string;
  rating: number;
}

export default function Feedback() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [feedbackState, setFeedbackState] = useState<FeedbackState>({
    inputText: "",
    rating: 0
  });

  const [loading, setLoading] = useState(false);
  const [errorMessagedata, setErrorMessagedata] = useState("");

  const handleLeaveaReview = (text: string) => {
    setFeedbackState((prevState) => ({
      ...prevState,
      inputText: text
    }));
  };

  const handleStarPress = (starNumber: number) => {
    setFeedbackState((prevState) => ({
      ...prevState,
      rating: starNumber
    }));
  };

  const handleOk = async () => {
    if (feedbackState.inputText.trim() === "") {
      Alert.alert("Validation Error", "Please enter your review.");
      return;
    }
    if (feedbackState.rating === 0) {
      Alert.alert("Validation Error", "Please provide a rating.");
      return;
    }

    setLoading(true);
    try {
      const response = await feedbackapi({
        review: feedbackState.inputText,
        rating: feedbackState.rating
      });

      if (response?.success) {
        console.log('Success:', response);
        navigation.navigate('Lorem' as never);
        setFeedbackState({ inputText: "", rating: 0 });
        Alert.alert('Success', 'Thank you for your feedback!');
      } else {
        setErrorMessagedata(response?.message || '* An error occurred while submitting feedback.');
        console.log("Error submitting feedback:", response);
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      setErrorMessagedata('* An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Logo.png')} style={styles.image} />
      <Text style={styles.title}>Thanks for your feedback</Text>
      <Text style={styles.subtitle}>You can also write a review</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Ionicons
              name={star <= feedbackState.rating ? "star" : "star-outline"}
              color={'#FFCE31'}
              size={24}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={handleLeaveaReview}
        value={feedbackState.inputText}
        placeholder="Leave a review"
        multiline={true}
      />
      {errorMessagedata ? <Text style={styles.error}>{errorMessagedata}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button
          title="OK"
          onPress={handleOk}
          color="#7B55D3"
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    marginBottom: 20,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: "500",
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "20%",
    marginTop: 10,
  },
});
