import React, {useEffect, useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,SafeAreaView,KeyboardAvoidingView,Platform,ScrollView,Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    checkSavedLogin();
  }, []);

  const checkSavedLogin = async () => {
    try {
      const savedLogin = await AsyncStorage.getItem('isLoggedIn');

      if (savedLogin === 'true') {
        navigation.replace('Home');
      }
    } catch (error) {
      console.log('Saved Login Check Error:', error);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter your email and password.',
      );
      return;
    }

    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email.trim());

      const userData = {
        email: email.trim(),
        password: password.trim(),
      };

      await AsyncStorage.setItem(
        'userData',
        JSON.stringify(userData),
      );

      navigation.replace('Home');
    } catch (error) {
      console.log('Login Error:', error);
      Alert.alert(
        'Login Error',
        'Unable to save login information.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Login</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.topCircle} />
          <View style={styles.smallCircle} />

          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>MC</Text>
            </View>
          </View>

          <Text style={styles.title}>Welcome Back!</Text>

          <Text style={styles.subtitle}>
            Login to continue to MingleChat
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputContainer}>
              <View style={styles.iconBox}>
                <Text style={styles.icon}>✉</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}/>
            </View>

            <Text style={styles.label}>Password</Text>

            <View style={styles.inputContainer}>
              <View style={styles.iconBox}>
                <Text style={styles.icon}>🔒</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}/>

              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeText}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() =>
                navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.85}
              onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>
                {' '}Create Account
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.bottomText}>
            Connect • Chat • Vibe
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 60,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    zIndex: 1,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 25,
    backgroundColor: '#FFFFFF',
  },

  topCircle: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#F3E5F5',
    top: -115,
    right: -80,
  },

  smallCircle: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E1BEE7',
    top: 105,
    left: -35,
    opacity: 0.6,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 18,
  },

  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000000',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#777777',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 28,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    elevation: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },

  inputContainer: {
    height: 58,
    backgroundColor: '#F3E5F5',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  icon: {
    fontSize: 17,
  },

  input: {
    flex: 1,
    height: 58,
    fontSize: 15,
    color: '#000000',
  },

  eyeButton: {
    paddingHorizontal: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeText: {
    color: '#AB47BC',
    fontSize: 13,
    fontWeight: '800',
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 22,
  },

  forgotText: {
    color: '#AB47BC',
    fontSize: 14,
    fontWeight: '700',
  },

  loginButton: {
    height: 58,
    backgroundColor: '#AB47BC',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  signupText: {
    color: '#000000',
    fontSize: 14,
  },

  signupLink: {
    color: '#AB47BC',
    fontSize: 14,
    fontWeight: '800',
  },

  bottomText: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 22,
    letterSpacing: 1,
  },
});
