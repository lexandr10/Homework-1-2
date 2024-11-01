import { ActivityIndicator} from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import StackLoginNav from './navigation/StackLoginNav';
import BottomTabNav from './navigation/BottomTabNav';

SplashScreen.preventAutoHideAsync();

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

  return  <GestureHandlerRootView style={{ flex: 1 }}>
     <NavigationContainer>
  <BottomTabNav/>
</NavigationContainer>
  </GestureHandlerRootView>
 
;
}


