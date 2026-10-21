import React, {useEffect, useState} from 'react';
import {StyleSheet,Text,View,TextInput,FlatList,Image,TouchableOpacity,SafeAreaView,Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChatListScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadContacts();
    });
    return unsubscribe;
  }, [navigation]);

  const loadContacts = async () => {
    try {
      const savedContacts = await AsyncStorage.getItem('contacts');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.log('Load Contacts Error:', error);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name
      ?.toLowerCase()
      .includes(search.toLowerCase()),
  );

  const showContactOptions = (contact) => {
    Alert.alert(
      contact.name,
      'What do you want to do?',
      [
        {
          text: 'Message',
          onPress: () => {
            navigation.navigate('Chat', {
              contact: contact,
            });
          },
        },
        {
          text: 'Call',
          onPress: () => {
            navigation.navigate('Call', {
              contact: contact,
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
    <TouchableOpacity
      onPress={() => {
      navigation.navigate('MessageOption', {
      contact: item,
      });
     }}>
    </TouchableOpacity>
    ],
    );
  };

  const renderContact = ({item}) => {
    return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.chatItem}
      onPress={() => showContactOptions(item)}>
      {item.profilePicture ? (
      <Image
        source={{uri: item.profilePicture}}
        style={styles.avatar}/>
        ) : item.image ? (
      <Image
        source={{uri: item.image}}
        style={styles.avatar}/>
        ) : (
        <View style={styles.defaultAvatar}>
          <Text style={styles.defaultAvatarText}>
            {item.name
            ? item.name.charAt(0).toUpperCase()
            : '?'}
          </Text>
        </View>
        )}

        <View style={styles.chatDetails}>
          <Text
            style={styles.chatName}
            numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            style={styles.chatMessage}
            numberOfLines={1}>
            {item.number}
          </Text>
          <Text style={styles.tapText}>
            Tap to chat
          </Text>
        </View>

        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>
          Mingle Chat
        </Text>
      <View style={styles.headerIcons}>
      
      <TouchableOpacity
        style={styles.headerIconButton}>
          <Text style={styles.headerIcon}>
            ⋮
          </Text>
      </TouchableOpacity>
      </View>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>
          🔍
        </Text>

      <TextInput
        placeholder="Search contacts"
        placeholderTextColor="#777777"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}/>
      </View>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.chatTitle}>
          Chats
        </Text>
        <Text style={styles.chatSubtitle}>
          Your saved contacts
        </Text>
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item, index) =>
          item.id
            ? item.id.toString()
            : index.toString()
        }
        renderItem={renderContact}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
      <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>
          💬
        </Text>
      </View>
        <Text style={styles.emptyTitle}>
          {search
          ? 'No Contact Found'
          : 'No Saved Contacts'}
        </Text>
        <Text style={styles.emptyText}>
          {search
          ? 'Try another contact name.'
          : 'Your saved contacts will appear here.'}
        </Text>
      </View>
      }/>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Users')}>
        <Text style={styles.fabIcon}>
          ✎
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => {}}>
      <View style={styles.activeNavIndicator}>
        <Text style={styles.activeNavIcon}>
          💬
        </Text>
      </View>
        <Text style={styles.activeNavText}>
          Chats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Users')}>
        <Text style={styles.navIcon}>
          👥
        </Text>
        <Text style={styles.navText}>
          Contacts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Call')}>
        <Text style={styles.navIcon}>
          📞
        </Text>
        <Text style={styles.navText}>
          Calls
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navIcon}>
          👤
        </Text>
        <Text style={styles.navText}>
          Profile
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Status')}>
        <Text style={styles.navIcon}>
          ◉
        </Text>
        <Text style={styles.navText}>
          Status
        </Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F5FA',
  },
  header: {
    backgroundColor: '#AB47BC',
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 25,
    color: '#AB47BC',
    fontWeight: 'bold',
    marginTop: -5,
  },
  searchBar: {
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
    paddingVertical: 0,
  },
  headingContainer: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 8,
  },
  chatTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
  },
  chatSubtitle: {
    fontSize: 14,
    color: '#777777',
    marginTop: 3,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 13,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.07,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    marginRight: 13,
  },
  defaultAvatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  defaultAvatarText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    color: '#000000',
    fontSize: 17,
    fontWeight: 'bold',
  },
  chatMessage: {
    color: '#777777',
    fontSize: 14,
    marginTop: 4,
  },
  tapText: {
    color: '#AB47BC',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 1,
  },
  arrowContainer: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#F3DDF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    color: '#AB47BC',
    fontSize: 27,
    marginTop: -3,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 30,
  },
  emptyIconContainer: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: '#F3DDF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  emptyIcon: {
    fontSize: 35,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  emptyText: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 78,
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },
  bottomNav: {
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavIndicator: {
    backgroundColor: '#F3DDF6',
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  activeNavIcon: {
    fontSize: 18,
  },
  navIcon: {
    fontSize: 18,                                                                                           
    marginBottom: 2,
  },
  navText: {
    color: '#777777',
    fontSize: 11,
  },
  activeNavText: {
    color: '#AB47BC',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default ChatListScreen;
