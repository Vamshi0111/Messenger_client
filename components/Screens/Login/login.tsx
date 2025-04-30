import React, { useState } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { authuserApi } from "@/app/api-request/authuser";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userCookie } from "@/app/api-request/config";
const { width } = Dimensions.get('window');
const isSmallScreen = width < 768;

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [inputText, setInputText] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessagePassword, setErrorMessagePassword] = useState('');
  const [errorMessagedata, setErrorMessagedata] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleInputChange = (text: string) => {
    const filteredText = text.replace(/[^a-zA-Z_0-9]/g, '');
    if (/^[a-zA-Z]/.test(filteredText)) {
      setInputText(filteredText);
      setErrorMessage('');
    } else {
      setInputText(filteredText.replace(/[0-9]/g, ''));
      setErrorMessage('Nickname should start with a letter.');
    }
  }

  const handleInputPasswordChange = (password: string) => {
    setInputPassword(password);
    if (password.length < 6) {
      setErrorMessagePassword('Password must be at least 6 characters.');
    } else {
      setErrorMessagePassword('');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never);
  };

  const handleforgotlogin = () =>{
    navigation.navigate('PasswordRecovery')
  }

  const handleAllRooms = async () => {
    let valid = true;

    if (inputText.trim() === '') {
      setErrorMessage('* Please enter a nickname to continue.');
      valid = false;
    } else {
      setErrorMessage('');
    }

    if (inputPassword.length < 6) {
      setErrorMessagePassword('* Password must be at least 6 characters.');
      valid = false;
    } else {
      setErrorMessagePassword('');
    }

    if (valid) {
      try {
        const response = await authuserApi({
          user_name: inputText,
          password: inputPassword,
        });

        // Check if the response contains a token
        if (response?.token) {

        
          
          const savedToken = await AsyncStorage.setItem(userCookie, response?.token);

          console.log(savedToken);
          console.log('token saved');
          
          

          console.log('Success:', response.token);
          navigation.navigate('Tablayout' as never);
          setInputText('');
          setInputPassword('');
          alert('Logged in successfully.');
        } else {
          // Handle error messages from the server
          setErrorMessagedata(response?.message || '* Invalid credentials.');
          console.log("Error submitting details");
        }
      } catch (error) {
        console.error(error);
        setErrorMessagedata('* Something went wrong.');
      }
    }
  };

  const isGuestButtonEnabled = inputPassword.length >= 6 && inputText.trim() !== '';

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/Logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter a nickname and password to continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          value={inputText}
          placeholder="Example - Lorem_123"
        />
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <View style={styles.passwordWrapper}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={handleInputPasswordChange}
            value={inputPassword}
            placeholder="Please Enter Your Password"
            secureTextEntry={!showPassword}
            maxLength={20}
          />
          <View style={{justifyContent:'center'}}>
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordIcon}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={24} 
              color="#7B55D3" 
            />
          </TouchableOpacity>
          </View>
        </View>
        {errorMessagePassword ? <Text style={styles.errorMessage}>{errorMessagePassword}</Text> : null}
        {errorMessagedata ? <Text style={styles.errorMessage}>{errorMessagedata}</Text> : null}

        <TouchableOpacity
          style={[styles.buttonContainer, !isGuestButtonEnabled && styles.buttonDisabled]}
          onPress={handleAllRooms}
          disabled={!isGuestButtonEnabled}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.existingAccount}>Don't have an Account ? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={handleforgotlogin}><Text style={styles.registerText}>Forgot login ?</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
    padding: isSmallScreen ? 10 : 20,
  },
  logo: {
    width: isSmallScreen ? 100 : 150,
    height: isSmallScreen ? 100 : 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: isSmallScreen ? 24 : 30,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: isSmallScreen ? 16 : 18,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    gap:20,
    alignItems: 'center',
  },
  input: {
    fontSize: isSmallScreen ? 16 : 18,
    height: 40,
    width: '90%',
    borderColor: '#7B55D3',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  passwordWrapper: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    fontSize: isSmallScreen ? 16 : 18,
    height: 40,
    width: '100%',
    borderColor: '#7B55D3',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingRight: 40, // Add padding to make space for the icon
  },
  passwordIcon: {
    position: 'absolute',
    right: 10,
  },
  buttonContainer: {
    backgroundColor: '#DCDCDC',
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
    borderColor: '#B0B0B0',
    opacity: 0.2,
  },
  buttonText: {
    fontSize: isSmallScreen ? 16 : 18,
    fontWeight: '500',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    paddingBottom: 15,
  },
  existingAccount: {
    color: 'red',
    fontWeight: '500',
    fontSize: isSmallScreen ? 15 : 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '70%',
    height: '5%',
  },
  registerText: {
    color: '#7B55D3',
    fontWeight: '500',
    fontSize: isSmallScreen ? 15 : 18,
  },
});
