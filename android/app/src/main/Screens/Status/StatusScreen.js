import React, {useEffect, useState} from 'react';
import {Alert,Dimensions,FlatList,Image,Modal,SafeAreaView,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const STATUS_KEY = 'minglechat_statuses';
const reactions = ['❤️', '😂', '😍', '😢', '😡', '👍'];
const StatusScreen = ({navigation}) => {
  const [statuses, setStatuses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [textStatus, setTextStatus] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showReactionBox, setShowReactionBox] = useState(false);
  useEffect(() => {
    loadStatuses();
  }, []);
  const loadStatuses = async () => {
    try {
  const savedStatuses = await AsyncStorage.getItem(STATUS_KEY);
  if (savedStatuses) {
    setStatuses(JSON.parse(savedStatuses));
    } else {
    const demoStatuses = [
    {
      id: 'demo-1',
      name: 'Sara Ahmed',
      number: '03001234567',
      type: 'text',
      text: 'Having a great day 💜',
      time: Date.now() - 20 * 60 * 1000,
      views: 12,
      },
    {
      id: 'demo-2',
      name: 'Ali Khan',
      number: '03111234567',
      type: 'text',
      text: 'Welcome to MingleChat 👋',
      time: Date.now() - 50 * 60 * 1000,
      views: 7,
      },
      ];
    setStatuses(demoStatuses);
    await AsyncStorage.setItem(
    STATUS_KEY,
    JSON.stringify(demoStatuses),
    );
    }
    } catch (error) {
    console.log('Load status error:', error);
    }
  };
  const saveStatuses = async (newStatuses) => {
    try {
    setStatuses(newStatuses);
    await AsyncStorage.setItem(
      STATUS_KEY,
      JSON.stringify(newStatuses),
      );
    } catch (error) {
    console.log('Save status error:', error);
    }
  };
  const addTextStatus = async () => {
    if (!textStatus.trim()) {
      Alert.alert(
        'Empty Status',
        'Please write something first.',
      );
      return;
    }
  const newStatus = {
      id: Date.now().toString(),
      name: 'My Status',
      number: 'My Number',
      type: 'text',
      text: textStatus.trim(),
      time: Date.now(),
      views: 0,
    };
  const updatedStatuses = [
      newStatus,
      ...statuses,
    ];
    await saveStatuses(updatedStatuses);
    setTextStatus('');
    setShowTextModal(false);
    setShowAddModal(false);

    Alert.alert(
      'Status Added',
      'Your status has been added successfully.',
    );
  };
  const addImageStatus = () => {
    setShowAddModal(false);
    Alert.alert(
      'Image Status',
      'Image picker will be connected here.',
    );
  };
  const addVideoStatus = () => {
    setShowAddModal(false);
    Alert.alert(
      'Video Status',
      'Video picker will be connected here.',
    );
  };
  const deleteStatus = (status) => {
    Alert.alert(
      'Delete Status',
      'Are you sure you want to delete this status?',
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
              const updatedStatuses = statuses.filter(
                item => item.id !== status.id,
              );
              await AsyncStorage.setItem(
                STATUS_KEY,
                JSON.stringify(updatedStatuses),
              );
              setStatuses(updatedStatuses);
              if (
                selectedStatus &&
                selectedStatus.id === status.id
              ) {
                setSelectedStatus(null);
              }
              setShowReactionBox(false);
              Alert.alert(
                'Deleted',
                'Status deleted successfully.',
              );
            } catch (error) {
              console.log(
                'Delete status error:',
                error,
              );
              Alert.alert(
                'Error',
                'Unable to delete status.',
              );
            }
          },
        },
      ],
    );
  };
  const openStatus = async (status) => {
    try {
      const updatedStatuses = statuses.map(item => {
        if (item.id === status.id) {
          return {
            ...item,
            views: (item.views || 0) + 1,
          };
        }
        return item;
      });
      await saveStatuses(updatedStatuses);
      const updatedStatus = updatedStatuses.find(
        item => item.id === status.id,
      );
      setSelectedStatus(
        updatedStatus || status,
      );
    } catch (error) {
      console.log(
        'Open status error:',
        error,
      );
      setSelectedStatus(status);
    }
  };
  const addReaction = async (emoji) => {
    if (!selectedStatus) {
      return;
    }
    try {
      const updatedStatuses = statuses.map(item => {
        if (item.id === selectedStatus.id) {
          return {
            ...item,
            reaction: emoji,
          };
        }
        return item;
      });
      await saveStatuses(updatedStatuses);
      const updatedStatus = updatedStatuses.find(
        item => item.id === selectedStatus.id,
      );
      setSelectedStatus(
        updatedStatus || null,
      );
      setShowReactionBox(false);
    } catch (error) {
      console.log(
        'Reaction error:',
        error,
      );
    }
  };
    const getTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const myStatuses = statuses.filter(
    item => item.name === 'My Status',
  );
  const otherStatuses = statuses.filter(
    item => item.name !== 'My Status',
  );
  const latestMyStatus =
    myStatuses.length > 0
      ? myStatuses[0]
      : null;
  const renderStatus = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.statusRow}
        activeOpacity={0.8}
        onPress={() => openStatus(item)}>
      <View style={styles.statusAvatarContainer}>
      <View style={styles.statusRing}>
        {item.type === 'image' &&
        item.uri ? (
        <Image
          source={{uri: item.uri}}
          style={styles.avatarImage}/>
          ) : (
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>
          {item.name
          .charAt(0)
          .toUpperCase()}
        </Text>
      </View>
        )}
      </View>
        {item.reaction ? (
      <View style={styles.reactionSmall}>
        <Text>
          {item.reaction}
        </Text>
      </View>
        ) : null}
      </View>
      <View style={styles.statusInfo}>
        <Text style={styles.statusName}>
          {item.name}
        </Text>
        <Text style={styles.statusTime}>
          {getTime(item.time)}
        </Text>
      </View>
      </TouchableOpacity>
    );
  };
