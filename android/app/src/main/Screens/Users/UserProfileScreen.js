import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

const UserProfileScreen = ({navigation, route}) => {
  const user = route?.params?.user;
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User not found</Text>

          <TouchableOpacity
            style={styles.backHomeButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backHomeText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleMessage = () => {
    navigation.navigate('Chat', {
      user: user,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#6C63FF"
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>User Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.profileSection}>

        <View style={styles.profileImageContainer}>
          <Image
            source={{uri: user.image}}
            style={styles.profileImage}
          />
          {user.online && <View style={styles.onlineDot} />}
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: user.online
                  ? '#35C759'
                  : '#A0A0A0',
              },
            ]}
          />

          <Text style={styles.statusText}>
            {user.online ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Text style={styles.infoIcon}>i</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>About</Text>

            <Text style={styles.infoValue}>
              {user.about || 'Hey! I am using Mingle Chat'}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <View style={styles.iconBox}>
            <Text style={styles.infoIcon}>●</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Status</Text>

            <Text style={styles.infoValue}>
              {user.online ? 'Online now' : 'Offline'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.messageButton}
          activeOpacity={0.8}
          onPress={handleMessage}>

          <Text style={styles.messageIcon}>💬</Text>

          <Text style={styles.messageButtonText}>
            Message
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },

  header: {
    height: 75,
    backgroundColor: '#AB47BC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    color: '#FFFFFF',
    fontSize: 34,
    lineHeight: 35,
    marginTop: -3,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  headerRight: {
    width: 42,
  },

  profileSection: {
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 25,
  },

  profileImageContainer: {
    position: 'relative',
  },

  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 38,
    backgroundColor: '#E5E3FF',
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },

  onlineDot: {
    position: 'absolute',
    right: 4,
    bottom: 5,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#35C759',
    borderWidth: 4,
    borderColor: '#F7F7FC',
  },

  userName: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222222',
    marginTop: 18,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 13,
    color: '#888888',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EEEDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  infoIcon: {
    color: '#AB47BC',
    fontSize: 18,
    fontWeight: '700',
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEF4',
  },

  // Button
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },

  messageButton: {
    height: 55,
    backgroundColor: '#AB47BC',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#AB47BC',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  messageIcon: {
    fontSize: 18,
    marginRight: 9,
  },

  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Error
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 20,
  },

  backHomeButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
  },

  backHomeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default UserProfileScreen;
