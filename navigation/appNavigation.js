import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';
import VehicleProfile from '../screens/VehicleProfile';
import FuelConsumptionTracking from '../screens/FuelConsumptionTracking';
import Map from '../screens/Map';
import PlaceDetail from '../Components/PlaceDetail/PlaceDetail';
const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  const {user} = useAuth();

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="VehicleProfile" options={{headerShown: false}} component={VehicleProfile} />
          <Stack.Screen name="FuelConsumptionTracking" options={{headerShown: false}} component={FuelConsumptionTracking} />
          <Stack.Screen name="Map" options={{headerShown: false}} component={Map} />
          <Stack.Screen name="PlaceDetail" options={{headerShown: false}} component={PlaceDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}