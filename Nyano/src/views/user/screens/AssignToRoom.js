import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIcon from '../../../components/LoadingIcon';
const db = getFirestore();
const auth = getAuth();

const AssignToRoom = ({navigation, route}) => {
  const {roomNumber,tableNumber,tableData,tableId} = route.params;
  const [publicInfo, setPublicInfo] = useState();
  const getReserveData = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'bookings', companyCode, 'checkIn');
    const q = query(ref, where('roomNumber', '==', roomNumber));
    const snapshot = await getDocs(q);
    snapshot.forEach(datas => {
      const data = datas.data();
      setPublicInfo(data);
    });
  };
  useEffect(() => {
    getReserveData();
  }, []);
  

  const assign=async()=>{
    const companyCode=await AsyncStorage.getItem('companyCode')
    const ref=collection(db,'assigned',companyCode,'room')
    let data=JSON.stringify(tableData)
    await addDoc(ref,{data,roomNumber,tableNumber})
    const ref2 = doc(db, 'order', companyCode, 'restaurant', tableId);
    await deleteDoc(ref2);
    navigation.reset({
        index: 0,
        routes: [{name: 'RestroUser'}],
      });
    //await addDoc(ref,)
  }
  if (publicInfo == null) {
    return (
      <View className="my-auto mx-auto">
        <LoadingIcon />
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-white p-5">
        <View className="flex flex-row">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
            Assign To Room
          </Text>
        </View>
        <View className="flex flex-row mt-10">
          <TextInput
            className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
            value={'Room Number: ' + roomNumber}
            editable={false}
          />
        </View>
        <View className="flex flex-row mt-5">
          <TextInput
            className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
            value={'Name: ' + publicInfo.customerName}
            editable={false}
          />
        </View>
        <View className="flex flex-row mt-5">
          <TextInput
            className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
            value={'Phone Number:    ' + publicInfo.customerPhone}
            editable={false}
          />
        </View>
        
        <View className="flex flex-row mt-20">
          <TouchableOpacity
          onPress={()=>assign()}
            className="flex-1 p-4 mr-2 rounded-xl bg-green-700">
            <Text className="mx-auto my-auto text-white font-light">
              Save Order To Room
            </Text>
          </TouchableOpacity>
         
        </View>
      </View>
    );
  }
};

export default AssignToRoom;
