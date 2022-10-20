import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleMenu from '../../../../components/ToogleMenu';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const AdminEditRestaurant = ({navigation, route}) => {
  const {tableNumber} = route.params;
  const [loading, setLoading] = useState(false);
  const deleteRecord = async () => {
    setLoading(true);
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'tableAdminDB', companyCode, 'hotelTable');
    const q = query(ref, where('tableNumber', '==', tableNumber));
    const snapshot = await getDocs(q);
    snapshot.forEach(async docs => {
      const deleteRef = doc(
        db,
        'tableAdminDB',
        companyCode,
        'hotelTable',
        docs.id,
      );
      await deleteDoc(deleteRef);
    });
    navigation.reset({
      index: 0,
      routes: [{name: 'Restaurant'}],
    });
  };
  return (
    <View className="bg-white flex-1 p-5">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={30} color="#000" />
      </TouchableOpacity>
      <TextInput
        className=" border border-gray-400 rounded-xl p-3 pl-5 mt-10"
        placeholder="Room Number: "
        value={'Table Number: ' + tableNumber}
        editable={false}
      />
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

export default AdminEditRestaurant;
