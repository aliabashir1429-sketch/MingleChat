import React, {useEffect, useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,SafeAreaView,Image,Alert,ScrollView,} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('profileName');
      const savedEmail = await AsyncStorage.getItem('profileEmail');
      const savedAbout = await AsyncStorage.getItem('profileAbout');
      const savedImage = await AsyncStorage.getItem('profileImage');

      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedAbout) setAbout(savedAbout);
      if (savedImage) setProfileImage(savedImage);
    } catch (error) {
      console.log(error);
    }
  };

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;

      if (uri) {
        setProfileImage(uri);
      }
    }
  };

  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter your name.');
      return;
    }

    try {
      await AsyncStorage.setItem('profileName', name);
      await AsyncStorage.setItem('profileEmail', email);
      await AsyncStorage.setItem('profileAbout', about);

      if (profileImage) {
        await AsyncStorage.setItem('profileImage', profileImage);
      }

      Alert.alert(
        'Profile Updated',
        'Your profile has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Unable to save profile.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Edit Profile
        </Text>
      <View style={{width: 45}} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
      <View style={styles.imageSection}>
        {profileImage ? (
      <Image
        source={{uri: profileImage}}
        style={styles.profileImage}
        />
        ) : (
      <View style={styles.profileImage}>
        <Text style={styles.profileEmoji}>👤</Text>
      </View>
      )}
      <TouchableOpacity
        style={styles.changePictureButton}
        onPress={selectImage}>
        <Text style={styles.changePictureText}>
            📷 Change Picture
        </Text>
      </TouchableOpacity>
      </View>
        <Text style={styles.label}>Name</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}/>
        <Text style={styles.label}>Email</Text>
      <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}/>
        <Text style={styles.label}>About</Text>
        <TextInput
          style={[styles.input, styles.aboutInput]}
          placeholder="Write something about yourself..."
          placeholderTextColor="#999"
          multiline
          value={about}
          onChangeText={setAbout}/>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveProfile}>
          <Text style={styles.saveButtonText}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#AB47BC',
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 35,
    marginTop: -5,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  imageSection: {
    alignItems: 'center',
    marginBottom: 25,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 28,
    backgroundColor: '#E4E2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  profileEmoji: {
    fontSize: 60,
  },

  changePictureButton: {
    marginTop: 12,
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#E4E2FF',
  },

  changePictureText: {
    color: '#AB47BC',
    fontSize: 14,
    fontWeight: '700',
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
    marginTop: 8,
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222222',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 12,
  },

  aboutInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },

  saveButton: {
    height: 54,
    backgroundColor: '#AB47BC',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default EditProfileScreen;