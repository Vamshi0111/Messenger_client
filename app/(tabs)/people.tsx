import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function FriendPage() {
  const [selectedTab, setSelectedTab] = useState('yourFriends');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user_name, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFriendRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://192.168.0.177:5000/api/v1/friendRequest/fetchfriend');
      if (Array.isArray(response.data)) {
        // Filter out requests that are not pending
        const pendingRequests = response.data.filter(request => request.status === 'pending');
        setFriendRequests(pendingRequests);
      } else {
        setError('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      setError('An error occurred while fetching friend requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === 'friendsRequests') {
      fetchFriendRequests();
    }
  }, [selectedTab]);

  const checkUsernameAndSendRequest = async () => {
    try {
      const response = await axios.get('http://192.168.0.177:5000/api/v1/Addfriend/username', {
        params: { user_name }
      });

      if (response.data.data.length > 0) {
        const user_id = response.data.data[0].user_id;
        await sendFriendRequest(user_id);
      } else {
        setMessage('Username does not exist.');
        alert('Username does not exist');
      }
    } catch (error:any) {
      console.error(error);
      setMessage(error.response ? error.response.data.message : 'An error occurred.');
      alert(error.response ? error.response.data.message : 'An error occurred.');
    }
  };

  const sendFriendRequest = async (receiver_id) => {
    try {
      const sender_id = 1;
      const response = await axios.post('http://192.168.0.177:5000/api/v1/Addfriend/send-request', {
        sender_id,
        user_name
      });

      setMessage(response.data.message);
      alert('Friend Request Sent  ✅');
    } catch (error:any) {
      console.error(error);
      setMessage(error.response ? error.response.data.message : 'An error occurred.');
      alert(error.response ? error.response.data.message : 'An error occurred.');
    }
  };

  const deleteFriendRequest = async (requestId) => {
    try {
      const response = await axios.delete(`http://192.168.0.238:3000/api/v1/friendRequest/delete/${requestId}`);
      setMessage(response.data.message);
      alert(response.data.message);

      // Filter out the rejected request from the list
      setFriendRequests(friendRequests.filter(request => request.request_id !== requestId));
    } catch (error:any) {
      console.error('Error rejecting friend request:', error);
      setMessage(error.response ? error.response.data.error : 'An error occurred.');
      alert(error.response ? error.response.data.error : 'An error occurred.');
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'yourFriends':
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ padding: 20 }}>Your friend list is empty.</Text>
          </View>
        );
      case 'friendsRequests':
        return (
          <View style={{ width: 350 }}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <FlatList
                data={friendRequests}
                keyExtractor={(item) => item.request_id ? item.request_id.toString() : Math.random().toString()} // Handle missing IDs
                renderItem={({ item }) => (
                  <View style={styles.requestItem}>
                    <Text style={{ fontSize: 20, paddingLeft: 6 }}> {item.Sender.user_name ? item.Sender.user_name : 'N/A'}</Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <TouchableOpacity style={{ width: 90, height: 30, backgroundColor: "#7B55D3", margin: 10 }}>
                        <Text style={{ color: "white", textAlign: "center", paddingTop: 5 }}>Confirm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={{ width: 90, height: 30, backgroundColor: "#F66161", margin: 10 }}
                        onPress={() => deleteFriendRequest(item.request_id)}
                      >
                        <Text style={{ color: "white", textAlign: "center", paddingTop: 5 }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        );
      case 'blockedPeople':
        return (
          <View style={{ padding: 20 }}>
            <Text style={{ padding: 20 }}>You have not blocked anyone.</Text>
          </View>
        );
      case 'addFriends':
        return null;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, margin: 10, marginTop: 30, borderRadius: 7 }}>
          <TextInput
            placeholder="Search People"
            style={{ height: 35, color: "black", paddingLeft: 25, width: "85%" }}
            value={user_name}
            onChangeText={setUsername}
          />
          <Ionicons name="search" size={20} color="#aaa" style={{ marginRight: 20 }} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={() => { setSelectedTab('yourFriends'); }}>
            <Text style={[styles.text, selectedTab === 'yourFriends' && styles.hovered]}>Your Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedTab('friendsRequests')}>
            <Text style={[styles.text, selectedTab === 'friendsRequests' && styles.hovered]}>Friend Requests</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={() => setSelectedTab('blockedPeople')}>
            <Text style={[styles.text, selectedTab === 'blockedPeople' && styles.hovered]}>Blocked People</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { setSelectedTab('addFriends'); setIsModalVisible(true); }}>
            <Text style={styles.text}>ADD Friends</Text>
          </TouchableOpacity>
        </View>
        <View>
          {renderContent()}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.modalTitle}>Add someone by their user_name</Text>
                <Ionicons name="pencil" size={18} style={{ marginLeft: 10 }} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter exact user name"
                value={user_name}
                onChangeText={setUsername}
              />
              <Text>{message}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.cancelButton}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={checkUsernameAndSendRequest}>
                  <Text style={styles.addButtonModal}>ADD FRIEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "43%",
    margin: 10,
    justifyContent: "center",
  },
  hovered: {
    backgroundColor: '#7B55D3',
    color: 'white',
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    height: 40,
    paddingLeft: 30,
    paddingTop: 10,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  addButtonModal: {
    color: 'purple',
    fontSize: 16,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    color: 'red',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  requestItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  message: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
});
