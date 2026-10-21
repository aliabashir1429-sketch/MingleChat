import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,Alert,} from 'react-native';
const MessageOptionScreen = ({navigation, route}) => {
const contact = route?.params?.contact || {
  name: 'Contact',
  number: '',
  };

const handleMessage = () => {
  navigation.navigate('ChatScreen', {
  contact: contact,
  });
  };
  const handleCall = () => {
  navigation.navigate('CallScreen', {
  contact: contact,
  });
};

const handleVideoCall = () => {
  Alert.alert('Video Call', `Video call ${contact.name}?`);
};
return (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
    
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}>
      <Text style={styles.backText}>‹</Text>
    </TouchableOpacity>
      
      <Text style={styles.headerTitle}>Mingle Chat</Text>
    <View style={styles.headerSpace} />
    </View>
    <View style={styles.content}>
    <View style={styles.profileCircle}>
      <Text style={styles.profileLetter}>
        {contact.name ? contact.name.charAt(0).toUpperCase() : 'C'}
      </Text>
      </View>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.number}>
        {contact.number || 'No number available'}
      </Text>
      <Text style={styles.chooseText}>
        Choose an option
      </Text>
    
    <TouchableOpacity
      style={styles.optionButton}
      onPress={handleMessage}>
    <View style={styles.iconBox}>
      <Text style={styles.icon}>💬</Text>
    </View>
    <View style={styles.buttonTextBox}>
      <Text style={styles.optionTitle}>Message</Text>
      <Text style={styles.optionSubtitle}>
        Start a conversation
      </Text>
    </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.optionButton}
      onPress={handleCall}>
    <View style={styles.iconBox}>
      <Text style={styles.icon}>📞</Text>
    </View>
    <View style={styles.buttonTextBox}>
      <Text style={styles.optionTitle}>Call</Text>
      <Text style={styles.optionSubtitle}>
        Make a voice call
      </Text>
    </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.optionButton}
      onPress={handleVideoCall}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>🎥</Text>
      </View>

      <View style={styles.buttonTextBox}>
        <Text style={styles.optionTitle}>Video Call</Text>
        <Text style={styles.optionSubtitle}>
          Start a video call
        </Text>
      </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MessageOptionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FA',
  },
  header: {
    height: 65,
    backgroundColor: '#AB47BC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 32,
    color: '#AB47BC',
    marginTop: -4,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSpace: {
    width: 42,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  profileLetter: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 3,
  },
  number: {
    fontSize: 15,
    color: '#555555',
    marginTop: 5,
  },
  chooseText: {
    alignSelf: 'flex-start',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 35,
    marginBottom: 12,
  },
  optionButton: {
    width: '100%',
    minHeight: 78,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F3DDF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  buttonTextBox: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
  },
  arrow: {
    fontSize: 30,
    color: '#AB47BC',
    marginLeft: 8,
  },
});

