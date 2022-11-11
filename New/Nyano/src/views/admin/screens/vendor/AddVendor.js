import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addDoc,
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();
const AddVendor = ({navigation}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error Check');
  const [searching, setSearching] = useState(false);

  const add = async () => {
    setShowError(false);
    setSearching(true);
    if (name != '' && address != '' && phone != '') {
      setLoading(true);
      const companyCode = await AsyncStorage.getItem('companyCode');
      const ref = collection(db, 'vendor', companyCode, 'vendorsInfo');
      const q = query(ref, where('name', '==', name.toLowerCase()));
      const snapshot2 = await getDocs(q);
      let size = 0;
      snapshot2.forEach(docs => {
        size = size + 1;
      });
      if (size == 0) {
        setLoading(true);

        const snapshot = await addDoc(ref, {
          name: name.toLowerCase(),
          address,
          phone,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'VendorStack'}],
        });
      } else {
        setSearching(false);
        setShowError(true);
        setErrorMsg('Vendor Name Already Exists');
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
          Add Vendor
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Vendor Name: "
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View className="flex flex-row mt-5">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Vendor Address: "
          value={address}
          onChangeText={text => setAddress(text)}
        />
      </View>
      <View className="flex flex-row mt-5">
        <TextInput
          keyboardType="numeric"
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Vendor Phone: "
          value={phone}
          onChangeText={text => setPhone(text)}
        />
      </View>
      <View className="mt-5 flex flex-col">
        <DangerError msg={errorMsg} visibility={showError} />
        <LoadingMsg visibility={searching} />
      </View>
      <View className="flex flex-row mt-5">
        <TouchableOpacity
          disabled={loading}
          onPress={add}
          className="flex-1 bg-orange-600 rounded-xl p-4 mt-5 ">
          <Text className="text-center text-white font-light ">Add Vendor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddVendor;
