import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();
const auth = getAuth();

const RoomDetails = ({navigation, route}) => {
  const {roomData} = route.params;
  const [loading, setLoading] = useState(false);

  const deleteRecord = async () => {
    setLoading(true);
    const companyCode = await AsyncStorage.getItem('companyCode');
    const deleteRef = doc(
      db,
      'roomAdminDB',
      companyCode,
      'hotelRoom',
      roomData[0],
    );
    await deleteDoc(deleteRef);

    navigation.reset({
      index: 0,
      routes: [{name: 'Rooms'}],
    });
  };

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Room Detail
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Room Number: "
          value={roomData[1].roomNumber}
          editable={false}
        />
      </View>
      <View className="flex flex-row mt-5">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Room Number: "
          value={roomData[1].type}
          editable={false}
        />
      </View>

      <View className="flex flex-row mt-5">
        <TextInput
          keyboardType="numeric"
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Price: "
          value={roomData[1].price}
          editable={false}
        />
      </View>

      <TouchableOpacity
        disabled={loading}
        activeOpacity={0.7}
        className=" p-5 absolute z-40 right-5 bottom-5 bg-red-700 rounded-full"
        onPress={() => deleteRecord()}>
        <Icon name="trash-bin" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default RoomDetails;
