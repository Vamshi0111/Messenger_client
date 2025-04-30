import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function AccExisting() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();

  const handleUsernameChange = (text: string) => {
    if (text.length === 0 || /^[a-zA-Z][a-zA-Z0-9]*$/.test(text)) {
      setUsername(text);
      if (text.trim() !== '') setUsernameError('');
    } else {
      setUsernameError('Username must start with a letter and can contain letters and numbers only.');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.trim() !== '') setPasswordError('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const WithoutLogin = () => {
    navigation.navigate('Login' as never);
  };

  const ForgotLogin = () => {
    navigation.navigate('PasswordRecovery' as never);
  };

  const handleContinue = () => {
    let valid = true;

    if (username.trim() === '') {
      setUsernameError('Please enter your username');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      navigation.navigate('Tablayout' as never);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/Logo.png')}  style={{width:100,height:90}} />
      <Text style={{ fontSize: 30 }}>Lorem</Text>
      <View style={{ width: '100%', gap:15 }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <TextInput
            style={styles.textInput}
            onChangeText={handleUsernameChange}
            value={username}
            placeholder="Your Username" />
          {usernameError ? <Text style={styles.errorMessage}>{usernameError}</Text> : null}
        </View>
        <View style={{ width: '100%', alignItems: 'center', columnGap:25 }}>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={handlePasswordChange}
              value={password}
              placeholder="Your Password"
              secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#7B55D3" style={styles.passwordIcon} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleContinue}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={WithoutLogin}><Text style={{ marginTop:10,color:'#7B55D3',fontWeight:'500' }}>Wish to chat without login?</Text></TouchableOpacity>
      <TouchableOpacity onPress={ForgotLogin}><Text style={{ marginTop:10,color:'#7B55D3',fontWeight:'500' }}>Forgot login?</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems: 'center',
    gap: 10,
    padding:7
  },
  textInput: {
    fontSize: 18,
    height: 40,
    width: '90%',
    borderColor: '#7B55D3',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 15,
    borderColor: '#7B55D3',
    borderWidth: 1,
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    height: 40,
    paddingHorizontal: 10,
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
    fontSize: 18,
    fontWeight: '500',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});
