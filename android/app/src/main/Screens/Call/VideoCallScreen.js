import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,} from 'react-native';

const VideoCallScreen = ({route, navigation}) => {
  const contact = route?.params?.contact;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>‹</Text>
      </TouchableOpacity>
        <Text style={styles.headerTitle}>Video Call</Text>
      </View>
      <View style={styles.content}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {contact?.name
          ? contact.name.charAt(0).toUpperCase()
          : '?'}
        </Text>
      </View>
        <Text style={styles.name}>
          {contact?.name || 'Unknown Contact'}
        </Text>
        <Text style={styles.number}>
          {contact?.number || 'No number available'}
        </Text>
        <Text style={styles.status}>
          Calling...
        </Text>
      </View>
      <View style={styles.controls}>

        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.icon}>🎤</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.endButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.phone}>☎</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Text style={styles.icon}>📹</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB47BC',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  back: {
    color: '#fff',
    fontSize: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#AB47BC',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  number: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
  },
  status: {
    fontSize: 16,
    color: '#fff',
    marginTop: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 35,
  },
  controlButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    fontSize: 24,
  },
  endButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phone: {
    fontSize: 30,
    color: '#AB47BC',
  },
});