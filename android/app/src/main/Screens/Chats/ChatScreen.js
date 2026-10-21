import React, {useEffect, useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,FlatList,SafeAreaView,KeyboardAvoidingView,Platform,Modal,Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PURPLE = '#AB47BC';
const ChatScreen = ({route, navigation}) => {
  const contact = route?.params?.contact || {};
  const contactName =
    contact?.name ||
    route?.params?.contactName ||
    route?.params?.name ||
    'Contact';
  const contactNumber =
    contact?.number ||
    contact?.phone ||
    route?.params?.number ||
    route?.params?.phone ||
    '';
  const contactOnline =
    contact?.online === true ||
    route?.params?.online === true;
  const contactLastSeen =
    contact?.lastSeen ||
    route?.params?.lastSeen ||
    null;
  const chatKey =
    contactNumber !== ''
      ? contactNumber.replace(/\s/g, '')
      : contactName.replace(/\s/g, '_');
  const storageKey = 'chat_' + chatKey;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] =
    useState(null);
  const [showOptions, setShowOptions] =
    useState(false);
  const [editingMessageId, setEditingMessageId] =
    useState(null);
    useEffect(() => {
    loadMessages();
  }, [storageKey]);
  const loadMessages = async () => {
    try {
  const saved = await AsyncStorage.getItem(
    storageKey,
    );
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.log('Messages load error:', error);
    }
  };
    const saveMessages = async (data) => {
    try {
      await AsyncStorage.setItem(
        storageKey,
        JSON.stringify(data),
      );
    } catch (error) {
      console.log('Messages save error:', error);
    }
  };
  const sendMessage = async () => {
  const text = message.trim();
    if (text === '') {
      return;
    }
    if (editingMessageId !== null) {
    const updatedMessages = messages.map(
    item => {
      if (item.id === editingMessageId) {
      return {
        ...item,
      text: text,
      edited: true,
        };
        }

      return item;
      },
      );
      setMessages(updatedMessages);
      await saveMessages(updatedMessages);
      setMessage('');
      setEditingMessageId(null);
      return;
    }
    const newMessage = {
      id: Date.now().toString(),
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      reaction: '',
      edited: false,
    };
    const updatedMessages = [
      ...messages,
      newMessage,
    ];
    setMessages(updatedMessages);
    setMessage('');
    await saveMessages(updatedMessages);
  };
  const openMessageOptions = (item) => {
    setSelectedMessage(item);
    setShowOptions(true);
  };
  const editMessage = () => {
    if (!selectedMessage) {
      return;
    }
    setMessage(selectedMessage.text);
    setEditingMessageId(
      selectedMessage.id,
    );
    setSelectedMessage(null);
    setShowOptions(false);
  };
  const deleteMessage = () => {
    if (!selectedMessage) {
      return;
    }
    Alert.alert(
      'Delete Message',
      'Are you sure you want to delete this message?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
          const updatedMessages =
          messages.filter(
          item =>
          item.id !==
          selectedMessage.id,
          );
          setMessages(updatedMessages);
            await saveMessages(
            updatedMessages,
            );
            setSelectedMessage(null);
            setShowOptions(false);
          },
        },
      ],
    );
  };
  const addReaction = async (
    emoji
  ) => {
    if (!selectedMessage) {
      return;
    }
  const updatedMessages =
      messages.map(item => {
        if (
        item.id ===
        selectedMessage.id
        ) {
        return {
          ...item,
          reaction: emoji,
          };
        }
        return item;
      });
    setMessages(updatedMessages);
    await saveMessages(
      updatedMessages,
    );
    setSelectedMessage(null);
    setShowOptions(false);
  };
  const removeReaction = async () => {
    if (!selectedMessage) {
      return;
    }
  const updatedMessages =
    messages.map(item => {
    if (
    item.id ===
    selectedMessage.id
    ) {
    return {
      ...item,
      reaction: '',
      };
      }
    return item;
      });
    setMessages(updatedMessages);
    await saveMessages(
      updatedMessages,
    );
    setSelectedMessage(null);
    setShowOptions(false);
  };
  const cancelEdit = () => {
    setMessage('');
    setEditingMessageId(null);
  };
  const getLastSeen = () => {
    if (contactOnline) {
      return 'Online';
    }
    if (!contactLastSeen) {
      return 'Last seen recently';
    }
  const date = new Date(
      contactLastSeen,
    );
    return (
      'Last seen ' +
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };
  const openChatProfile = () => {
    navigation.navigate(
      'ChatProfile',
      {
        contact: {
          id: contact?.id,
          name: contactName,
          number: contactNumber,
          phone: contactNumber,
          online: contactOnline,
          lastSeen: contactLastSeen,
        },
        contactId: contact?.id,
        contactName: contactName,
        name: contactName,
        number: contactNumber,
        phone: contactNumber,
        online: contactOnline,
        lastSeen: contactLastSeen,
      },
    );
  };
  const renderMessage = ({
    item,
  }) => {
    return (
    <TouchableOpacity
      activeOpacity={0.85}
      onLongPress={() =>
      openMessageOptions(item)
        }
      style={styles.messageRow}>
    <View style={styles.messageBubble}>
      <Text style={styles.messageText}>
        {item.text}
      </Text>
    <View style={styles.messageBottom}>
        {item.edited === true && (
      <Text style={styles.editedText}>
        edited
      </Text>
      )}
      <Text style={styles.messageTime}>
        {item.time}
      </Text>
      <Text style={styles.tickText}>
        ✓✓
      </Text>
    </View>
      {item.reaction &&
        item.reaction !== '' && (
    <View style={styles.reactionBadge}>
      <Text style={styles.reactionText}>
        {item.reaction}
      </Text>
    </View>
      )}
    </View>
    </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>
      <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
        navigation.goBack()}>
        <Text style={styles.backText}>
          ‹
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contactInfo}
        activeOpacity={0.8}
        onPress={
        openChatProfile}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {String(contactName)
          .charAt(0)
          .toUpperCase()}
        </Text>
      </View>
      <View style={styles.nameArea}>
        <Text style={styles.contactName}
          numberOfLines={1}>
          {contactName}
        </Text>
          {contactNumber !== '' && (
        <Text style={styles.contactNumber}
          numberOfLines={1}>
          {contactNumber}
        </Text>
          )}
        <Text style={styles.status}numberOfLines={1}>
          {getLastSeen()}
        </Text>
      </View>
      </TouchableOpacity>
      </View>
      <View style={styles.chatArea}>
      <FlatList
        data={messages}
        keyExtractor={(item) =>
        item.id
        }
        renderItem={renderMessage}
        showsVerticalScrollIndicator={
        false
        }
        contentContainerStyle={
        messages.length === 0
        ? styles.emptyList
        : styles.messageList
        }
        ListEmptyComponent={
        <View style={styles.emptyArea}>
          <Text style={styles.emptyTitle}>
            Start Chatting
          </Text>
          <Text style={styles.emptyText}>
            Send a message to{' '}
            {contactName}
          </Text>
            {contactNumber !== '' && (
          <Text style={styles.emptyNumber}>
            {contactNumber}
          </Text>
          )}
        </View>
        }/>
        </View>
        {editingMessageId !== null && (
        <View style={styles.editBar}>
          <Text style={styles.editText}>
            Editing message
          </Text>
        <TouchableOpacity onPress={cancelEdit}>
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>
        </View>
        )}
        <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder={
          editingMessageId !== null
          ? 'Edit message...'
          : 'Type a message...'
          }
          placeholderTextColor="#888888"
          value={message}
          onChangeText={setMessage}
          multiline/>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}>
          <Text style={styles.sendText}>
            ➤
          </Text>
        </TouchableOpacity>
        </View>
        <Modal
          visible={showOptions}
          transparent={true}
          animationType="fade"
          onRequestClose={() =>
            setShowOptions(false)
          }>
        <TouchableOpacity
            activeOpacity={1}
            style={styles.modalBackground}
            onPress={() =>
              setShowOptions(false)}>
        <TouchableOpacity
            activeOpacity={1}
            style={styles.optionsBox}
            onPress={() => {}}>
          <Text style={styles.optionsTitle}>
            Message Options
          </Text>
          <Text style={styles.reactionHeading}>
            React
          </Text>
        <View style={styles.reactionsRow}>
        <TouchableOpacity
          style={styles.reactionButton}
          onPress={() =>
          addReaction('❤️')}>
          <Text style={styles.reactionEmoji}>
            ❤️
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reactionButton}
          onPress={() =>
          addReaction('😂')}>
          <Text style={styles.reactionEmoji}>
            😂
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reactionButton}
          onPress={() =>
          addReaction('😍')}>
          <Text style={styles.reactionEmoji}>
            😍
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactionButton}
          onPress={() =>
          addReaction('😢')}>
          <Text style={styles.reactionEmoji}>
            😢
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reactionButton}
          onPress={() =>
          addReaction('😡')}>
          <Text style={styles.reactionEmoji}>
            😡
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reactionButton}
          onPress={() =>
          addReaction('👍')}>
          <Text style={styles.reactionEmoji}>
            👍
          </Text>
        </TouchableOpacity>
        </View>
            {selectedMessage?.reaction &&
            selectedMessage.reaction !==
            '' && (
        <TouchableOpacity style={styles.optionButton}
          onPress={
          removeReaction}>
          <Text style={styles.optionText}>
            Remove Reaction
          </Text>
        </TouchableOpacity>
        )}      
        <TouchableOpacity
          style={styles.optionButton}
          onPress={editMessage}>
          <Text style={styles.optionText}>
            ✏️  Edit Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={deleteMessage}>
          <Text style={[styles.optionText,styles.deleteText,]}>
            🗑  Delete Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() =>
          setShowOptions(false)}>
          <Text style={styles.closeText}>
            Cancel
          </Text>
        </TouchableOpacity>
        </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      </KeyboardAvoidingView>
      </SafeAreaView>
  );
};
export default ChatScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 78,
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backButton: {
    width: 40,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '300',
  },
  contactInfo: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: PURPLE,
    fontSize: 21,
    fontWeight: 'bold',
  },
  nameArea: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  contactNumber: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 2,
  },
  status: {
    color: '#F3E5F5',
    fontSize: 11,
    marginTop: 2,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#FAF5FC',
  },
  messageList: {
    padding: 12,
    paddingBottom: 20,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  messageRow: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  messageBubble: {
    backgroundColor: PURPLE,
    maxWidth: '78%',
    minWidth: 70,
    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: 8,
    borderRadius: 17,
    borderBottomRightRadius: 4,
    position: 'relative',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 21,
  },
  messageBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  messageTime: {
    color: '#F5EAF7',
    fontSize: 10,
  },
  tickText: {
    color: '#FFFFFF',
    fontSize: 11,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  editedText: {
    color: '#F5EAF7',
    fontSize: 9,
    marginRight: 5,
  },
  reactionBadge: {
    position: 'absolute',
    bottom: -14,
    left: 8,
    minWidth: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  reactionText: {
    fontSize: 16,
  },
  emptyArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    color: '#000000',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  emptyText: {
    color: '#555555',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyNumber: {
    color: PURPLE,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
  },
  editBar: {
    backgroundColor: '#F3E5F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  editText: {
    color: PURPLE,
    fontSize: 13,
    fontWeight: '600',
  },
  cancelText: {
    color: '#E53935',
    fontSize: 13,
    fontWeight: 'bold',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 100,
    backgroundColor: '#F2F2F2',
    borderRadius: 23,
    paddingHorizontal: 16,
    paddingVertical: 11,
    color: '#000000',
    fontSize: 15,
    marginRight: 7,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 22,
    marginLeft: 2,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  optionsBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  optionsTitle: {
    color: '#000000',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  reactionHeading: {
    color: '#777777',
    fontSize: 13,
    marginBottom: 8,
  },
  reactionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reactionButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionEmoji: {
    fontSize: 22,
  },
  optionButton: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  optionText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  deleteText: {
    color: '#E53935',
  },
  closeButton: {
    backgroundColor: PURPLE,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 12,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
