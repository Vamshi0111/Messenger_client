import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Alert, Clipboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
interface Message {
  chat_id: number;
  text: string;
  sender: string;
  is_deleted: boolean;
  deletedAt?: Date;
  timestamp?: Date | string; // Allow string type for initial parsing
  reactions?: string;
}

const socket = io('http://192.168.0.156:2000'); // Replace with your server URL

const EditRoomChat= () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState<boolean>(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editMessageText, setEditMessageText] = useState<string>('');
  const [isAttachmentOptionsVisible, setIsAttachmentOptionsVisible] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState<boolean>(false);
 

  const currentUser = { id: 1, name: 'Lorem Ipsum' }; // Replace with actual current user ID and name

  useEffect(() => {
    // Socket.IO event listeners
    socket.on('receiveMessage', (newMessage: Message) => {
      // Parse timestamp string to Date object
      newMessage.timestamp = new Date(newMessage.timestamp as string);
      setMessages(prevMessages => {
        // Prevent duplicate messages
        if (prevMessages.find(message => message.chat_id === newMessage.chat_id)) {
          return prevMessages;
        }
        return [newMessage, ...prevMessages];
      });
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = async () => {
    if (messageText.trim() === '') return;

    const newMessage: Message = {
      chat_id: Math.random(), // Replace with appropriate ID generation
      text: messageText,
      sender: currentUser.name,
      is_deleted: false,
      timestamp: new Date(),
    };

    // Send message to server via Socket.IO with acknowledgement
    socket.emit('sendMessage', newMessage, (ack: string) => {
      console.log(ack); // Logs 'Message received and rendering in progress.'
    });

    try {
      // Send message to backend via Axios
      await axios.post(`${origin}/api/v1/chat/sendMessage`, newMessage, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error (e.g., show error message to user)
      return;
    }

    // Update local state with the sent message
    setMessages([newMessage, ...messages]);
    setMessageText('');
  };

  const handleLongPress = (message: Message) => {
    setSelectedMessage(message);
    setIsOptionsVisible(true);
  };

  const deleteMessage = () => {
    if (selectedMessage) {
      setMessages(messages.filter(message => message.chat_id !== selectedMessage.chat_id));
      setIsOptionsVisible(false);
    }
  };

  const copyMessage = () => {
    if (selectedMessage) {
      Clipboard.setString(selectedMessage.text);
      Alert.alert('Message copied to clipboard');
      setIsOptionsVisible(false);
    }
  };

  const editMessage = () => {
    if (selectedMessage) {
      setEditMessageText(selectedMessage.text);
      setIsEditModalVisible(true);
      setIsOptionsVisible(false);
    }
  };

  const saveEditedMessage = () => {
    if (selectedMessage) {
      const updatedMessages = messages.map(message =>
        message.chat_id === selectedMessage.chat_id ? { ...message, text: editMessageText } : message
      );
      setMessages(updatedMessages);
      setIsEditModalVisible(false);
    }
  };

  const forwardMessage = () => {
    if (selectedMessage) {
      // Implement forward action here
      Alert.alert('Forward message', `Forwarding message: ${selectedMessage.text}`);
      setIsOptionsVisible(false);
    }
  };

  const replyMessage = () => {
    if (selectedMessage) {
      // Implement reply action here
      Alert.alert('Reply to message', `Replying to message: ${selectedMessage.text}`);
      setIsOptionsVisible(false);
    }
  };

  const unsendMessage = () => {
    if (selectedMessage) {
      setMessages(messages.filter(message => message.chat_id !== selectedMessage.chat_id));
      setIsOptionsVisible(false);
    }
  };

  const addReaction = (emoji: string) => {
    if (selectedMessage) {
      const updatedMessages = messages.map(message =>
        message.chat_id === selectedMessage.chat_id ? { ...message, reactions: emoji } : message
      );
      setMessages(updatedMessages);
      setIsOptionsVisible(false);
    }
  };

  const handleback = () =>{
    navigation.navigate('EditRoomChat' as never);
  }
  


  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity onLongPress={() => handleLongPress(item)}>
      <View style={[styles.messageBubble, item.sender === currentUser.name ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={[styles.messageText, item.sender === currentUser.name ? styles.sentMessageText : styles.receivedMessageText]}>
          {item.text}
        </Text>
        {item.reactions && <Text style={styles.reactionText}>{item.reactions}</Text>}
        <View style={styles.ticksContainer}>
          <Text style={styles.timeText}>{new Date(item.timestamp as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          {item.sender === currentUser.name && (
            <Ionicons name="checkmark-done" size={16} color="white" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleAttachmentPress = (option: string) => {
    Alert.alert('Attachment option selected', option);
    setIsAttachmentOptionsVisible(false);
  };

  const handleMenuOptionPress = (option: string) => {
    // Alert.alert(option, `You selected ${option}`);
    setIsOptionsMenuVisible(false);
  };

  const handleonpress = () => {
    navigation.navigate('GroupInfoScreen' as never);
  };



  return (
    <TouchableWithoutFeedback onPress={() => setIsOptionsMenuVisible(false)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => console.log('Back pressed')} style={styles.chevronContainer}>
            <Ionicons name="chevron-back-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('@/assets/images/Profile.png')} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleonpress}>
              <Text style={styles.title}>Room Name</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => console.log('Call pressed')}>
              <Ionicons name="call" size={22} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Video call pressed')}>
              <Ionicons name="videocam" size={22} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsOptionsMenuVisible(true)}>
              <MaterialIcons name="more-vert" size={22} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.chat_id.toString()}
            inverted={true}
            ref={flatListRef}
          />
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.emojiButton} onPress={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}>
              <Entypo name="emoji-happy" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              placeholder="Type a message..."
              style={styles.input}
              multiline
              value={messageText}
              onChangeText={setMessageText}
            />
            <TouchableOpacity onPress={() => setIsAttachmentOptionsVisible(true)}>
              <Ionicons name="attach-outline" size={24} color="black" style={styles.icon3} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Camera pressed')}>
              <Ionicons name="camera" size={24} color="black" style={styles.icon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons name="send" size={24} color="black" style={styles.icon1} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {isEmojiPickerVisible && (
          <EmojiSelector
            category={Categories.symbols}
            onEmojiSelected={emoji => {
              setMessageText(messageText + emoji);
              setIsEmojiPickerVisible(false);
            }}
          />
        )}

        <Modal visible={isOptionsVisible} animationType="slide" transparent>
          <TouchableWithoutFeedback onPress={() => setIsOptionsVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalOption} onPress={copyMessage}>
                <Text style={styles.modalOptionText}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={editMessage}>
                <Text style={styles.modalOptionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={deleteMessage}>
                <Text style={styles.modalOptionText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={forwardMessage}>
                <Text style={styles.modalOptionText}>Forward</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={replyMessage}>
                <Text style={styles.modalOptionText}>Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={unsendMessage}>
                <Text style={styles.modalOptionText}>Unsend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => setIsOptionsVisible(false)}>
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
              <EmojiSelector
                onEmojiSelected={emoji => addReaction(emoji)}
                category={Categories.all}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal visible={isEditModalVisible} animationType="slide">
          <View style={styles.editModalContainer}>
            <TextInput
              style={styles.editModalInput}
              value={editMessageText}
              onChangeText={setEditMessageText}
            />
            <TouchableOpacity onPress={saveEditedMessage}>
              <Text style={styles.saveEditButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
              <Text style={styles.cancelEditButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal visible={isAttachmentOptionsVisible} animationType="slide" transparent>
          <View style={styles.attachmentModalContainer}>
            <TouchableOpacity style={styles.attachmentModalOption} onPress={() => handleAttachmentPress('Document')}>
              <Text style={styles.attachmentModalOptionText}>Document</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentModalOption} onPress={() => handleAttachmentPress('Camera')}>
              <Text style={styles.attachmentModalOptionText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentModalOption} onPress={() => handleAttachmentPress('Gallery')}>
              <Text style={styles.attachmentModalOptionText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentModalOption} onPress={() => handleAttachmentPress('Location')}>
              <Text style={styles.attachmentModalOptionText}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentModalOption} onPress={() => handleAttachmentPress('Contact')}>
              <Text style={styles.attachmentModalOptionText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.attachmentModalOption} onPress={() => setIsAttachmentOptionsVisible(false)}>
              <Text style={styles.attachmentModalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal visible={isOptionsMenuVisible} animationType="slide" transparent>
          <TouchableWithoutFeedback onPress={() => setIsOptionsMenuVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalOption} onPress={() => handleMenuOptionPress('Group Info')}>
                <Text style={styles.modalOptionText}>Group Info</Text>
              </TouchableOpacity>
             
              <TouchableOpacity style={styles.modalOption} onPress={() => handleMenuOptionPress('Search')}>
                <Text style={styles.modalOptionText}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => handleMenuOptionPress('Mute Notifications')}>
                <Text style={styles.modalOptionText}>Mute Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => setIsOptionsMenuVisible(false)}>
                <Text style={styles.modalOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
  },
  header: {
    backgroundColor: '#A487E7',
    height: "10%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    width: '100%',
  },
  chevronContainer: {
    position: 'absolute',
    left: '1%',
    top: 63,
    transform: [{ translateY: -10 }],
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 25,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeText: {
    color: 'black',
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap:9
  },
  icon: {
    marginHorizontal: 5,
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  emojiButton: {
    paddingRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon1: {
    paddingHorizontal: 8,
  },
  icon2: {
    paddingHorizontal: 8,
  },
  icon3: {
    paddingHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: 'black',
  },
  receivedMessageText: {
    color: 'black',
  },
  reactionText: {
    fontSize: 20,
    marginTop: 5,
  },
  ticksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
    marginRight: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '40%',
    top: 69,
    right: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 18,
  },
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editModalInput: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveEditButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  cancelEditButtonText: {
    fontSize: 18,
    color: 'red',
  },
  attachmentModalContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },                                                                                                        
  attachmentModalOption: {
    paddingVertical: 10,
  },
  attachmentModalOptionText: {
    fontSize: 18,
  },
});

export default EditRoomChat;                                                              
