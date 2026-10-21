import React, {useCallback, useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,FlatList,SafeAreaView,TextInput,Alert,Linking,Modal,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
const UsersScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] =
  useState(null);
  const [showOptions, setShowOptions] = useState(false);
  useFocusEffect(
  useCallback(() => {
  loadContacts();
  }, []),
  );
const loadContacts = async () => {
  try {
  const savedContacts =
    await AsyncStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
      } else {
      setContacts([]);
      }
    } catch (error) {
    console.log('Load Contacts Error:', error);
    }
  };
const openContactOptions = (contact) => {
  setSelectedContact(contact);
  setShowOptions(true);
  };
const callContact = async () => {
  if (!selectedContact) {
  return;
  }
setShowOptions(false);
const phoneNumber =
  selectedContact.phone ||
  selectedContact.number;
  if (!phoneNumber) {
    Alert.alert(
    'No Phone Number',
    'This contact does not have a phone number.',);
    return;}
    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (error) {
      Alert.alert(
        'Call Error',
        'Unable to open phone dialer.',
      );
    }
  };
const messageContact = () => {
    if (!selectedContact) {
      return;
    }
  setShowOptions(false);
  navigation.navigate('Chat', {
  contactId:
    selectedContact.id ||
    selectedContact.phone ||
    selectedContact.number,
  contactName:
    selectedContact.name || 'Contact',
  phone:
    selectedContact.phone ||
    selectedContact.number,
  online: selectedContact.online || false,
  lastSeen:
    selectedContact.lastSeen || null,
    });
  };
const deleteContact = () => {
    if (!selectedContact) {
    return;
    }

    setShowOptions(false);
  Alert.alert(
    'Delete Contact',
    `Delete ${selectedContact.name} from your contacts?`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
    onPress: async () => {
        try {
    const updatedContacts = contacts.filter(
        item =>
        item.id !== selectedContact.id,
        );
    setContacts(updatedContacts);
      await AsyncStorage.setItem(
        'contacts',
         JSON.stringify(updatedContacts),
        );
    setSelectedContact(null);
      } catch (error) {
        console.log(
        'Delete Contact Error:',
        error,
            );
          }
        },
      },
    ],
  );
  };
const filteredContacts = contacts.filter(
  contact => {
  const name =
  contact.name?.toLowerCase() || '';

  const phone =
  contact.phone?.toLowerCase() ||
  contact.number?.toLowerCase() ||
    '';
  const searchText = search.toLowerCase();
    return (
      name.includes(searchText) ||
      phone.includes(searchText)
      );
    },
  );
