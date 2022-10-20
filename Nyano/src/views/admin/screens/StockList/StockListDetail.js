import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  where,
  query,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();
const StockListDetail = ({navigation, route}) => {
  const {vendorId, vendorData} = route.params;
  const [name, setName] = useState(vendorData.name);
  const [category, setCategory] = useState(vendorData.category);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error Check');
  const [searching, setSearching] = useState(false);

  const payByFull = async () => {
    setShowError(false);
    setSearching(true);
    if (name != '' && category != '') {
      const companyCode = await AsyncStorage.getItem('companyCode');

      const ref = collection(db, 'stockList', companyCode, 'list');
      const q = query(ref, where('name', '==', name.toLowerCase()));
      const snapshot2 = await getDocs(q);
      let size = 0;
      snapshot2.forEach(docs => {
        size = size + 1;
      });
      if (size == 0) {
        const ref = doc(db, 'stockList', companyCode, 'list', vendorId);
        await updateDoc(ref, {name: name, category: category});
        navigation.reset({
          index: 0,
          routes: [{name: 'StockListNavigator'}],
        });
      } else {
        setSearching(false);
        setShowError(true);
        setErrorMsg('Stock with the same name already exists.');
      }
    } else {
      setSearching(false);
      setShowError(true);
      setErrorMsg('Please fill in all input');
    }
  };
  const deleteRecord = async () => {
    setShowError(false);
    setSearching(true);
    const companyCode = await AsyncStorage.getItem('companyCode');

    const ref = doc(db, 'stockList', companyCode, 'list', vendorId);
    await deleteDoc(ref);
    navigation.reset({
      index: 0,
      routes: [{name: 'StockListNavigator'}],
    });
  };
  useEffect(() => {}, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Basic Item Detail
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          value={name}
          placeholder="Stock Name"
          onChangeText={text => setName(text)}
        />
      </View>
      <View className="flex flex-row mt-2">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          value={category}
          placeholder="Category"
          onChangeText={text => setCategory(text)}
        />
      </View>
      <View className="mt-5 flex flex-col">
        <DangerError msg={errorMsg} visibility={showError} />
        <LoadingMsg visibility={searching} />
      </View>
      <TouchableOpacity
        disabled={loading}
        className="p-4 mt-10 rounded-xl bg-green-700"
        onPress={payByFull}>
        <Text className="mx-auto my-auto text-white font-light">Update</Text>
      </TouchableOpacity>
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

export default StockListDetail;
