import { createUser } from '@/app/api-request/registerAPI';
import  DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';

export default function Register() {

    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [Phoneerror, setPhoneError] = useState('');
    const [Emailerror, setEmailError] = useState('');
    const [Passworderror, setPassworderror] = useState('');
    const [RePassworderror, setRePassworderror] = useState('');
    const [AgeError, setAgeError] = useState('');

    const handlePhoneChange = (text: string) => {
        const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, 10);
        setPhone(sanitizedText);
        if (sanitizedText.length === 10) {
            setPhoneError('');
        } else {
            setPhoneError('Please enter a valid 10-digit phone number');
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(text)) {
            setEmailError('');
        } else {
            setEmailError('Please enter a valid email address');
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.length >= 8) {
            setPassworderror('');
        } else {
            setPassworderror('Password must be at least 8 characters');
        }
    };

    const handleRePasswordChange = (text: string) => {
        setRePassword(text);
        if (text.length >= 8) {
            setRePassworderror('');
        } else {
            setRePassworderror('Password must be at least 8 characters');
        }
        if (password === text) {
            setRePassworderror('');
        } else {
            setRePassworderror('Passwords do not match');
        }
    };

    const validForm = async () => {
        let valid = true;

        if (!phone) {
            valid = false;
            setPhoneError('Phone is required');
        } else if (phone.length !== 10) {
            setPhoneError('Please enter a valid 10-digit phone number');
            valid = false;
        } else {
            setPhoneError('');
        }

        if (!email) {
            valid = false;
            setEmailError('Email is required');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            valid = false;
            setPassworderror('Password is required');
        } else if (password.length < 8) {
            setPassworderror('Password must be at least 8 characters');
            valid = false;
        } else {
            setPassworderror('');
        }

        if (!RePassword) {
            valid = false;
            setRePassworderror('Password is required');
        } else if (RePassword.length < 8) {
            setRePassworderror('Password must be at least 8 characters');
            valid = false;
        } else {
            setRePassworderror('');
        }

        if (password !== RePassword) {
            setRePassworderror('Passwords do not match');
            valid = false;
        } else {
            setRePassworderror('');
        }

        if (!dateOfBirth) {
            valid = false;
            setAgeError('Date of Birth is required');
        } else {
            const today = new Date();
            const diff = today.getTime() - dateOfBirth.getTime();
            const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            if (age < 14) {
                setAgeError('Age must be at least 14 years');
                valid = false;
            } else {
                setAgeError('');
            }
        }

        if (valid) {
            try {
                const data = {
                    user_name: userName,
                    name,
                    date_of_birth: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : '',
                    phone,
                    email,
                    password,
                };

                const response = await createUser(data);

                console.log('API Response:', response);

                if (response.message === "User created successfully") {
                    Alert.alert('Success', 'Registered Successfully');
                    setUserName('');
                    setName('');
                    setDateOfBirth(undefined);
                    setPhone('');
                    setEmail('');
                    setPassword('');
                    setRePassword('');
                    navigation.navigate('Tablayout' as never);
                } 
                
                else {
                    Alert.alert('Error', response.message || 'Registration Failed');
                }
                
            } catch (error: any) {
                console.error('Error:', error);
                Alert.alert('Error', 'An error occurred');
            }
            
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onDateChange = (event: any, selectedDate: Date | undefined) => {
        if (event.type === 'dismissed') { 
            setShowDatePicker(false); 
        } else {
            setShowDatePicker(Platform.OS === 'ios'); 
            if (selectedDate) {
                setDateOfBirth(selectedDate); 
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register Account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        placeholderTextColor={'black'}
                        value={userName}
                        onChangeText={setUserName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor={'black'}
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
                        <Text style={[styles.datePickerText, !dateOfBirth && { color: 'black' }]}>
                            {dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : 'Date of Birth'}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth || new Date()}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                            maximumDate={new Date()}
                            minimumDate={new Date(1900, 0, 1)}
                        />
                    )}
                    {AgeError ? <Text style={styles.errortext}>{AgeError}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        placeholderTextColor={'black'}
                        value={phone}
                        onChangeText={handlePhoneChange}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                    {Phoneerror ? <Text style={styles.errortext}>{Phoneerror}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={'black'}
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                    {Emailerror ? <Text style={styles.errortext}>{Emailerror}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={'black'}
                        secureTextEntry
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                    {Passworderror ? <Text style={styles.errortext}>{Passworderror}</Text> : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Re-type Password"
                        placeholderTextColor={'black'}
                        secureTextEntry
                        value={RePassword}
                        onChangeText={handleRePasswordChange}
                    />
                    {RePassworderror ? <Text style={styles.errortext}>{RePassworderror}</Text> : null}
                    <TouchableOpacity onPress={validForm} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        rowGap: 20,
        maxWidth: 600,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        fontSize: 18,
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    datePickerButton: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    datePickerText: {
        fontSize: 18,
    },
    errortext: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export { Register };
