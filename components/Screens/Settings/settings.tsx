import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const navigation = useNavigation();

  const handleHelp = () => {
    navigation.navigate('Help' as never);
  };

  const handleaccountprivacy = () =>{
    navigation.navigate('Accountsprivacy' as never)
  }

  const handleInvitefriends = () =>{
    navigation.navigate('Invitefriends' as never)
  }

  const handlepermissions = () =>{
    navigation.navigate('Permissions' as never)
  }

  const handleLanguages = () =>{
    navigation.navigate('Languages' as never)
  }

  const handleaccountstatus = () =>{
    navigation.navigate('Accountstatus' as never)
  }

  const handleabout = () =>{
    navigation.navigate('About' as never)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings and activity</Text>

      <View style={styles.section}>
        
        <TouchableOpacity style={styles.option}>
          <Icon name="time-outline" size={20} color="#000" />
          <Text style={styles.optionText}>Time spent</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Who can see your content</Text>
        <TouchableOpacity style={styles.option}>
          <Icon name="lock-closed-outline" size={20} color="#000" />
          <TouchableOpacity onPress={handleaccountprivacy}><Text style={styles.optionText}>Account privacy</Text></TouchableOpacity>
          <Text style={styles.optionDetail}>Private</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Icon name="ban-outline" size={20} />
          <Text style={styles.optionText}>Blocked</Text>
          <Text style={styles.optionDetail}>11</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="person-add-outline" size={20} />
          <TouchableOpacity onPress={handleInvitefriends}><Text style={styles.optionText}>Follow and Invite friends</Text></TouchableOpacity>
          <Icon name="caret-forward-outline" size={20} style={styles.optionDetail} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>How others can interact with you</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Your app and media</Text>
        <TouchableOpacity style={styles.option}>
          <Icon name="phone-portrait-outline" size={20} />
          <TouchableOpacity onPress={handlepermissions}><Text style={styles.optionText}>Device Permission</Text></TouchableOpacity>
          <Icon name="caret-forward-outline" size={20} style={styles.optionDetail} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="language-outline" size={20} />
          <TouchableOpacity onPress={handleLanguages}><Text style={styles.optionText}>Language</Text></TouchableOpacity>
          <Icon name="caret-forward-outline" size={20} style={styles.optionDetail} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>More info and support</Text>
        <TouchableOpacity style={styles.option} onPress={handleHelp}>
          <Icon name="information-circle-outline" size={20} />
          <Text style={styles.optionText}>Help</Text>
          <Icon name="caret-forward-outline" size={20} style={styles.optionDetail} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="person-outline" size={20} />
          <TouchableOpacity onPress={handleaccountstatus}><Text style={styles.optionText}>Account status</Text></TouchableOpacity>
          <Icon name="caret-forward-outline" size={20} style={styles.optionDetail} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="pulse-outline" size={20} />
          <TouchableOpacity onPress={handleabout}><Text style={styles.optionText}>About</Text></TouchableOpacity>
          <Icon name="caret-forward-outline" size={20} style={styles.optionDetail} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    // marginBottom: 32,
    
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
  },
  optionDetail: {
    marginLeft: 'auto',
    color: '#888',
  },
});

export default Setting;
