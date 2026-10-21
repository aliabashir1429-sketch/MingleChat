import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './android/app/src/main/Screens/SplashScreen/SplashScreen';

import LoginScreen from './android/app/src/main/Screens/Authentication/LoginScreen';
import SignupScreen from './android/app/src/main/Screens/Authentication/SignupScreen';
import ForgotPasswordScreen from './android/app/src/main/Screens/Authentication/ForgotPasswordScreen';

import HomeScreen from './android/app/src/main/Screens/Home/HomeScreen';

import ProfileScreen from './android/app/src/main/Screens/Profile/ProfileScreen';
import EditProfileScreen from './android/app/src/main/Screens/Profile/EditProfileScreen';

import UsersScreen from './android/app/src/main/Screens/Users/UsersScreen';
import UserProfileScreen from './android/app/src/main/Screens/Users/UserProfileScreen';
import AddContactScreen from './android/app/src/main/Screens/Users/AddContactScreen';

import ChatListScreen from './android/app/src/main/Screens/Chats/ChatListScreen';
import ChatProfileScreen from './android/app/src/main/Screens/Chats/ChatProfileScreen';
import ChatScreen from './android/app/src/main/Screens/Chats/ChatScreen';
import ChatSearchScreen from './android/app/src/main/Screens/Chats/ChatSearchScreen';
import MessageOptionScreen from './android/app/src/main/Screens/Chats/MessageOptionScreen';

import CallScreen from './android/app/src/main/Screens/Call/CallScreen';
import VoiceCallScreen from './android/app/src/main/Screens/Call/VoiceCallScreen';
import VideoCallScreen from './android/app/src/main/Screens/Call/VideoCallScreen';

import MediaScreen from './android/app/src/main/Screens/Media/MediaScreen';

import StatusScreen from './android/app/src/main/Screens/Status/StatusScreen';

const Stack = createNativeStackNavigator(); 
    const App = () => {
  return (

  <NavigationContainer> 
    <Stack.Navigator 
    screenOptions={{ 
      headerShown: false, 
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Login"component={LoginScreen}/>
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>

        <Stack.Screen name="Home" component={HomeScreen}/>

        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen}/>

        <Stack.Screen name="Users" component={UsersScreen}/>
        <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
        <Stack.Screen name="AddContact" component={AddContactScreen}/>

        <Stack.Screen name="Chats" component={ChatListScreen}/>
        <Stack.Screen name="ChatProfile" component={ChatProfileScreen}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="ChatSearch" component={ChatSearchScreen}/>
        <Stack.Screen name="MessageOption" component={MessageOptionScreen}/>

        <Stack.Screen name="Call" component={CallScreen}/>
        <Stack.Screen name="VoiceCallScreen" component={VoiceCallScreen}/>
        <Stack.Screen name="VideoCallScreen" component={VideoCallScreen}/>

        <Stack.Screen name="Media" component={MediaScreen}/>
        <Stack.Screen name="Status" component={StatusScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;