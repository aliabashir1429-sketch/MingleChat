import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,} from 'react-native';

const VoiceCallScreen = ({route, navigation}) => {
  const contact = route?.params?.contact;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>‹</Text>
      </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Call</Text>
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
        <View style={styles.bottom}>
        
        <TouchableOpacity
          style={styles.endButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.phone}>☎</Text>
        </TouchableOpacity>
          <Text style={styles.endText}>End Call</Text>
      </View>
    </SafeAreaView>
  );
};

export default VoiceCallScreen;
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
    width: 120,
    height: 120,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 50,
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
  bottom: {
    alignItems: 'center',
    paddingBottom: 35,
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
  endText: {
    color: '#fff',
    marginTop: 8,
  },
});