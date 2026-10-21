import React, {useEffect, useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,Image,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const loadProfile = async () => {
    try {
      const savedName = await AsyncStorage.getItem('profileName');
      const savedEmail = await AsyncStorage.getItem('profileEmail');
      const savedAbout = await AsyncStorage.getItem('profileAbout');
      const savedImage = await AsyncStorage.getItem('profileImage');

      if (savedName) {
        setName(savedName);
      }

      if (savedEmail) {
        setEmail(savedEmail);
      }

      if (savedAbout) {
        setAbout(savedAbout);
      }

      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.log('Profile loading error:', error);
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
        <Text style={styles.headerTitle}>My Profile</Text>
      <View style={{width: 45}} />
      </View>
      <View style={styles.profileSection}>
        {profileImage ? (
          <Image
            source={{uri: profileImage}}
            style={styles.profileImage}/>
        ) : (
        <View style={styles.profileImage}>
          <Text style={styles.profileEmoji}>👤</Text>
        </View>
        )}
        <Text style={styles.name}>
          {name || 'Your Name'}
        </Text>
        <Text style={styles.email}>
          {email || 'your@email.com'}
        </Text>
      </View>
      <View style={styles.infoContainer}>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>
          {name || 'Not added'}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>
          {email || 'Not added'}
        </Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>About</Text>
        <Text style={styles.value}>
          {about || 'Hey! I am using Mingle Chat.'}
        </Text>
      </View>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editButtonText}>
          ✏️ Edit Profile
        </Text>
      </TouchableOpacity>
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

  profileSection: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 25,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 25,
    backgroundColor: '#E4E2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },

  profileEmoji: {
    fontSize: 55,
    
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#AB47BC',
    marginTop: 15,
  },

  email: {
    fontSize: 14,
    color: '#777777',
    marginTop: 5,
  },

  infoContainer: {
    paddingHorizontal: 20,
  },

  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  label: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '600',
  },

  editButton: {
    marginHorizontal: 20,
    marginTop: 10,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default ProfileScreen;
