import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, Alert, Clipboard } from 'react-native';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

interface Message {
  id: string;
  text: string;
  sender: string;
  time: string;
  reactions?: string;
}

const PersonalChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState<boolean>(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editMessageText, setEditMessageText] = useState<string>('');
  const [isAttachmentOptionsVisible, setIsAttachmentOptionsVisible] = useState<boolean>(false);

  const sendMessage = () => {
    if (messageText.trim() === '') return;
    const newMessage: Message = {
      id: Math.random().toString(),
      text: messageText,
      sender: 'Lorem Ipsum',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([newMessage, ...messages]);
    setMessageText('');
  };

  const handleLongPress = (message: Message) => {
    setSelectedMessage(message);
    setIsOptionsVisible(true);
  };

  const deleteMessage = () => {
    if (selectedMessage) {
      setMessages(messages.filter(message => message.id !== selectedMessage.id));
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
        message.id === selectedMessage.id ? { ...message, text: editMessageText } : message
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
      setMessages(messages.filter(message => message.id !== selectedMessage.id));
      setIsOptionsVisible(false);
    }
  };

  const addReaction = (emoji: string) => {
    if (selectedMessage) {
      const updatedMessages = messages.map(message =>
        message.id === selectedMessage.id ? { ...message, reactions: emoji } : message
      );
      setMessages(updatedMessages);
      setIsOptionsVisible(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity onLongPress={() => handleLongPress(item)}>
      <View style={[styles.messageBubble, item.sender === 'Lorem Ipsum' ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={[styles.messageText, item.sender === 'Lorem Ipsum' ? styles.sentMessageText : styles.receivedMessageText]}>
          {item.text}
        </Text>
        {item.reactions && <Text style={styles.reactionText}>{item.reactions}</Text>}
        {item.sender === 'Lorem Ipsum' && (
          <View style={styles.ticksContainer}>
            <Text style={styles.timeText}>{item.time}</Text>
            <Ionicons name="checkmark-done" size={16} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleAttachmentPress = (option: string) => {
    Alert.alert('Attachment option selected', option);
    setIsAttachmentOptionsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')} style={styles.chevronContainer}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/images/Profile.png')} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <TouchableOpacity>
            <Text style={styles.title}>Lorem Ipsum</Text>
            {isActive && <Text style={styles.activeText}>Active</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => console.log('Call pressed')}>
            <Ionicons name="call" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Video call pressed')}>
            <Ionicons name="videocam" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('More options pressed')}>
            <MaterialIcons name="more-vert" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.messageContainer}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          inverted={true}
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
            <Ionicons name="camera" size={24} color="black" style={styles.icon3} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Mic pressed')}>
            <Ionicons name="mic" size={24} color="black" style={styles.icon3} />
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="black" style={styles.icon3} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={isEmojiPickerVisible} animationType="slide">
        <EmojiSelector
          category={Categories.all}
          onEmojiSelected={emoji => {
            setMessageText(messageText + emoji);
            setIsEmojiPickerVisible(false);
          }}
        />
      </Modal>

      <Modal
        visible={isOptionsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsOptionsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity onPress={deleteMessage} style={styles.option}>
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={copyMessage} style={styles.option}>
              <Text style={styles.optionText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEmojiPickerVisible(true)} style={styles.option}>
              <Text style={styles.optionText}>Reactions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={editMessage} style={styles.option}>
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={forwardMessage} style={styles.option}>
              <Text style={styles.optionText}>Forward</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={replyMessage} style={styles.option}>
              <Text style={styles.optionText}>Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={unsendMessage} style={styles.option}>
              <Text style={styles.optionText}>Unsend</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsOptionsVisible(false)} style={styles.option}>
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isEditModalVisible} animationType="slide">
        <View style={styles.editModalContainer}>
          <TextInput
            style={styles.editInput}
            value={editMessageText}
            onChangeText={setEditMessageText}
            multiline
          />
          <TouchableOpacity onPress={saveEditedMessage}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={isAttachmentOptionsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsAttachmentOptionsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.attachmentOptionsContainer}>
            <TouchableOpacity onPress={() => handleAttachmentPress('Document')} style={styles.attachmentOption}>
              <Ionicons name="document" size={24} color="black" />
              <Text style={styles.attachmentOptionText}>Document</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAttachmentPress('Image')} style={styles.attachmentOption}>
              <Ionicons name="image" size={24} color="black" />
              <Text style={styles.attachmentOptionText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAttachmentPress('Location')} style={styles.attachmentOption}>
              <Ionicons name="location" size={24} color="black" />
              <Text style={styles.attachmentOptionText}>Location</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAttachmentPress('Contact')} style={styles.attachmentOption}>
              <Ionicons name="person" size={24} color="black" />
              <Text style={styles.attachmentOptionText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#A487E7",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chevronContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeText: {
    fontSize: 14,
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: 5,
    margin:10,
  },
  messageContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#A487E7',
  },
  emojiButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  icon3: {
    marginLeft: 10,
  },
  messageBubble: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#A487E7',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
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
  ticksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    fontSize: 12,
    color: 'black',
    marginRight: 5,
  },
  reactionText: {
    fontSize: 16,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
  },
  attachmentOptionsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attachmentOption: {
    alignItems: 'center',
  },
  attachmentOptionText: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default PersonalChat;
