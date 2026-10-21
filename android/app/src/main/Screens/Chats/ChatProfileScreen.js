import React, {useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,ScrollView,Alert,Switch,} from 'react-native';

const ChatProfileScreen = ({route, navigation}) => {
  const contact = route?.params?.contact || {};

  const name = contact?.name || 'Unknown Contact';
  const number = contact?.number || 'No number available';
  const about =
    contact?.about || 'Hey there! I am using Mingle Chat.';
  const [muted, setMuted] = useState(false);
  const initial =
    name.length > 0 ? name.charAt(0).toUpperCase() : '?';
  const openVoiceCall = () => {
    navigation.navigate('VoiceCall', {
      contact: contact,
    });
  };

  const openVideoCall = () => {
    navigation.navigate('VideoCall', {
      contact: contact,
    });
  };

  const openMessage = () => {
    navigation.goBack();
  };

  const searchMessages = () => {
    Alert.alert(
      'Search Messages',
      `Search messages with ${name}`,
    );
  };

  const openMedia = () => {
    Alert.alert(
      'Media, Links & Documents',
      'Photos, videos, links and documents will appear here.',
    );
  };

  const changeWallpaper = () => {
    Alert.alert(
      'Chat Wallpaper',
      'Choose a wallpaper for this chat.',
    );
  };

  const changeTheme = () => {
    Alert.alert(
      'Chat Theme',
      'Choose a theme for this chat.',
    );
  };

  const clearChat = () => {
    Alert.alert(
      'Clear Chat',
      `Are you sure you want to clear the chat with ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Done', 'Chat cleared successfully.');
          },
        },
      ],
    );
  };

  const deleteChat = () => {
    Alert.alert(
      'Delete Chat',
      `Are you sure you want to delete the chat with ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
    );
  };

  const blockContact = () => {
    Alert.alert(
      'Block Contact',
      `Do you want to block ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Blocked',
              `${name} has been blocked.`,
            );
          },
        },
      ],
    );
  };

  const reportContact = () => {
    Alert.alert(
      'Report Contact',
      `Do you want to report ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Reported',
              `${name} has been reported.`,
            );
          },
        },
      ],
    );
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
            Contact Info
          </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
        <View style={styles.avatar}>
          {contact?.image ? (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.avatarText}>
            {initial}
          </Text>
        </View>
        ) : (
          <Text style={styles.avatarText}>
            {initial}
          </Text>)}
        </View>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text style={styles.number}>
            {number}
          </Text>
          <Text style={styles.online}>
            Last Seen 
          </Text>
        </View>

        <View style={styles.actions}>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={openVoiceCall}>
            <Text style={styles.actionIcon}>☎</Text>
            <Text style={styles.actionText}>
              Voice
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={openVideoCall}>
            <Text style={styles.actionIcon}>▣</Text>
            <Text style={styles.actionText}>
              Video
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={openMessage}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>
              Message
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>
            About
          </Text>
          <Text style={styles.about}>
            {about}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>
            Chat
          </Text>
        <TouchableOpacity
          style={styles.option}
          onPress={searchMessages}>
          <Text style={styles.optionIcon}>
            🔍
          </Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Search
          </Text>
          <Text style={styles.optionSub}>
            Search messages in this chat
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={openMedia}>
          <Text style={styles.optionIcon}>
            📁
          </Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Media, Links & Documents
          </Text>
          <Text style={styles.optionSub}>
            Photos, videos, links and documents
          </Text>
        </View>
        </TouchableOpacity>

        <View style={styles.option}>
          <Text style={styles.optionIcon}>
            🔔
          </Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Mute Notifications
          </Text>
          <Text style={styles.optionSub}>
            Turn notifications on or off
          </Text>
        </View>

        <Switch
          value={muted}
          onValueChange={setMuted}
          trackColor={{
          false: '#ccc',
          true: '#AB47BC',}}
          thumbColor="#fff"/>
        </View>

        <TouchableOpacity
          style={styles.option}
          onPress={changeWallpaper}>
          <Text style={styles.optionIcon}>
            🖼
          </Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Chat Wallpaper
          </Text>
          <Text style={styles.optionSub}>
            Change wallpaper for this chat
          </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={changeTheme}>
          <Text style={styles.optionIcon}>
            🎨
          </Text>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            Chat Theme
          </Text>
          <Text style={styles.optionSub}>
            Change theme for this chat
          </Text>
        </View>
        </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>
            Chat Management
          </Text>
        <TouchableOpacity
          style={styles.dangerOption}
          onPress={clearChat}>
          <Text style={styles.dangerIcon}>
            🗑
          </Text>
          <Text style={styles.dangerText}>
            Clear Chat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dangerOption}
          onPress={deleteChat}>
          <Text style={styles.dangerIcon}>
            ❌
          </Text>
          <Text style={styles.dangerText}>
            Delete Chat
          </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>
            Contact Management
          </Text>

        <TouchableOpacity
            style={styles.dangerOption}
            onPress={blockContact}>
          <Text style={styles.dangerIcon}>
            🚫
          </Text>
          <Text style={styles.dangerText}>
            Block Contact
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dangerOption}
          onPress={reportContact}>
          <Text style={styles.dangerIcon}>
            ⚠
          </Text>
          <Text style={styles.dangerText}>
            Report Contact
          </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.bottomSpace} />
      </ScrollView>
      </SafeAreaView>
  );
};

export default ChatProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3F8',
  },
  header: {
    height: 60,
    backgroundColor: '#AB47BC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    width: 40,
    height: 45,
    justifyContent: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profile: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 25,
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 25,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  name: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  number: {
    color: '#555',
    fontSize: 16,
    marginTop: 5,
  },
  online: {
    color: '#AB47BC',
    fontSize: 14,
    marginTop: 7,
    fontWeight: '600',
  },
  actions: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    marginTop: 8,
  },
  actionButton: {
    width: '30%',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 25,
    color: '#AB47BC',
  },
  actionText: {
    color: '#AB47BC',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 7,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  sectionHeading: {
    color: '#AB47BC',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  about: {
    color: '#333',
    fontSize: 16,
    paddingVertical: 5,
  },
  option: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionIcon: {
    fontSize: 23,
    width: 48,
  },
  optionContent: {
    flex: 1,
    marginLeft: 2,
  },
  optionTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  optionSub: {
    color: '#777',
    fontSize: 13,
    marginTop: 3,
  },
  dangerOption: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dangerIcon: {
    fontSize: 22,
    width: 48,
  },
  dangerText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 30,
  },
});