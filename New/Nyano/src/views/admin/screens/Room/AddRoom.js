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
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();
const auth = getAuth();

const AddRoom = ({navigation}) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error Check');
  const [searching, setSearching] = useState(false);

  const uploadValue = async () => {
    setShowError(false);
    setSearching(true);
    if (roomNumber != '' && type != '' && price != '') {
      const companyCode = await AsyncStorage.getItem('companyCode');
      const ref = collection(db, 'roomAdminDB', companyCode, 'hotelRoom');
      const repeatRef = collection(db, 'roomAdminDB', companyCode, 'hotelRoom');
      const q = query(repeatRef, where('roomNumber', '==', roomNumber));
      const snapshot2 = await getDocs(q);
      let size = 0;
      snapshot2.forEach(docs => {
        size = size + 1;
      });
      if (size == 0) {
        setLoading(true);
        const snapshot = await addDoc(ref, {
          admin: auth.currentUser.uid,
          roomNumber: roomNumber,
          type: type,
          price: price,
          companyId: companyCode,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Rooms'}],
        });
      } else {
        setSearching(false);
        setShowError(true);
        setErrorMsg('Room Already Exists');
      }
    } else {
      setSearching(false);
      setShowError(true);
      setErrorMsg('Please fill in all input');
    }
  };

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Add Room
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Room Number: "
          value={roomNumber}
          onChangeText={text => setRoomNumber(text)}
        />
      </View>
      <View className="border border-gray-400 rounded-xl mt-5 ">
        <Picker
          style={{fontSize: 10}}
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
          <Picker.Item label="Type of room" value="" color="#afafaf" />
          <Picker.Item label="Premium" value="Premium" color="#000" />
          <Picker.Item label="Regular" value="Regular" color="#000" />
        </Picker>
      </View>
      <View className="flex flex-row mt-5">
        <TextInput
          keyboardType="numeric"
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Price: "
          value={price}
          onChangeText={text => setPrice(text)}
        />
      </View>
      <View className="mt-5 flex flex-col">
        <DangerError msg={errorMsg} visibility={showError} />
        <LoadingMsg visibility={searching} />
      </View>
      <View className="flex flex-row mt-16">
        <TouchableOpacity
          disabled={loading}
          activeOpacity={0.7}
          className="bg-black rounded-full flex-1 p-4"
          onPress={uploadValue}>
          <Text className="text-white text-center tracking-widest">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRoom;
