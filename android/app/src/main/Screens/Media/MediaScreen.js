import React, {useState} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,Alert,Modal,ActivityIndicator,} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {pick,types,} from '@react-native-documents/picker';

const PURPLE = '#AB47BC';
const MediaScreen = ({route, navigation}) => {
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
    'No number';
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const pickImage = async () => {
    try {
      setShowMenu(false);
      setLoading(true);
  const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
      });
      setLoading(false);
      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        Alert.alert(
          'Image Error',
          result.errorMessage || 'Unable to select image.',
        );
        return;
      }
      const asset = result.assets?.[0];
      if (!asset?.uri) {
        Alert.alert('Error', 'Image select nahi ho saki.');
        return;
      }
      Alert.alert(
        'Image Selected',
        asset.fileName || 'Image selected successfully.',
      );
    console.log('IMAGE:', asset);
    } catch (error) {
      setLoading(false);
      console.log('Image picker error:', error);
      Alert.alert('Error', 'Image select karte waqt error aa gaya.');
    }
  };
  const pickVideo = async () => {
    try {
      setShowMenu(false);
      setLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'video',
        selectionLimit: 1,
      });
      setLoading(false);
      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        Alert.alert(
          'Video Error',
          result.errorMessage || 'Unable to select video.',
        );
        return;
      }
      const asset = result.assets?.[0];
      if (!asset?.uri) {
        Alert.alert('Error', 'Video select nahi ho saki.');
        return;
      }
      Alert.alert(
        'Video Selected',
        asset.fileName || 'Video selected successfully.',
      );
      console.log('VIDEO:', asset);
    } catch (error) {
      setLoading(false);
      console.log('Video picker error:', error);
      Alert.alert('Error', 'Video select karte waqt error aa gaya.');
    }
  };
    const pickAudio = async () => {
    try {
      setShowMenu(false);
      setLoading(true);
      const result = await pick({
        type: [types.audio],
        allowMultiSelection: false,
      });
      setLoading(false);
      const file = Array.isArray(result) ? result[0] : result;
      if (!file) {
        Alert.alert('Error', 'Audio select nahi hui.');
        return;
      }
      Alert.alert(
        'Audio Selected',
        file.name || 'Audio selected successfully.',
      );
      console.log('AUDIO:', file);
    } catch (error) {
      setLoading(false);
      console.log('Audio picker error:', error);
      if (
        error?.code === 'OPERATION_CANCELED' ||
        error?.code === 'DOCUMENT_PICKER_CANCELED'
      ) {
        return;
      }
      Alert.alert('Error', 'Audio select karte waqt error aa gaya.');
    }
  };
  const pickDocument = async () => {
    try {
      setShowMenu(false);
      setLoading(true);
      const result = await pick({
        type: [types.allFiles],
        allowMultiSelection: false,
      });
      setLoading(false);
      const file = Array.isArray(result) ? result[0] : result;
      if (!file) {
        Alert.alert('Error', 'Document select nahi hua.');
        return;
      }
      Alert.alert(
        'Document Selected',
        file.name || 'Document selected successfully.',
      );
      console.log('DOCUMENT:', file);
    } catch (error) {
      setLoading(false);
      console.log('Document picker error:', error);
      if (
        error?.code === 'OPERATION_CANCELED' ||
        error?.code === 'DOCUMENT_PICKER_CANCELED'
      ) {
        return;
      }
      Alert.alert('Error', 'Document select karte waqt error aa gaya.');
    }
  };
    const openMediaMenu = () => {
    setShowMenu(true);
  };
