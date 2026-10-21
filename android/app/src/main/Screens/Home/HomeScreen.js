import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,SafeAreaView,Alert,ScrollView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('Login');
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              navigation.replace('Login');
            } catch (error) {
              console.log('Logout Error:', error);
              Alert.alert('Error', 'Logout failed. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}>
              <Text style={styles.backText}>‹ Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>MingleChat</Text>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mainCard}>
            <Text style={styles.emoji}>💬</Text>

            <Text style={styles.cardTitle}>
              Welcome to Mingle Chat
            </Text>

            <Text style={styles.cardDescription}>
              Connect with your friends, chat one-to-one,
              share media and enjoy your conversations.
            </Text>

            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate('Users')}
              activeOpacity={0.8}>
              <Text style={styles.chatButtonText}>
                Start Chat
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featuresContainer}>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('Users')}
              activeOpacity={0.8}>
              <Text style={styles.featureIcon}>👥</Text>
              <Text style={styles.featureTitle}>Users</Text>
              <Text style={styles.featureText}>
                Find people
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.8}>
              <Text style={styles.featureIcon}>👤</Text>
              <Text style={styles.featureTitle}>Profile</Text>
              <Text style={styles.featureText}>
                View profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('Chats')}
              activeOpacity={0.8}>
              <Text style={styles.featureIcon}>💬</Text>
              <Text style={styles.featureTitle}>Chats</Text>
              <Text style={styles.featureText}>
                Your messages
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.featureCard}
              onPress={() => navigation.navigate('Media')}
              activeOpacity={0.8}>
              <Text style={styles.featureIcon}>🖼️</Text>
              <Text style={styles.featureTitle}>Media</Text>
              <Text style={styles.featureText}>
                Shared media
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },

  scrollContent: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  backButton: {
    backgroundColor: '#EFE8FF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 12,
  },

  backText: {
    color: '#AB47BC',
    fontSize: 14,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#AB47BC',
  },

  logoutButton: {
    backgroundColor: '#EFE8FF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  logoutText: {
    color: '#AB47BC',
    fontSize: 13,
    fontWeight: 'bold',
  },

  mainCard: {
    backgroundColor: '#AB47BC',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  emoji: {
    fontSize: 45,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },

  cardDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: '#EDE7FF',
    textAlign: 'center',
    marginBottom: 20,
  },

  chatButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 13,
    paddingHorizontal: 35,
    borderRadius: 15,
  },

  chatButtonText: {
    color: '#AB47BC',
    fontSize: 15,
    fontWeight: 'bold',
  },

  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  featureIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },

  featureText: {
    fontSize: 12,
    color: '#888888',
  },
});
