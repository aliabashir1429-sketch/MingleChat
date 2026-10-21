import React, {useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,Platform,SafeAreaView,ScrollView,} from 'react-native';

const ForgotPasswordScreen = ({navigation}) => {
const [email, setEmail] = useState('');
const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    Alert.alert(
      'Reset Password',
      'A password reset link has been sent to your email address.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ],
    );
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrowButton}
          onPress={handleBack}
          activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Forgot Password
        </Text>

        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔐</Text>
            </View>

            <Text style={styles.title}>
              Forgot Password?
            </Text>

            <Text style={styles.subtitle}>
              Don't worry! Enter your email address and
              we'll help you reset your password.
            </Text>

            <Text style={styles.label}>
              Email Address
            </Text>

            <TextInput
              style={styles.input}
              placeholder="name@email.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}/>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetPassword}
              activeOpacity={0.8}>
              <Text style={styles.resetButtonText}>
                Reset Password
              </Text>
              <Text style={styles.buttonArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}>
              <Text style={styles.backText}>
                ← Back to{' '}
                <Text style={styles.loginText}>
                  Login
                </Text>
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

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F0FA',
  },
  header: {
    height: 60,
    backgroundColor: '#AB47BC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4,
    zIndex: 1,
  },

  backArrowButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backArrow: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  headerTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },

  headerRight: {
    width: 40,
  },

  keyboardView: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 25,
    elevation: 6,
    shadowColor: '#AB47BC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#F3E5F5',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  icon: {
    fontSize: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D8B4E2',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#333333',
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },

  resetButton: {
    height: 52,
    backgroundColor: '#AB47BC',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonArrow: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  backButton: {
    alignItems: 'center',
    marginTop: 22,
  },

  backText: {
    fontSize: 14,
    color: '#777777',
  },

  loginText: {
    color: '#AB47BC',
    fontWeight: 'bold',
  },

  bottomText: {
    textAlign: 'center',
    color: '#AAAAAA',
    fontSize: 12,
    marginTop: 22,
    letterSpacing: 1,
  },
});
