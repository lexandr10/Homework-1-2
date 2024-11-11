import { ActivityIndicator, Text} from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { authStateChanged } from './firebase/auth';
import MainScreen from './screens/MainScreen';

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

  return  <Provider store={store.store}>
    <PersistGate 
    loading={<Text>Loading...</Text>}
    persistor={store.persistor}
    >
    <GestureHandlerRootView style={{ flex: 1 }}>
     <AuthListner/>
  </GestureHandlerRootView>
    </PersistGate>
  </Provider>

;
}

const AuthListner = () => {
  const distpatch = useDispatch();

  useEffect(() => {
    authStateChanged(distpatch)
  },[distpatch])
  return <NavigationContainer>
  <MainScreen/>
</NavigationContainer>
}
