import { ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';

import RegistrationScreen from './screens/RegistrationScreen';

type rootStackParams = {
  Login: undefined,
  Registration: undefined
}

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator<rootStackParams>();

export type LoginScreenNavigationProp = StackNavigationProp<rootStackParams, 'Login'>;
export type RegistationScreenNavigationProp = StackNavigationProp<rootStackParams, 'Registration'>;





export default function App() {
  const [fontsLoaded] = useFonts({
"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
"Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  
 
  useEffect(() => {
    if(fontsLoaded) {
      SplashScreen.hideAsync();
    }
  },[fontsLoaded]);
  if(!fontsLoaded) {
    return <ActivityIndicator/>
  }

  return  <NavigationContainer>
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
    <Stack.Screen options={{headerShown: false}} name="Registration" component={RegistrationScreen} />
  </Stack.Navigator>
</NavigationContainer>
;
}


