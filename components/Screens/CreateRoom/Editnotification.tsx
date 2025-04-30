import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity,  Modal, Pressable } from 'react-native';
import { ScrollView } from 'react-native';

const Editnotification = () => {
  const [messageMute, setMessageMute] = useState(false);
  const [callMute, setCallMute] = useState(false);
  const [vibrateModalVisible, setVibrateModalVisible] = useState(false);
  const [muteModalVisible, setMuteModalVisible] = useState(false);
  const [vibrateOption, setVibrateOption] = useState('Default');
  const [muteOption, setMuteOption] = useState('Always');

  const handleAdvancedSettings = () => {
    console.log('Advanced Settings Pressed');
  };

  const handleVibratePress = () => {
    setVibrateModalVisible(true);
  };

  const selectVibrateOption = (option: React.SetStateAction<string>) => {
    setVibrateOption(option);
    setVibrateModalVisible(false);
  };

  const handleMutePress = (value: boolean | ((prevState: boolean) => boolean)) => {
    setMessageMute(value);
    if (value) {
      setTimeout(() => setMuteModalVisible(true), 0);
    }
  };

  const selectMuteOption = (option: React.SetStateAction<string>) => {
    setMuteOption(option);
    setMuteModalVisible(false);
  };

  const cancelMuteOption = () => {
    setMuteModalVisible(false);
    setMessageMute(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Message</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Mute notifications</Text>
          <Switch
            value={messageMute}
            onValueChange={handleMutePress}
          />
        </View>

        <TouchableOpacity style={styles.option} onPress={handleVibratePress}>
          <Text style={styles.optionText}>Vibrate</Text>
          <Text style={styles.optionSubText}>{vibrateOption}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdvancedSettings}>
          <Text style={styles.optionText}>Advanced settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Call</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Mute notifications</Text>
          <Switch
            value={callMute}
            onValueChange={setCallMute}
          />
        </View>
      </View>

      {/* {/ Vibrate Modal /} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={vibrateModalVisible}
        onRequestClose={() => {
          setVibrateModalVisible(!vibrateModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Vibrate</Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => selectVibrateOption('Off')}>
              <Text style={styles.modalOptionText}>Off</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => selectVibrateOption('Default')}>
              <Text style={styles.modalOptionText}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => selectVibrateOption('Short')}>
              <Text style={styles.modalOptionText}>Short</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => selectVibrateOption('Long')}>
              <Text style={styles.modalOptionText}>Long</Text>
            </TouchableOpacity>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVibrateModalVisible(!vibrateModalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* {/ Mute Notifications Modal /} */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={muteModalVisible}
        onRequestClose={() => {
          setMuteModalVisible(!muteModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Mute notifications</Text>
            <Text style={styles.modalDescription}>
              Other members will not see that you muted this chat. You will still be notified if you are mentioned.
            </Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => selectMuteOption('8 hours')}>
              <Text style={styles.modalOptionText}>8 hours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => selectMuteOption('1 week')}>
              <Text style={styles.modalOptionText}>1 week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => selectMuteOption('Always')}>
              <Text style={styles.modalOptionText}>Always</Text>
            </TouchableOpacity>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={cancelMuteOption}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOK]}
                onPress={() => setMuteModalVisible(false)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  optionSubText: {
    fontSize: 14,
    color: 'gray',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
  },
  modalDescription: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '45%',
  },
  buttonCancel: {
    backgroundColor: '#d3d3d3',
  },
  buttonOK: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default Editnotification;
