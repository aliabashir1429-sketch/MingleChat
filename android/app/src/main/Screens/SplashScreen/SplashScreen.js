import React, {useEffect} from 'react';
import {View,Text,StyleSheet,ActivityIndicator,} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>MC</Text>
    </View>
      <Text style={styles.appName}>MingleChat</Text>
      <Text style={styles.tagline}>
        Connect. Chat. Vibe.
      </Text>

    <ActivityIndicator
        size="small"
        color="#AB47BC"
        style={styles.loader}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#AB47BC',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  logoText: {
    fontSize: 58,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  appName: {
    marginTop: 25,
    fontSize: 38,
    fontWeight: 'bold',
    color: '#AB47BC',
    letterSpacing: 1,
  },

  tagline: {
    marginTop: 8,
    fontSize: 15,
    color: '#000000',
    letterSpacing: 0.5,
  },

  loader: {
    marginTop: 35,
  },
});

export default SplashScreen;

