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

const db = getFirestore();
const auth = getAuth();

const AddRoom = ({navigation}) => {
  const [roomNumber, setRoomNumber] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [companyId, setCompanyId] = useState();

  const uploadValue = async () => {
    if (roomNumber != '' && type != '' && price != '') {
      const ref = collection(db, 'roomAdminDB');

      const ref2 = collection(db, 'companyProfile');
      const q2 = query(ref2, where('admin', '==', auth.currentUser.uid));
      const receivedData2 = await getDocs(q2);
      receivedData2.forEach(doc => {
        setCompanyId(doc.id);
      });
      const snapshot = await addDoc(ref, {
        admin: auth.currentUser.uid,
        roomNumber: roomNumber,
        type: type,
        price: price,
        companyId: companyId,
      });
      navigation.goBack()
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
      <View className="flex flex-row mt-16">
        <TouchableOpacity
          className="bg-black rounded-full flex-1 p-4"
          onPress={uploadValue}>
          <Text className="text-white text-center tracking-widest">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRoom;