const renderContact = ({item}) => {
  const name = item.name || 'Contact';
    return (
    <TouchableOpacity
      style={styles.contactItem}
      activeOpacity={0.8}
      onPress={() => openContactOptions(item)}>
    <View style={styles.avatar}>
      {item.image ? (
    <View style={styles.imagePlaceholder}>
      <Text style={styles.avatarText}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
    ) : (
      <Text style={styles.avatarText}>
        {name.charAt(0).toUpperCase()}
      </Text>
      )}
      {item.online && (
    <View style={styles.onlineDot} />
      )}
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>
        {name}
      </Text>
        {item.online ? (
      <Text style={styles.onlineText}>
        Online
      </Text>
      ) : (
      <Text style={styles.lastSeenText}>
        {item.lastSeen
        ? `last seen ${item.lastSeen}`
          : 'Offline'}
      </Text>
      )}
      <Text style={styles.phoneText}>
        {item.phone || item.number || ''}
      </Text>
    </View>
      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>
          My Contacts
        </Text>
        <Text style={styles.headerSubtitle}>
          {contacts.length}{' '}
            {contacts.length === 1
            ? 'contact'
            : 'contacts'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
        navigation.navigate('AddContact')
        }>
        <Text style={styles.addIcon}>
          +
        </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>
          🔍
        </Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}/>
        {search.length > 0 && (
      <TouchableOpacity
        onPress={() => setSearch('')}>
        <Text style={styles.clearIcon}>
          ✕
        </Text>
      </TouchableOpacity>)}
      </View>
      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) =>
        String(
        item.id ||
        item.phone ||
        item.number ||
        index,
        )}
        renderItem={renderContact}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
        filteredContacts.length === 0
        ? styles.emptyList
        : styles.list}
        ListEmptyComponent={
      <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>
          👥
        </Text>
      </View>
        <Text style={styles.emptyTitle}>
          No Contacts
        </Text>
        <Text style={styles.emptyText}>
          Add a contact to start calling
          or chatting.
        </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() =>
        navigation.navigate('AddContact')}>
        <Text style={styles.emptyButtonText}>
          + Add Contact
        </Text>
      </TouchableOpacity>
      </View>
      }/>
      <Modal
        transparent
        visible={showOptions}
        animationType="slide"
        onRequestClose={() =>
        setShowOptions(false)}>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalBackground}
        onPress={() =>
        setShowOptions(false)}>
      <View style={styles.optionsContainer}>
      <View style={styles.selectedContact}>
      <View style={styles.modalAvatar}>
        <Text style={styles.modalAvatarText}>
          {selectedContact?.name
          ?.charAt(0)
          ?.toUpperCase() || '?'}
        </Text>
        {selectedContact?.online && (
      <View style={styles.modalOnlineDot}/>
        )}
      </View>
      <View style={styles.selectedInfo}>
        <Text style={styles.selectedName}>
          {selectedContact?.name ||
          'Contact'}
        </Text>
          {selectedContact?.online ? (
        <Text style={styles.modalOnline}>
          Online
        </Text>
        ) : (
        <Text style={styles.modalLastSeen}>
          {selectedContact?.lastSeen
          ? `last seen ${selectedContact.lastSeen}`
          : 'Offline'}
        </Text>)}
      </View>
      </View>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={callContact}>
      <View style={styles.optionIconBox}>
        <Text style={styles.optionIcon}>
          📞
        </Text>
      </View>
      <View style={styles.optionInfo}>
        <Text style={styles.optionTitle}>
          Call
        </Text>
        <Text style={styles.optionSubtitle}>
          Call this contact
        </Text>
      </View>
        <Text style={styles.optionArrow}>
          ›
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={messageContact}>
      <View style={styles.optionIconBox}>
        <Text style={styles.optionIcon}>
          💬
        </Text>
      </View>
      <View style={styles.optionInfo}>
        <Text style={styles.optionTitle}>
          Message
        </Text>
        <Text style={styles.optionSubtitle}>
          Open chat
        </Text>
      </View>
        <Text style={styles.optionArrow}>
          ›
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteOption}
        onPress={deleteContact}>
        <Text style={styles.deleteIcon}>
          🗑️
        </Text>
        <Text style={styles.deleteOptionText}>
          Delete Contact
        </Text>
      </TouchableOpacity>
      </View>
      </TouchableOpacity>
      </Modal>
      </SafeAreaView>
  );
};
export default UsersScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FA',
  },
  header: {
    backgroundColor: '#AB47BC',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#F3E5F5',
    fontSize: 13,
    marginTop: 3,
  },
  addButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: '#AB47BC',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '400',
  },
  searchContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 8,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 17,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000000',
    fontSize: 14,
  },
  clearIcon: {
    fontSize: 17,
    color: '#777777',
    padding: 5,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  contactItem: {
    minHeight: 78,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    marginVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 19,
    backgroundColor: '#E1BEE7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#AB47BC',
    fontSize: 22,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#35C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineText: {
    color: '#35A853',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  lastSeenText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 3,
  },
  phoneText: {
    color: '#999999',
    fontSize: 11,
    marginTop: 2,
  },
  arrow: {
    color: '#999999',
    fontSize: 30,
    fontWeight: '300',
    paddingHorizontal: 5,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 35,
    paddingBottom: 70,
  },
  emptyIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: '#E1BEE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    color: '#000000',
    fontSize: 21,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#777777',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
  emptyButton: {
    backgroundColor: '#AB47BC',
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  selectedContact: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalAvatar: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#E1BEE7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modalAvatarText: {
    color: '#AB47BC',
    fontSize: 21,
    fontWeight: 'bold',
  },
  modalOnlineDot: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#35C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selectedInfo: {
    marginLeft: 12,
    flex: 1,
  },
  selectedName: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOnline: {
    color: '#35A853',
    fontSize: 12,
    marginTop: 3,
  },
  modalLastSeen: {
    color: '#777777',
    fontSize: 12,
    marginTop: 3,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionIconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIcon: {
    fontSize: 21,
  },
  optionInfo: {
    flex: 1,
    marginLeft: 13,
  },
  optionTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },
  optionArrow: {
    color: '#999999',
    fontSize: 27,
  },
  deleteOption: {
    height: 50,
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: '#FFF1F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  deleteOptionText: {
    color: '#D32F2F',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
