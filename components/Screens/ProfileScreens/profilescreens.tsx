import React, { useState } from "react";
import { Button, Image,StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const ProfileScreens = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState("Personal");
  const [activeEllipse, setActiveEllipse] = useState<string | null>("Only Friends");
  const [notificationSounds, setNotificationSounds] = useState<boolean>(true);
  const [desktopAlerts, setDesktopAlerts] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<string>('Hidden');
  const [displayAge, setDisplayAge] = useState<string>('Hidden');
  const [gender, setGender] = useState<string>('Hidden');


  const handleEllipsePress = (option: string) => {
    setActiveEllipse(option);
  };

  const getEllipseSize = (option: string) => {
    return activeEllipse === option ? 28 : 24; 
  };

  const toggleNotificationSounds = () => {
    setNotificationSounds(!notificationSounds);
  };

  const handleback = () =>{
    navigation.navigate('Profile' as never)
  }

  const toggleDesktopAlerts = () => {
    setDesktopAlerts(!desktopAlerts);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    alert('Profile saved!');
  };

  const renderContent = () => {
    switch (activeButton) {
      case "Personal":
        return (
            <>
    <View style={styles.containerp}>
      <Text style={styles.headerp}>User Controls</Text>
      <View style={styles.imageUpload}>
        <View style={{borderWidth:1,borderRadius:100,height:200,width:200,borderColor:"#ccc",justifyContent: 'center',alignItems:'center',marginBottom:29}}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <TouchableOpacity onPress={pickImage}><Text style={styles.placeholderss}>Tap to upload Profile Picture</Text></TouchableOpacity>
        )}
        </View>
        <Button title="Upload Image" onPress={pickImage} color={"#7B55D3"} />
      </View>
      <Text style={{fontWeight:"bold",marginBottom:10}}>What's up</Text>
      <View style={{borderWidth:1,borderRadius:5,height:110,borderColor:"#ccc"}}>
      <TextInput
        style={styles.inputp}
        placeholder="Share what you are thinking or doing"
        multiline
        value={status}
        onChangeText={setStatus}
      />
      </View>
      <Picker selectedValue={location} style={styles.picker} onValueChange={setLocation}>
        <Picker.Item label="Location Hidden" value="Hidden" />
        <Picker.Item label="Location Visible" value="Visible" />
      </Picker>
      <Picker selectedValue={displayAge} style={styles.picker} onValueChange={setDisplayAge}>
        <Picker.Item label="Display Age Hidden" value="Hidden" />
        <Picker.Item label="Display Age Visible" value="Visible" />
      </Picker>
      <Picker selectedValue={gender} style={styles.picker} onValueChange={setGender}>
        <Picker.Item label="Gender Hidden" value="Hidden" />
        <Picker.Item label="Gender Visible" value="Visible" />
      </Picker>
      <Button title="Save" onPress={handleSubmit}  color={"#7B55D3"}/>
    </View>
  
          </>
        );
      case "Accounts":
        return (
          
          <>
          <Text style={styles.sectionTitle}>User Controls</Text>
          <View style={styles.horizontalLine} />
          <Text style={styles.subTitle}>Change your password</Text>
          <TextInput style={styles.input} placeholder="Old Password" secureTextEntry />
          <TextInput style={styles.input} placeholder="New Password" secureTextEntry />
          <Text style={styles.subTitle}>Update your email for account security</Text>
          <TextInput style={styles.input} placeholder="lorem.ipsum@gmail.com" keyboardType="email-address" />
          <TouchableOpacity style={styles.button1} activeOpacity={0.1}>
            <Text style={{ color: "white", fontWeight: "bold" }}>VERIFY</Text>
          </TouchableOpacity>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Birth Date</Text>
            <Text style={styles.sectionText}>07 March 2002</Text>
            <Text style={styles.sectionText}>Only you can see your Birth Date information</Text>
            <Text style={styles.sectionText}>Two factor Authentication (2FA)</Text>
            <TouchableOpacity style={styles.button2} activeOpacity={0.1}>
              <Text style={{ color: "white", fontWeight: "bold" }}>SETUP 2FA</Text>
            </TouchableOpacity>
            <View style={styles.text2f}>
              <Text>2FA Protects your account in case your password is stolen/leaked by asking for an OTP code every time you login.</Text>
            </View>
            <Text style={styles.sectionText}>Deactivate or Delete Account</Text>
            <TouchableOpacity style={styles.button3} activeOpacity={0.1}>
              <Text style={{ color: "white", fontWeight: "bold" }}>DELETE ACCOUNT</Text>
            </TouchableOpacity>
          </View>
        </>
        );
      case "Preference":
        return (
          <>
            <View style={styles.preferenceContainer}>
        <Text style={styles.sectionTitle}>Manage your Preference</Text>
        <View style={styles.horizontalLine} />
        
        <Text style={styles.subTitle}>Who can send you private messages</Text>
        <View style={styles.optionContainer}>
          <View style={styles.ellipseOptionevry}>
            <TouchableOpacity
              onPress={() => handleEllipsePress("Everyone")}
            >
              <Ionicons
                name={activeEllipse === "Everyone" ? "radio-button-on-outline" : "ellipse-outline"}
                size={getEllipseSize("Everyone")}
                color="black"
                style={{ width: 28 }} // Adjust icon spacing
              />
            </TouchableOpacity>
            <Text style={styles.optionText1}> Everyone</Text>
          </View>
          <View style={styles.ellipseOption}>
            <TouchableOpacity
              onPress={() => handleEllipsePress("Only Friends")}
            >
              <Ionicons
                name={activeEllipse === "Only Friends" ? "radio-button-on-outline" : "ellipse-outline"}
                size={getEllipseSize("Only Friends")}
                color="black"
                style={{ width: 28 }} // Adjust icon spacing
              />
            </TouchableOpacity>
            <Text style={styles.optionText1}>Only Friends</Text>
          </View>
        </View>

        <Text style={styles.subTitle}>Notification Settings</Text>
        <View style={styles.optionContainer}>
          <View style={styles.toggleOption}>
            <TouchableOpacity
              onPress={toggleNotificationSounds}
            >
              <View style={[styles.toggleSwitch, notificationSounds ? styles.toggleSwitchOn : styles.toggleSwitchOff]}>
                <Animated.View style={[
                  styles.toggleKnob,
                  notificationSounds ? styles.toggleKnobOn : styles.toggleKnobOff
                ]} />
              </View>
            </TouchableOpacity>
            <Text style={styles.optionText2}>Notification Sounds</Text>
          </View>
          <View style={styles.toggleOption}>
            <TouchableOpacity
              onPress={toggleDesktopAlerts}
            >
              <View style={[styles.toggleSwitch, desktopAlerts ? styles.toggleSwitchOn : styles.toggleSwitchOff]}>
                <Animated.View style={[
                  styles.toggleKnob,
                  desktopAlerts ? styles.toggleKnobOn : styles.toggleKnobOff
                ]} />
              </View>
            </TouchableOpacity>
            <Text style={styles.optionText2}>Desktop Alerts</Text>
          </View>
        </View>
      </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.close} activeOpacity={0.1} onPress={handleback}>
            <Ionicons name="close-outline" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.1} onPress={handleback}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => setActiveButton("Personal")}
          activeOpacity={1}
          style={[
            styles.button,
            {
              borderBottomColor: activeButton === "Personal" ? "#FF5733" : "transparent",
            },
          ]}
        >
          <Text style={styles.buttonText}>PERSONAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveButton("Accounts")}
          activeOpacity={1}
          style={[
            styles.button,
            {
              borderBottomColor: activeButton === "Accounts" ? "#FF5733" : "transparent",
            },
          ]}
        >
          <Text style={styles.buttonText}>ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveButton("Preference")}
          activeOpacity={1}
          style={[
            styles.button,
            {
              borderBottomColor: activeButton === "Preference" ? "#FF5733" : "transparent",
            },
          ]}
        >
          <Text style={styles.buttonText}>PREFERENCE</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preferenceContainer: {
    // marginTop: 10,
  },
  sectionTitle: {
    fontWeight: "800",
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  
  optionContainer: {
    marginBottom: 20,
  },
  ellipseOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10.5,
  },ellipseOptionevry: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  toggleOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal:2,
  },
  toggleSwitch: {
    width: 40, // Decreased width
    height: 20, // Decreased height
    borderRadius: 10, // Adjusted border radius
    justifyContent: 'center',
  },
  toggleSwitchOn: {
    backgroundColor: '#A487E7',
  },
  toggleSwitchOff: {
    backgroundColor: '#ccc',
  },
  toggleKnob: {
    width: 18, // Decreased width
    height: 18, // Decreased height
    borderRadius: 9, // Adjusted border radius
    backgroundColor: 'white',
    position: 'absolute',
  },
  toggleKnobOn: {
    right: 1,
  },
  toggleKnobOff: {
    left: 1,
  },
  optionText1: {
    fontSize: 14,
    color: "black",
    marginLeft: 12,
  },
  optionText2: {
    fontSize: 14,
    color: "black",
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6FF',
    marginTop: Constants.statusBarHeight, 
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  close: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: '#8256D0',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6E6FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 15,
    marginTop:0
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '95%',
    padding: 10,
    fontSize: 16,
    color: 'grey',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  button1: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 5,
  },
  button2: {
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 5,
  },
  button3: {
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 5,
  },
  section: {
    margin: 10,
  },
  sectionText: {
    color: 'grey',
    fontWeight: '600',
    padding: 10,
  },
  text2f: {
    margin: 10,
    paddingTop: 10,
  },
  containerp: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerp: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageUpload: {
    alignItems: 'center',
    marginBottom: 16,
    
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // marginBottom: 16,
  },
  placeholderss: {
    fontSize: 19,
    color: '#ccc',
    marginBottom: 16,
    textAlign: 'center',
    justifyContent: 'center',
  },
  
  inputp: {
    // height: 110,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginTop:10,
   
  },
  picker: {
    height: 40,
    marginBottom: 16,
  },
});

export default ProfileScreens;
