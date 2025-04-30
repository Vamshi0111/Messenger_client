import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import {createAnRoomApi} from '../app/api-request/RoomsScreen'

const CreateRoomScreen: React.FC = () => {
  const [roomName, setRoomName] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  const handleCreateRoom = async () => {
    if (roomName && roomPassword && userId) {
      try {
        if (!roomName) {Alert.alert('Please Provide Room Name')}

        
        const newRoom = await createAnRoomApi({roomName, roomPassword, userId});
        Alert.alert('Room Created', `Room ID: ${newRoom.room_id}`);
      } catch (error) {
        Alert.alert('Error', 'Failed to create room');
      }
    } else {
      Alert.alert('Validation', 'All fields are required');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Room Name"
        value={roomName}
        onChangeText={setRoomName}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <TextInput
        placeholder="Room Password"
        value={roomPassword}
        onChangeText={setRoomPassword}
        secureTextEntry
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <TextInput
        placeholder="User ID"
        value={userId ? userId.toString() : ''}
        onChangeText={(text) => setUserId(Number(text))}
        keyboardType="numeric"
        style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}
      />
      <Button title="Create Room" onPress={handleCreateRoom} />
    </View>
  );
};

export default CreateRoomScreen;
