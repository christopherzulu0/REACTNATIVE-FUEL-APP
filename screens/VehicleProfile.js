import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView, Button, ActivityIndicator,Alert } from 'react-native';
import { db,auth } from '../config/firebase';
import { getFirestore } from 'firebase/firestore';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  uploadBytes
} from "firebase/firestore";
import {onAuthStateChanged} from 'firebase/auth'
import {Picker} from '@react-native-picker/picker';

export default function VehicleProfile({ navigation }) {
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [tankCapacity, setTankCapacity] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      } else {
        setUser('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when starting the submission
  
      const firestore = getFirestore(db);
      const vehiclesCollectionRef = collection(firestore, 'vehicles', user, 'list');
  
      await addDoc(vehiclesCollectionRef, {
        vehicleName,
        vehicleType,
        licensePlate,
        manufactureYear,
        fuelType,
        tankCapacity,
        fuelEfficiency,
        timestamp: serverTimestamp(),
      });
  
      // Data successfully submitted to Firestore
      console.log('Data submitted successfully!');
      Alert.alert('Success', 'Data added successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Error submitting data: ' + error.message);
    } finally {
      setLoading(false); // Set loading back to false after the submission is done
    }
  
    // Reset form fields after submission
    setFuelEfficiency('');
    setFuelType('');
    setLicensePlate('');
    setManufactureYear('');
    setTankCapacity('');
    setVehicleName('');
    setVehicleType('');
  };

  
  return (
      <><View style={styles.header}>
              <Image source={require('../assets/images/logo1.png')} style={styles.logo} />
              <Text style={styles.headerText}>Fuel Management App</Text>
        </View>
        <ScrollView> 
       <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="p-2 bg-blue-500 rounded-full"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>

      {/* Vehicle Image */}
      <View className="mt-2 mb-4">
        <Image
          source={require('../assets/images/document.png')}
          className="w-32 h-32 mx-auto rounded-full"
        />
        <Text className="text-2xl font-bold text-center">Vehicle Profile</Text>
      </View>
    
                   
                    {/* Vehicle Information Form */}
                    <View className="bg-gray-100 p-4 rounded-lg mb-4">
                          <Text className="text-lg font-semibold mb-2">Vehicle Information</Text>
                          <View className="mb-4">
                                <Text className="text-gray-600 mb-4">Vehicle Name</Text>
                                <TextInput
                                      className="p-3 bg-white border border-gray-300 rounded-lg"
                                      placeholder="Enter vehicle name" 
                                      value={vehicleName}
                                      onChangeText={setVehicleName}
                                      />
                          </View>
                          <View className="mb-4">
                                <Text className="text-gray-600 mb-4">Vehicle Type</Text>
                          <Picker
                           selectedValue={vehicleType}
                           onValueChange={(itemValue) => setVehicleType(itemValue)}
                            style={{ backgroundColor: 'white' }}
                          >
                            <Picker.Item label="Select Vehicle Type" value="" />
                            <Picker.Item label="Car" value="Car" />
                            <Picker.Item label="Truck" value="Truck" />
                            <Picker.Item label="Bus" value="Bus" />
                          </Picker>
                          </View>
                          <View className="mb-4">
                                <Text className="text-gray-600 mb-4">License Plate</Text>
                                <TextInput
                                      className="p-3 bg-white border border-gray-300 rounded-lg"
                                      placeholder="Enter license plate"
                                      value={licensePlate}
                                      onChangeText={setLicensePlate}
                                      />
                          </View>
                          <View>
                                <Text className="text-gray-600 mb-4">Manufacture Year</Text>
                                <TextInput
                                      className="p-3 bg-white border border-gray-300 rounded-lg"
                                      placeholder="Enter manufacture year" 
                                      value={manufactureYear}
                                      onChangeText={(text) => {
                                        // Use regex to allow only numeric input
                                        const numericValue = text.replace(/[^0-9]/g, '');
                                        setManufactureYear(numericValue);
                                      }}
                                      keyboardType="numeric"
                                      />
                          </View>
                    </View>

                    {/* Fuel Information Form */}
                    <View className="bg-gray-100 p-4 rounded-lg">
                          <Text className="text-lg font-semibold mb-2">Fuel Information</Text>
                          <View className="mb-4">
                          <Text className="text-gray-600 mb-4">Fuel Type</Text>
                          <Picker
                            selectedValue={fuelType}
                            onValueChange={(itemValue) => setFuelType(itemValue)}
                            style={{ backgroundColor: 'white' }}
                          >
                            <Picker.Item label="Select Fuel Type" value="" />
                            <Picker.Item label="Gasoline" value="Gasoline" />
                            <Picker.Item label="Diesel" value="Diesel" />
                            <Picker.Item label="Electric" value="Electric" />
                            <Picker.Item label="Petrol" value="Petrol" />
                          </Picker>
                        </View>
                          <View className="mb-4">
                                <Text className="text-gray-600 mb-4">Tank Capacity (liters)</Text>
                                <TextInput
                                      className="p-3 bg-white border border-gray-300 rounded-lg"
                                      placeholder="Enter tank capacity"
                                      value={tankCapacity}  
                                      onChangeText={(text) => {
                                        // Use regex to allow only numeric input
                                        const numericValue = text.replace(/[^0-9]/g, '');
                                        setTankCapacity(numericValue);
                                      }}
                                      keyboardType="numeric"
                                      />
                          </View>
                          <View>
                                <Text className="text-gray-600 mb-4">Fuel Efficiency (km/h)</Text>
                                <TextInput
                                      className="p-3 bg-white border border-gray-300 rounded-lg"
                                      placeholder="Enter fuel efficiency" 
                                      value={fuelEfficiency}
                                      onChangeText={(text) => {
                                        // Use regex to allow only numeric input
                                        const numericValue = text.replace(/[^0-9]/g, '');
                                        setFuelEfficiency(numericValue);
                                      }}
                                      keyboardType="numeric"
                                      />
                          </View>
                    </View>

                    {/**submit button */}
                    <View className='mt-4'>
                    {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Display loader when loading is true
      ) : (
        <TouchableOpacity onPress={handleSubmit} className="py-3 bg-blue-400 rounded-full">
          <Text className="text-xl font-bold text-center text-white">Submit</Text>
        </TouchableOpacity>
      )}
                    </View>
                  
              </View>
              </ScrollView>
              </>
  );
}


const styles = StyleSheet.create({
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
          vehicle:{
            width: 60,
            height: 60,
            marginLeft: 140,
          }
        
    });
    
