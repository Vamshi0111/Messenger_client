import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GroupInfoScreen = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupDescription, setGroupDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const navigation = useNavigation();

  const handleMenuPress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleExitGroup = () => {
    Alert.alert(
      "Exit Group",
      "Are you sure you want to exit this group?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  const handleDisappearingMessages = () => {
    Alert.alert(
      "Disappearing Messages",
      "Adjust disappearing messages settings.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Turn Off", onPress: () => console.log("Turn Off Pressed") },
        { text: "Turn On", onPress: () => console.log("Turn On Pressed") }
      ],
      { cancelable: false }
    );
  };

  const handleAddDescription = () => {
    setModalVisible(true);
  };

  const handleSaveDescription = () => {
    setGroupDescription(newDescription);
    setModalVisible(false);
  };

  const handleEncryption = () => {
    Alert.alert(
      "Encryption",
      "Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to verify.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ],
      { cancelable: false }
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backarrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={handleMenuPress}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => console.log('Add Members')}>
                <Text style={styles.dropdownText}>Add Members</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => console.log('Change Group Name')}>
                <Text style={styles.dropdownText}>Change Group Name</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('@/assets/images/Profile.png')} style={styles.profileImage} />
        <Text style={styles.groupName}>The Developers 🌊</Text>
        <Text style={styles.groupInfo}>Group · 9 members</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="call" size={24} color="black" />
          <Text style={styles.actionText}>Audio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="videocam" size={24} color="black" />
          <Text style={styles.actionText}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="person-add" size={24} color="black" />
          <Text style={styles.actionText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="search" size={24} color="black" />
          <Text style={styles.actionText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <TouchableOpacity style={styles.detailItem} onPress={handleAddDescription}>
          <Text style={styles.detailText}>{groupDescription || 'Add group description'}</Text>
        </TouchableOpacity>
        <Text style={styles.createdInfo}>Created by Vamshi@gen, 21/05/24</Text>
        <View style={styles.mediaContainer}>
          {/* <Image source={require('@/assets/images/eight.jpeg')} style={styles.mediaImage} /> */}
          {/* <Image source={require('@/assets/images/nine.jpeg')} style={styles.mediaImage} /> */}
          {/* <Image source={require('@/assets/images/ten.jpeg')} style={styles.mediaImage} /> */}
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Text style={styles.settingText}>Notifications</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.settingItem} onPress={handleEncryption}>
          <Ionicons name="lock-closed-outline" size={24} color="black" />
          <Text style={styles.settingText}>Encryption</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleDisappearingMessages}>
          <Ionicons name="timer-outline" size={24} color="black" />
          <Text style={styles.settingText}>Disappearing messages</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.settingItem} onPress={handleExitGroup}>
          <Ionicons name="exit-outline" size={24} color="red" />
          <Text style={styles.ExitText}>Exit Group</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Group Description</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter new description"
              value={newDescription}
              onChangeText={setNewDescription}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Save" onPress={handleSaveDescription} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backarrow: {
    marginTop: 23,
  },
  menuContainer: {
    position: 'relative',
    marginTop: 23,
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    width: '700%',
    shadowOffset: {
      width: 2,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3,
    zIndex: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 14,
    color: 'black',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  groupInfo: {
    fontSize: 16,
    color: 'grey',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    color: 'black',
  
    marginTop: 5,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    columnGap:20
  },
  detailText: {
    color: '#0C6157',
  },
  createdInfo: {
    color: 'grey',
    marginTop: 10,
    marginBottom: 20,
  },
  mediaContainer: {
    flexDirection: 'row',
  },
  mediaImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  settingsContainer: {
    borderTopColor: '#333',
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#333',
    // columnGap:20
  },
  settingText: {
    color: 'black',
    marginLeft: 20,
  },
  exitcontainer: {},
  ExitItem: {},
  ExitText: {
    color: 'red',
    marginLeft: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // backgroundColor:'#A487E7'
  },
});

export default GroupInfoScreen;
