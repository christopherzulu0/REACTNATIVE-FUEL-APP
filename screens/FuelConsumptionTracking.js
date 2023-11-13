
import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet,ActivityIndicator,Alert } from 'react-native';
import Modal from 'react-native-modal';
import { db,auth } from '../config/firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  uploadBytes,
  getFirestore,
  onSnapshot
} from "firebase/firestore";
import {onAuthStateChanged} from 'firebase/auth'
import DateTimePicker from '@react-native-community/datetimepicker';
import { AiOutlinePlus } from 'react-icons/ai';
import Icon from 'react-native-vector-icons/MaterialIcons';


  


export default function FuelConsumptionTracking({navigation}) {
  const [distance,setDistance] = useState("");
  const [date,setDate] = useState(new Date());
  const [consumed,setConsumed] = useState('')
  const [loading,setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  const [user, setUser] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


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
    
    const consumptionRef = collection(db, 'Consumption', user, 'All');
    try {
      setLoading(true); // Set loading to true when starting the submission
      await addDoc(consumptionRef, {
        distance,
        date,
        consumed,
      });
  
  
      Alert.alert('Data added successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      Alert.alert('Error', 'Error submitting data: ' + error.message);
    } finally {
      setLoading(false); // Set loading back to false after the submission is done
    }
  
    // Reset form fields after submission
    setDistance('');
    setDate('');
    setConsumed('');
   
  };


  
 
//Retrieve Data


useEffect(() => {
  // Auth state change listener
  const authUnsubscribe = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      setUser(authUser.email);
    } else {
      setUser('');
    }
  });

  // Firestore snapshot listener
  if (user) {
    const consumptionRef = collection(db, 'vehicles', user, 'list');

    const firestoreUnsubscribe = onSnapshot(consumptionRef, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });
      // Update your state with the retrieved data
      setVehicles(updatedData);
    });

    return () => {
      firestoreUnsubscribe(); // Unsubscribe from the firestore snapshot listener
      authUnsubscribe(); // Unsubscribe from the auth state change listener
    };
  }

  // If user is not logged in, return an empty cleanup function
  return () => {};
}, [user]);


  return (
    <ScrollView className="bg-gray-100">
  <View className="bg-white p-4">
    {/* Header */}
    <View className="flex-row items-center justify-between mb-6 mt-6">
      <Text className="text-3xl font-bold">Fuel Consumption</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="p-2 bg-blue-500 rounded-full"
      >
        <Text className="text-white">Go Back</Text>
      </TouchableOpacity>
    </View>

    {/* Display Data for Each Vehicle */}
    {vehicles.map((vehicle) => (
  <View key={vehicle.id} className="bg-gray-100 p-4 rounded-lg mb-4" style={styles.shadowBox}>
    <Text className="text-xl font-semibold mb-4">{vehicle.vehicleName}</Text>
    <View className="mb-4">
      <Text className="text-gray-600">Total Distance Traveled (km)</Text>
      <Text className="text-lg font-semibold">{vehicle.distance}</Text>
    </View>
    <View className="mb-4">
      <Text className="text-gray-600">Total Fuel Consumed (liters)</Text>
      <Text className="text-lg font-semibold">{vehicle.fuelConsumed}</Text>
    </View>
    <View className="mb-4">
      <Text className="text-gray-600">Average Fuel Efficiency (km/h)</Text>
      <Text className="text-lg font-semibold">{vehicle.fuelEfficiency}</Text>
    </View>
    {/* Add icon for "add" */}
    {/* <AiOutlinePlus className="text-xl text-blue-500 cursor-pointer" /> */}

    <TouchableOpacity onPress={toggleModal}>
    <Icon name="edit" size={30} color="#000" style={styles.edits} />
      </TouchableOpacity>
    
  </View>
))}

  
  </View>

  {/* Modal */}
  <Modal isVisible={isModalVisible}>
    <View className="bg-white p-4 rounded-lg">
      <Text className="text-2xl font-bold mb-4">Add New Entry</Text>
      {/* Form for Adding a New Entry */}
      <View style={styles.container}>
  <Text style={styles.label}>Date
  
  </Text>
  <DateTimePicker
  value={new Date(date)}
  mode="date"
  display="spinner"
  placeholder="Select date"
  format="MM/DD/YYYY"
  confirmBtnText="Confirm"
  cancelBtnText="Cancel"
  onDateChange={(selectedDate) => setDate(selectedDate)}
/>
</View>

      <View className="mb-4">
        <Text className="text-gray-600">Distance Traveled (km)</Text>
        <TextInput
          className="p-3 bg-white border border-gray-300 rounded-lg"
          placeholder="Enter distance traveled"
          value={distance}
          onChangeText={(text) => setDistance(text)}
        />
      </View>
      <View className="mb-4">
        <Text className="text-gray-600">Fuel Consumed (liters)</Text>
        <TextInput
          className="p-3 bg-white border border-gray-300 rounded-lg"
          placeholder="Enter fuel consumed"
          value={consumed}
          onChangeText={(text) => setConsumed(text)}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Display loader when loading is true
      ) : (
        <TouchableOpacity
          onPress={handleSubmit}
          className="p-2 bg-blue-500 rounded-full"
        >
          <Text className="text-white text-center">Add Entry</Text>
        </TouchableOpacity>
      )}

      {/* Button to Close the Modal */}
      <TouchableOpacity onPress={toggleModal} className="p-2 bg-red-500 rounded-full mt-4">
        <Text className="text-white text-center">Close Modal</Text>
      </TouchableOpacity>
    </View>
      </Modal>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
      shadowBox: {
        elevation: 5, // Add elevation to create the box shadow
        borderRadius: 10, // You can also add border radius for a rounded shadow effect
      },
      container: {
        marginVertical: 10,
      },
      input: {
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
      },
      edits:{
        position: 'absolute',
        right: 10, // Adjust the right value as needed
        bottom: 0
        
      }
    });