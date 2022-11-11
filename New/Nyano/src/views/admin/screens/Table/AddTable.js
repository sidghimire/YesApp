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
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();
const auth = getAuth();

const AddTable = ({navigation}) => {
  const [tableNumber, setTableNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error Check');
  const [searching, setSearching] = useState(false);
  const addTable = async () => {
    setShowError(false);
    setSearching(true);
    if (tableNumber != '') {
      const companyCode = await AsyncStorage.getItem('companyCode');
      const repeatRef = collection(
        db,
        'tableAdminDB',
        companyCode,
        'hotelTable',
      );
      const q = query(repeatRef, where('tableNumber', '==', tableNumber));
      const snapshot2 = await getDocs(q);
      let size = 0;
      snapshot2.forEach(docs => {
        size = size + 1;
      });
      if (size == 0) {
        setLoading(true);
        const ref = collection(db, 'tableAdminDB', companyCode, 'hotelTable');
        const snapshot = await addDoc(ref, {
          admin: auth.currentUser.uid,
          tableNumber: tableNumber,
          companyId: companyCode,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Restaurant'}],
        });
      } else {
        setSearching(false);
        setShowError(true);
        setErrorMsg('Table Number Already Exists');
      }
    } else {
      setSearching(false);
      setShowError(true);
      setErrorMsg('Please Enter Table Number');
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
      <View className="mt-5 flex flex-col">
        <DangerError msg={errorMsg} visibility={showError} />
        <LoadingMsg visibility={searching} />
      </View>
      <View className="flex flex-row mt-16">
        <TouchableOpacity
          disabled={loading}
          activeOpacity={0.7}
          className="bg-black rounded-full flex-1 p-4"
          onPress={addTable}>
          <Text className="text-white text-center tracking-widest">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTable;