return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      
      <View style={styles.headerInfo}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {contactName.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.nameBox}>
        <Text style={styles.contactName} numberOfLines={1}>
          {contactName}
        </Text>
        <Text style={styles.contactNumber} numberOfLines={1}>
          {contactNumber}
        </Text>
      </View>
      </View>
      </View>
      <View style={styles.titleArea}>
        <Text style={styles.title}>Media & Files</Text>
        <Text style={styles.subtitle}>
          Choose what you want to send to {contactName}
        </Text>
      </View>
      <View style={styles.optionsContainer}>
      
      <TouchableOpacity
        style={styles.optionCard}
        activeOpacity={0.8}
        onPress={pickImage}>
      <View style={[styles.iconBox, {backgroundColor: '#F3E5F5'}]}>
        <Text style={styles.icon}>🖼️</Text>
      </View>
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>Images</Text>
        <Text style={styles.optionSubtitle}>
          Choose photos from gallery
        </Text>
      </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.optionCard}
        activeOpacity={0.8}
        onPress={pickVideo}>
      <View style={[styles.iconBox, {backgroundColor: '#EDE7F6'}]}>
        <Text style={styles.icon}>🎥</Text>
      </View>
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>Videos</Text>
        <Text style={styles.optionSubtitle}>
          Choose a video from gallery
        </Text>
      </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.optionCard}
        activeOpacity={0.8}
        onPress={pickAudio}>
      <View style={[styles.iconBox, {backgroundColor: '#FCE4EC'}]}>
        <Text style={styles.icon}>🎵</Text>
      </View>
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>Audio</Text>
        <Text style={styles.optionSubtitle}>
          Choose an audio file
        </Text>
      </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.optionCard}
        activeOpacity={0.8}
        onPress={pickDocument}>
      <View style={[styles.iconBox, {backgroundColor: '#E3F2FD'}]}>
        <Text style={styles.icon}>📄</Text>
      </View>
      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>Documents</Text>
        <Text style={styles.optionSubtitle}>
          PDF, DOCX, TXT and other files
        </Text>
      </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.bottomButton}
        activeOpacity={0.85}
        onPress={openMediaMenu}>
        <Text style={styles.bottomButtonText}>＋ Choose Media</Text>
      </TouchableOpacity>
        {loading && (
      <View style={styles.loadingOverlay}>
      <View style={styles.loadingBox}>
      <ActivityIndicator size="large" color={PURPLE} />
        <Text style={styles.loadingText}>
          Please wait...
        </Text>
      </View>
      </View>
      )}

      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}>
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}>
        <View style={styles.menuBox}>
          <Text style={styles.menuTitle}>Choose Media</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={pickImage}>
          <Text style={styles.menuIcon}>🖼️</Text>
          <Text style={styles.menuText}>Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={pickVideo}>
          <Text style={styles.menuIcon}>🎥</Text>
          <Text style={styles.menuText}>Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={pickAudio}>
          <Text style={styles.menuIcon}>🎵</Text>
          <Text style={styles.menuText}>Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={pickDocument}>
          <Text style={styles.menuIcon}>📄</Text>
          <Text style={styles.menuText}>Document</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setShowMenu(false)}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default MediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7FB',
  },
  header: {
    height: 72,
    backgroundColor: PURPLE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    elevation: 5,
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '300',
    marginTop: -4,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: PURPLE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameBox: {
    marginLeft: 12,
    flex: 1,
  },
  contactName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  contactNumber: {
    color: '#F3E5F5',
    fontSize: 13,
    marginTop: 2,
  },
  titleArea: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 15,
  },
  title: {
    color: '#000000',
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    color: '#666666',
    fontSize: 14,
    marginTop: 7,
    lineHeight: 20,
  },
  optionsContainer: {
    paddingHorizontal: 18,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    minHeight: 82,
    borderRadius: 18,
    marginBottom: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 27,
  },
  optionText: {
    flex: 1,
    marginLeft: 14,
  },
  optionTitle: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
  },
  optionSubtitle: {
    color: '#777777',
    fontSize: 12,
    marginTop: 4,
  },
  arrow: {
    color: PURPLE,
    fontSize: 30,
    marginLeft: 8,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    backgroundColor: PURPLE,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 6,
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 18,
    alignItems: 'center',
  },
  loadingText: {
    color: '#000000',
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  menuBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 22,
    paddingBottom: 30,
  },
  menuTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  menuItem: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuIcon: {
    fontSize: 23,
    width: 45,
  },
  menuText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 15,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '700',
  },
});