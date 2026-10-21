import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AddContactScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const saveContact = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert(
        'Required',
        'Please enter name and phone number',
      );
      return;
    }

    try {
      const oldContacts = await AsyncStorage.getItem('contacts');

      const contacts = oldContacts
        ? JSON.parse(oldContacts)
        : [];

      const newContact = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phone.trim(),
      };

      contacts.push(newContact);

      await AsyncStorage.setItem(
        'contacts',
        JSON.stringify(contacts),
      );

      navigation.goBack();
    } catch (error) {
      console.log('Save Contact Error:', error);

      Alert.alert(
        'Error',
        'Contact save nahi ho saka',
      );
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
    <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
       <Text style={styles.backIcon}>‹</Text>
    </TouchableOpacity>
    <View>
        <Text style={styles.headerTitle}>
            Add Contact
        </Text>
        <Text style={styles.headerSubtitle}>
            Create a new contact
        </Text>
    </View>
    <View style={styles.headerSpace} />
    </View>
    <View style={styles.contactIconContainer}>
        <Text style={styles.contactIcon}>
          👤
        </Text>
    </View>
      <Text style={styles.mainTitle}>
        Create New Contact
      </Text>
      <Text style={styles.subtitle}>
        Add someone's name and phone number
      </Text>
    <View style={styles.inputSection}>
        <Text style={styles.label}>
          Name
        </Text>
    <View style={styles.inputContainer}>
        <Text style={styles.inputIcon}>
            👤
        </Text>
    <TextInput
        style={styles.input}
        placeholder="Enter contact name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}/>
    </View>
    </View>
    <View style={styles.inputSection}>
        <Text style={styles.label}>
          Phone Number
        </Text>
    <View style={styles.inputContainer}>
      <Text style={styles.inputIcon}>
        📱
      </Text>

    <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"/>
    </View>
    </View>

    <TouchableOpacity
        style={styles.saveButton}
        onPress={saveContact}
        activeOpacity={0.85}>
    <View style={styles.buttonIconContainer}>
        <Text style={styles.buttonIcon}>
            👤
        </Text>
        <Text style={styles.plusIcon}>
            +
        </Text>
    </View>
        <Text style={styles.saveText}>
          Save Contact
        </Text>
    </TouchableOpacity>
    </View>
  );
};

export default AddContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FF',
    paddingHorizontal: 20,
  },
  headerContainer: {
    height: 82,
    backgroundColor: '#AB47BC',
    borderRadius: 20,
    marginTop: 15,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#AB47BC',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
    width: 0,
    height: 4,
    },
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    color: '#fff',
    fontSize: 35,
    marginTop: -4,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },

  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3,
  },

  headerSpace: {
    width: 45,
  },

  contactIconContainer: {
    width: 82,
    height: 82,
    borderRadius: 25,
    backgroundColor: '#E9E7FF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderWidth: 2,
    borderColor: '#DCD9FF',
  },

  contactIcon: {
    fontSize: 38,
  },

  mainTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginTop: 16,
  },

  subtitle: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 30,
  },

  inputSection: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    marginLeft: 3,
  },

  inputContainer: {
    height: 58,
    backgroundColor: '#fff',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E7E5F5',

    elevation: 2,
  },

  inputIcon: {
    fontSize: 21,
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },

  saveButton: {
    height: 58,
    backgroundColor: '#AB47BC',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 5,
    shadowColor: '#AB47BC',
    shadowOpacity: 0.3,
    shadowRadius: 7,
    shadowOffset: {
    width: 0,
    height: 4,
    },
  },

  buttonIconContainer: {
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  buttonIcon: {
    color: '#fff',
    fontSize: 22,
  },

  plusIcon: {
    position: 'absolute',
    right: -2,
    bottom: -3,
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    backgroundColor: '#AB47BC',
  },

  saveText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
