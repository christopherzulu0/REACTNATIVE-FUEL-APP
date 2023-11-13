import { View, Text, TouchableOpacity,Image, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';



export default function HomeScreen({ navigation }) {
  const handleLogout = async()=>{
   await signOut(auth);
  }
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/images/logo1.png')} style={styles.logo} />
        <Text style={styles.headerText}>Fuel Management App</Text>
        
        
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Fuel Level and Distance */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Toyota Landcruiser V8</Text>
          <Text style={styles.cardSubtitle}>Fuel Level: 80%</Text>
          <Text style={styles.cardSubtitle}>Estimated Distance: 300 km</Text>
        </View>

        {/* Nearest Filling Stations */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.cardTitle}>Nearest Filling Stations</Text>
          <Image
            source={require('../assets/images/fillingstation.jpg')}
            style={styles.cardImage}
          />
        </TouchableOpacity>

        {/* Fuel Consumption Tracking */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('FuelConsumptionTracking')}
        >
          <Text style={styles.cardTitle}>Fuel Consumption Tracking</Text>
          <Text style={styles.cardSubtitle}>View your fuel usage history.</Text>
        </TouchableOpacity>

        {/* Maintenance Schedule */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('MaintenanceSchedule')}
        >
          <Text style={styles.cardTitle}>Maintenance Schedule</Text>
          <Text style={styles.cardSubtitle}>
            Schedule and track maintenance tasks.
          </Text>
        </TouchableOpacity>

        {/* Vehicle Profile Button */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('VehicleProfile')}
        >
          <Text style={styles.cardTitle}>Add Vehicle Profile</Text>
        </TouchableOpacity>

      </View>
  
    </ScrollView>


   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});
