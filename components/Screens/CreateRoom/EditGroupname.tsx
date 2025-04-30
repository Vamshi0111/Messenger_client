import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Editgroupname = () => {
  const [groupName, setGroupName] = useState('');

  const handleCancel = () => {
    setGroupName('');
  };

  const handleOk = () => {
    // Handle the OK action
    console.log('Group Name:', groupName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter group name</Text>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="The Developers 🌊"
      />
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} />
        <Button title="OK" onPress={handleOk} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Editgroupname;
