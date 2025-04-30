import React, { useContext, useState } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { createAnRoomApi } from "@/app/api-request/RoomsScreen"; // Assuming this is where you import your API function
import { useNavigation } from "@react-navigation/native";
import { authuserApi } from "@/app/api-request/authuser";

export default function Createroom() {

  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  }

  const handleRoomNameChange = (text: string) => {
    setRoomName(text);
  }

  const OnSubmitcreateRoom = async () => {
    if (!roomName.trim()) {
      setError('Room name is required');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    try {
      const data = {
        room_name: roomName,
        room_password: password,
        user_id:1
      };

      const response = await createAnRoomApi(data);
      
      // Handle response as needed
      console.log(response);
      setRoomName('');
      setPassword('');
      navigation.navigate('EditRoomChat' as never)
    } catch (error) {
      setError('Error creating room');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Logo.png')}  style={{width:100,height:90}} />
      <Text style={{ fontSize: 25 }}>Create Room</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your Roomname"
        onChangeText={handleRoomNameChange}
        value={roomName}
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Your Password"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword}>
          <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#7B55D3" style={styles.passwordIcon} />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.buttonContainer} onPress={OnSubmitcreateRoom}>
        <Text style={styles.buttonText}>CREATE ROOM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    fontSize: 18,
    height: 40,
    width: '90%',
    borderColor: '#7B55D3',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderColor: '#7B55D3',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    height: 40,
  },
  passwordIcon: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#DCDCDC',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    overflow: 'hidden',
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
