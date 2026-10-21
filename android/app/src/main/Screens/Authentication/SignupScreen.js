import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,ScrollView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Error',
        'Password must be at least 6 characters',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Error',
        'Password and Confirm Password do not match',
      );
      return;
    }

    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      await AsyncStorage.setItem(
        'userData',
        JSON.stringify(userData),
      );

      Alert.alert(
        'Success',
        'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'),
          },
        ],
      );
    } catch (error) {
      console.log('Signup Error:', error);

      Alert.alert(
        'Error',
        'Unable to create account. Please try again.',
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>MC</Text>
      </View>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join MingleChat and start connecting
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999999"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"/>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="name@email.com"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"/>

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}/>

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Confirm Password</Text>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm password"
            placeholderTextColor="#999999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}/>

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() =>
              setShowConfirmPassword(!showConfirmPassword)}>

            <Text style={styles.eyeText}>
              {showConfirmPassword ? 'Hide' : 'Show'}
            </Text>

          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignup}
          activeOpacity={0.8}>

        <Text style={styles.signupButtonText}>
            Sign Up
        </Text>
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.accountText}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('Login')}>
            <Text style={styles.loginText}>
              {' '}Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 40,
    alignItems: 'center',
  },

  logoCircle: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#AB47BC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 5,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#AB47BC',
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 15,
    color: '#777777',
    marginBottom: 30,
    textAlign: 'center',
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D8B4E2',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FAF7FB',
  },

  passwordContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D8B4E2',
    borderRadius: 12,
    backgroundColor: '#FAF7FB',
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333333',
  },

  eyeButton: {
    paddingHorizontal: 15,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeText: {
    color: '#AB47BC',
    fontSize: 13,
    fontWeight: 'bold',
  },

  signupButton: {
    height: 54,
    backgroundColor: '#AB47BC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    elevation: 4,
  },

  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  accountText: {
    color: '#777777',
    fontSize: 14,
  },

  loginText: {
    color: '#AB47BC',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