return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>
          ‹
        </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          MingleChat
        </Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            Alert.alert(
              'Status',
              'MingleChat Status',
            );
          }}>
        <Text style={styles.menuText}>
          ⋮
        </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>
          My Status
        </Text>
      <View style={styles.myStatusCard}>
        <TouchableOpacity
          style={styles.myAvatarWrapper}
          onPress={() => {
          if (latestMyStatus) {
          openStatus(latestMyStatus);
          } else {
          setShowAddModal(true);
          }}}>
        {latestMyStatus?.type === 'image' &&
        latestMyStatus.uri ? (
        <Image
          source={{
          uri: latestMyStatus.uri,
          }}
          style={styles.myAvatar}/>
          ) : (
      <View style={styles.myAvatarPlaceholder}>
        <Text style={styles.myAvatarText}>
          MC
        </Text>
      </View>
      )}

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() =>
          setShowAddModal(true)}>
        <Text style={styles.plusText}>
          +
        </Text>
        </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.myStatusInfo}
          onPress={() => {
          if (latestMyStatus) {
          openStatus(latestMyStatus);
          } else {
          setShowAddModal(true);
          }
          }}>
        <Text style={styles.myStatusName}>
          My Status
        </Text>
        <Text style={styles.myStatusSubtitle}>
          {latestMyStatus
          ? `${latestMyStatus.views} views • ${getTime(
          latestMyStatus.time,
          )}`
          : 'Tap to add status'}
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
          setShowAddModal(true)}>
        <Text style={styles.addButtonText}>
          +
        </Text>
        </TouchableOpacity>
          {latestMyStatus ? (
        <TouchableOpacity
          style={styles.myDeleteButton}
          onPress={() =>
          deleteStatus(
          latestMyStatus,
          )}>
        <Text style={styles.myDeleteText}>
          🗑
        </Text>
        </TouchableOpacity>
          ) : null}
      </View>
        <Text style={styles.sectionTitle}>
          Recent Updates
        </Text>
        {otherStatuses.length === 0 ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>
          ◎
        </Text>
        <Text style={styles.emptyTitle}>
          No Recent Updates
        </Text>
        <Text style={styles.emptyText}>
          When your contacts add
          statuses, they will appear
          here.
        </Text>
      </View>
        ) : (
      <FlatList
        data={otherStatuses}
        renderItem={renderStatus}
        keyExtractor={item =>
        item.id.toString()
        }
        scrollEnabled={false}/>
        )}
      </ScrollView>

      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setShowAddModal(false)
        }>
        <View style={styles.modalBackground}>
        <View style={styles.addModal}>
          <Text style={styles.modalTitle}>
            Add Status
          </Text>
        <TouchableOpacity
          style={styles.modalOption}
          onPress={addImageStatus}>
          <View style={styles.optionIcon}>
            <Text>🖼️</Text>
          </View>
            <Text style={styles.optionText}>
              Photo / Image
            </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalOption}
          onPress={addVideoStatus}>
        <View style={styles.optionIcon}>
          <Text>🎥</Text>
        </View>
          <Text style={styles.optionText}>
            Video
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.modalOption}
          onPress={() => {
          setShowAddModal(false);
          setShowTextModal(true);}}>
        <View style={styles.optionIcon}>
          <Text>✏️</Text>
        </View>
          <Text style={styles.optionText}>
            Text Status
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
          setShowAddModal(false)}>
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>
        </View>
        </View>
      </Modal>

      <Modal
        visible={showTextModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
        setShowTextModal(false)}>
        <View style={styles.textModalBackground}>
        <View style={styles.textStatusBox}>
          <Text style={styles.modalTitle}>
            Create Text Status
          </Text>
          <TextInput
            value={textStatus}
            onChangeText={setTextStatus}
            placeholder="Write your status..."
            placeholderTextColor="#999999"
            multiline
            maxLength={200}
            style={styles.textInput}/>
          <Text style={styles.characterCount}>
            {textStatus.length}/200
          </Text>
        <View style={styles.textButtonRow}>

          <TouchableOpacity
            style={styles.cancelTextButton}
            onPress={() => {
            setTextStatus('');
            setShowTextModal(false);}}>
          <Text style={ styles.cancelTextButtonText}>
            Cancel
          </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.postButton}
            onPress={addTextStatus}>
          <Text style={styles.postButtonText}>
            Post Status
          </Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>
      </Modal>

      <Modal
        visible={selectedStatus !== null}
        animationType="fade"
        onRequestClose={() => {
        setSelectedStatus(null);
        setShowReactionBox(false);}}>
        {selectedStatus && (
      <SafeAreaView style={styles.viewerContainer}>
      <View style={styles.viewerHeader}>

        <TouchableOpacity
          style={styles.viewerBack}
          onPress={() => {
          setSelectedStatus(null);
          setShowReactionBox(false);}}>
          <Text style={styles.viewerBackText}>
            ‹
          </Text>
        </TouchableOpacity>
      <View style={styles.viewerUser}>
      <View style={styles.viewerAvatar}>
        <Text style={styles.viewerAvatarText}>
          {selectedStatus.name
          .charAt(0)
          .toUpperCase()}
        </Text>
      </View>
      <View>
        <Text style={styles.viewerName}>
          {selectedStatus.name}
        </Text>
        <Text style={styles.viewerTime}>
          {getTime(
          selectedStatus.time,)}
        </Text>
      </View>
      </View>
        {selectedStatus.name ===
        'My Status' ? (
      
        <TouchableOpacity
          onPress={() =>
          deleteStatus(
          selectedStatus,)}>
          <Text style={styles.deleteIcon}>
            🗑
          </Text>
        </TouchableOpacity>
          ) : (
          <View style={{width: 30,}}/>
        )}
      </View>

      <View style={styles.progressBackground}>
      <View style={styles.progressFill}/>
      </View>
      <View style={styles.statusViewerContent}>
        {selectedStatus.type ===
        'text' ? (
      <View style={styles.textStatusViewer}>
        <Text style={styles.viewerStatusText}>
          {selectedStatus.text}
        </Text>
      </View>
      ) : selectedStatus.type ===
      'image' &&
      selectedStatus.uri ? (
      <Image source={{
        uri: selectedStatus.uri,
        }}
        style={styles.fullImage}
        resizeMode="contain"/>
      ) : (
      <View style={styles.videoPlaceholder}>
        <Text style={styles.videoIcon}>
          ▶
        </Text>
        <Text style={styles.videoText}>
          Video Status
        </Text>
      </View>
      )}
      </View>
      {showReactionBox && (
      <View style={styles.reactionBox}>
        {reactions.map(emoji => (
      <TouchableOpacity
        key={emoji}
        style={
        styles.reactionButton
        }
        onPress={() =>
        addReaction(emoji)}>
        <Text style={styles.reactionEmoji}>
          {emoji}
        </Text>
      </TouchableOpacity>
        ))}
      </View>
        )}
      <View style={styles.viewerBottom}>

      <TouchableOpacity
        style={styles.replyBox}
        onPress={() =>
        Alert.alert(
        'Reply',
        'Reply can be connected with ChatScreen.',
        )}>
        <Text style={styles.replyPlaceholder}>
          Reply...
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
        styles.reactionMainButton
        }
        onPress={() =>
        setShowReactionBox(
        !showReactionBox,
        )}>
        <Text style={styles.reactionMainText}>
          {selectedStatus.reaction ||
          '❤️'}
        </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.viewsContainer}>
        <Text
          style={styles.viewsText}>
          👁 {selectedStatus.views || 0}{' '}
          views
        </Text>
      </View>
      </SafeAreaView>
      )}
      </Modal>
      </SafeAreaView>
  );
};

