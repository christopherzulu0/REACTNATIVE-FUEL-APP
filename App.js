import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';

// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './screens/HomeScreen';
// import GameStore from './screens/gameStore';

// const Tab = createBottomTabNavigator();
import { useEffect, useState } from 'react';
import * as Location from 'expo-location'; 
import { useFonts } from 'expo-font';
import { UserLocationContext } from './Context/UserLocationContext';


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [fontsLoaded] = useFonts({
  //   'raleway': require('./assets/Fonts/Raleway-Regular.ttf'),
  //   'raleway-bold': require('./assets/Fonts/Raleway-SemiBold.ttf'),

  // });
   
   
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
     
    })();

    
  }, []);

  return (
    <UserLocationContext.Provider 
    value={{location,setLocation}}>
    <AppNavigation />
    </UserLocationContext.Provider>
  );
}
