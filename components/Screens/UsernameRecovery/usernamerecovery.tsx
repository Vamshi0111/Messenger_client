// import React, { useState } from "react";
// import { StyleSheet, View, Text, TextInput, Modal, Alert, Image, TouchableOpacity, Pressable } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { usernamerecoveryApi, verifyRecoveryOtpApi, resendOtpApi } from "@/app/api-request/username";

// export default function UsernameRecovery() {
//     const [showConfirmationCodeInput, setShowConfirmationCodeInput] = useState(false);
//     const [emailAddress, setEmailAddress] = useState('');
//     const [otpCode, setOtpCode] = useState('');
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const [username, setUsername] = useState('');
//     const navigation = useNavigation();

//     const handleNextStep = async () => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(emailAddress)) {
//             Alert.alert('Error', 'Invalid email format');
//             return;
//         }

//         try {
//             const response = await usernamerecoveryApi({ email: emailAddress });
//             if (response.success) {
//                 setShowConfirmationCodeInput(true);
//                 Alert.alert('Success', 'OTP sent successfully.');
//             } else {
//                 Alert.alert('Error', response.message || 'Failed to send OTP. Please try again.');
//             }
//         } catch (error: any) {
//             Alert.alert('Error', error.message || 'An error occurred');
//         }
//     };

//     const handleResendOtp = async () => {
//         try {
//             const response = await resendOtpApi({ email: emailAddress });
//             if (response.success) {
//                 Alert.alert('Success', 'OTP resent successfully.');
//             } else {
//                 Alert.alert('Error', response.message || 'Failed to resend OTP. Please try again.');
//             }
//         } catch (error: any) {
//             Alert.alert('Error', error.message || 'An error occurred');
//         }
//     };

//     const handleSubmitOtp = async () => {
//         if (!otpCode) {
//             Alert.alert('Validation Error', 'Please enter the OTP code.');
//             return;
//         }

//         if (otpCode.length !== 6 || isNaN(Number(otpCode))) {
//             Alert.alert('Validation Error', 'Please enter a valid 6-digit OTP code.');
//             return;
//         }

//         try {
//             const response = await verifyRecoveryOtpApi({ email: emailAddress, otp: otpCode });
//             if (response.success) {
//                 Alert.alert('Success', 'OTP verified successfully.');
//                 setShowConfirmationCodeInput(false);
//                 setShowSuccessModal(true);
//                 setUsername(response.username);
//             } else {
//                 Alert.alert('Error', response.message || 'Failed to verify OTP. Please try again.');
//             }
//         } catch (error: any) {
//             Alert.alert('Error', error.message || 'An error occurred');
//         }
//     };

//     const handleLoginPage = () => {
//         navigation.navigate('Login' as never);
//     };

//     const handleForgotPassword = () => {
//         navigation.navigate('PasswordRecovery' as never);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={{ flexDirection: 'row', width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', columnGap: 20 }}>
//                 <Image source={require('../../../assets/images/Image1.png')} />
//                 <Text style={{ fontSize: 20, fontWeight: '500' }}>Lorem</Text>
//             </View>
//             <View style={styles.subcontainer}>
//                 <View style={{ width: '90%', height: '12%', backgroundColor: 'black', justifyContent: 'center', paddingLeft: '5%' }}>
//                     <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>Username Recovery</Text>
//                 </View>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Your Email"
//                     placeholderTextColor="#000"
//                     value={emailAddress}
//                     onChangeText={setEmailAddress}
//                 />
//                 <TouchableOpacity style={styles.buttonContainer} onPress={handleNextStep}>
//                     <Text style={styles.buttonText}>Next Step</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleLoginPage}>
//                     <Text style={{ fontSize: 15, fontWeight: '500' }}>Login Page</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleForgotPassword}>
//                     <Text style={{ fontSize: 15, fontWeight: '500' }}>Forgot Password?</Text>
//                 </TouchableOpacity>
//             </View>

//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={showConfirmationCodeInput}
//                 onRequestClose={() => setShowConfirmationCodeInput(false)}
//             >
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalTitle}>Confirm Your Account</Text>
//                         <Text style={styles.modalSubtitle}>We sent a code to your email. Enter that code to confirm your account.</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter Code"
//                             placeholderTextColor="#000"
//                             keyboardType="number-pad"
//                             maxLength={6}
//                             value={otpCode}
//                             onChangeText={setOtpCode}
//                         />
//                         <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmitOtp}>
//                             <Text style={styles.buttonText}>Submit</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={handleResendOtp}>
//                             <Text style={styles.resendText}>Resend Code</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>