export default StatusScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    backgroundColor: '#AB47BC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 5,
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 40,
  },
  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 18,
  },
  myStatusCard: {
    marginHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  myAvatarWrapper: {
    position: 'relative',
  },
  myAvatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  myAvatarPlaceholder: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myAvatarText: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  plusButton: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#AB47BC',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  myStatusInfo: {
    flex: 1,
    marginLeft: 14,
  },
  myStatusName: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '700',
  },
  myStatusSubtitle: {
    color: '#777777',
    fontSize: 13,
    marginTop: 4,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },
  myDeleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  myDeleteText: {
    fontSize: 19,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },
  statusAvatarContainer: {
    position: 'relative',
  },
  statusRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1BEE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#AB47BC',
    fontSize: 21,
    fontWeight: 'bold',
  },
  reactionSmall: {
    position: 'absolute',
    right: -3,
    bottom: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  statusInfo: {
    marginLeft: 14,
  },
  statusName: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '600',
  },
  statusTime: {
    color: '#777777',
    fontSize: 13,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 55,
  },
  emptyIcon: {
    color: '#AB47BC',
    fontSize: 45,
  },
  emptyTitle: {
    color: '#222222',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  emptyText: {
    color: '#777777',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  addModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 22,
    paddingBottom: 30,
  },
  modalTitle: {
    color: '#111111',
    fontSize: 21,
    fontWeight: '700',
    marginBottom: 18,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    marginLeft: 14,
    color: '#222222',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 12,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  textModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textStatusBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
  },
  textInput: {
    minHeight: 150,
    borderWidth: 1,
    borderColor: '#D7A9DE',
    borderRadius: 15,
    padding: 15,
    textAlignVertical: 'top',
    color: '#111111',
    fontSize: 17,
    marginTop: 5,
  },
  characterCount: {
    textAlign: 'right',
    color: '#888888',
    marginTop: 5,
  },
  textButtonRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  cancelTextButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cancelTextButtonText: {
    color: '#AB47BC',
    fontWeight: '700',
  },
  postButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  viewerContainer: {
    flex: 1,
    backgroundColor: '#111111',
  },
  viewerHeader: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  viewerBack: {
    width: 40,
  },
  viewerBackText: {
    color: '#FFFFFF',
    fontSize: 38,
  },
  viewerUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewerAvatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  viewerAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewerName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  viewerTime: {
    color: '#CCCCCC',
    fontSize: 12,
    marginTop: 2,
  },
  deleteIcon: {
    fontSize: 20,
  },
  progressBackground: {
    height: 3,
    backgroundColor: '#555555',
    marginHorizontal: 10,
  },
  progressFill: {
    height: 3,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  statusViewerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStatusViewer: {
    width: width * 0.85,
    minHeight: 250,
    borderRadius: 25,
    backgroundColor: '#AB47BC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  viewerStatusText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center',
  },
  fullImage: {
    width: width,
    height: height * 0.65,
  },
  videoPlaceholder: {
    width: width * 0.9,
    height: height * 0.55,
    backgroundColor: '#222222',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoIcon: {
    color: '#FFFFFF',
    fontSize: 60,
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 17,
    marginTop: 10,
  },
  reactionBox: {
    position: 'absolute',
    bottom: 85,
    left: 15,
    right: 15,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  reactionButton: {
    padding: 5,
  },
  reactionEmoji: {
    fontSize: 27,
  },
  viewerBottom: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  replyBox: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 24,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  replyPlaceholder: {
    color: '#CCCCCC',
    fontSize: 15,
  },
  reactionMainButton: {
    width: 52,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionMainText: {
    fontSize: 27,
  },
  viewsContainer: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  viewsText: {
    color: '#CCCCCC',
    fontSize: 13,
  },
});