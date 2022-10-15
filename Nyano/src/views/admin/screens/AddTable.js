import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const AddTable = ({navigation}) => {
  const [tableNumber, setTableNumber] = useState();
  const addTable = async () => {
    if (tableNumber != '') {
      const companyCode=await AsyncStorage.getItem('companyCode')
      const ref = collection(db, 'tableAdminDB',companyCode,'hotelTable');
        const snapshot = await addDoc(ref, {
          admin: auth.currentUser.uid,
          tableNumber: tableNumber,
          companyId: companyCode,
        });
      navigation.goBack();
      
    }
  };
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Add Table
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Table Number: "
          value={tableNumber}
          onChangeText={text => setTableNumber(text)}
        />
      </View>

      <View className="flex flex-row mt-16">
        <TouchableOpacity
          className="bg-black rounded-full flex-1 p-4"
          onPress={addTable}>
          <Text className="text-white text-center tracking-widest">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTable;