//             <Modal visible={showSuccessModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <Text style={styles.modalTitle}>Verification Successful</Text>
//                     <Text style={styles.modalSubtitle}>Your username is {username}</Text>
//                     <Pressable style={styles.buttonClose} onPress={() => setShowSuccessModal(false)}>
//                         <Text style={styles.closeModalText}>Close</Text>
//                     </Pressable>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#A487E7',
//         justifyContent: 'flex-end',
//     },
//     subcontainer: {
//         height: '80%',
//         backgroundColor: 'white',
//         alignItems: 'center',
//         paddingTop: '20%',
//         borderTopLeftRadius: 15,
//         borderTopRightRadius: 15,
//         rowGap: 30,
//     },
//     input: {
//         height: 50,
//         width: '90%',
//         borderWidth: 1,
//         paddingHorizontal: 10,
//         fontSize: 16,
//         borderRadius: 10,
//     },
//     buttonContainer: {
//         backgroundColor: 'black',
//         borderColor: 'black',
//         borderWidth: 1,
//         overflow: 'hidden',
//         width: '60%',
//         height: 50,
//         borderRadius: 4,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonText: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: 'white',
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     modalTitle: {
//         marginBottom: 15,
//         textAlign: "center",
//         fontSize: 20,
//         fontWeight: '500',
//     },
//     modalSubtitle: {
//         marginBottom: 15,
//         textAlign: "center",
//         fontSize: 16,
//         color: '#666',
//     },
//     resendText: {
//         fontSize: 15,
//         fontWeight: '500',
//         color: '#000',
//         marginTop: 10,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: 20,
//     },
//     buttonClose: {
//         backgroundColor: 'black',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 20,
//     },
//     closeModalText: {
//         color: 'white',
//         fontWeight: 'bold',
//     }
// });



import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Modal, Alert, Image, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usernamerecoveryApi, verifyRecoveryOtpApi, resendOtpApi } from "@/app/api-request/username";

export default function UsernameRecovery() {
    const [showConfirmationCodeInput, setShowConfirmationCodeInput] = useState(false);
    const [emailAddress, setEmailAddress] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const handleNextStep = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            Alert.alert('Error', 'Invalid email format');
            return;
        }

        try {
            const response = await usernamerecoveryApi({ email: emailAddress });
            if (response.success) {
                setShowConfirmationCodeInput(true);
                Alert.alert('Success', 'OTP sent successfully.');
            } else {
                Alert.alert('Error', response.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'An error occurred');
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await resendOtpApi({ email: emailAddress });
            if (response.success) {
                Alert.alert('Success', 'OTP resent successfully.');
            } else {
                Alert.alert('Error', response.message || 'Failed to resend OTP. Please try again.');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'An error occurred');
        }
    };

    const handleSubmitOtp = async () => {
        if (!otpCode) {
            Alert.alert('Validation Error', 'Please enter the OTP code.');
            return;
        }

        if (otpCode.length !== 6 || isNaN(Number(otpCode))) {
            Alert.alert('Validation Error', 'Please enter a valid 6-digit OTP code.');
            return;
        }

        try {
            const response = await verifyRecoveryOtpApi({ email: emailAddress, otp: otpCode });
            if (response.success) {
                Alert.alert('Success', 'OTP verified successfully.');
                setShowConfirmationCodeInput(false);
                setShowSuccessModal(true);
                setUsername(response.username);
            } else {
                Alert.alert('Error', response.message || 'Failed to verify OTP. Please try again.');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'An error occurred');
        }
    };

    const handleLoginPage = () => {
        navigation.navigate('Login' as never);
    };

    const handleForgotPassword = () => {
        navigation.navigate('PasswordRecovery' as never);
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', columnGap: 20 }}>
                <Image source={require('../../../assets/images/Image1.png')} />
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Lorem</Text>
            </View>
            <View style={styles.subcontainer}>
                <View style={{ width: '90%', height: '12%', backgroundColor: 'black', justifyContent: 'center', paddingLeft: '5%' }}>
                    <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>Username Recovery</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                    placeholderTextColor="#000"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={handleNextStep}>
                    <Text style={styles.buttonText}>Next Step</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginPage}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Login Page</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showConfirmationCodeInput}
                onRequestClose={() => setShowConfirmationCodeInput(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Confirm Your Account</Text>
                        <Text style={styles.modalSubtitle}>We sent a code to your email. Enter that code to confirm your account.</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Code"
                            placeholderTextColor="#000"
                            keyboardType="number-pad"
                            maxLength={6}
                            value={otpCode}
                            onChangeText={setOtpCode}
                        />
                        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmitOtp}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleResendOtp}>
                            <Text style={styles.resendText}>Resend Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showSuccessModal} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Verification Successful</Text>
                    <Text style={styles.modalSubtitle}>Your username is {username}</Text>
                    <Pressable style={styles.buttonClose} onPress={() => setShowSuccessModal(false)}>
                        <Text style={styles.closeModalText}>Close</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A487E7',
        justifyContent: 'flex-end',
    },
    subcontainer: {
        height: '80%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: '20%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        rowGap: 30,
    },
    input: {
        height: 50,
        width: '90%',
        borderWidth: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        width: '60%',
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: '500',
    },
    modalSubtitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        color: '#666',
    },
    resendText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    buttonClose: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    closeModalText: {
        color: 'white',
        fontWeight: 'bold',
    }
});
