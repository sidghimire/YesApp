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
import ToggleMenu from '../../../components/ToogleMenu';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const AdminEditRestaurant = ({navigation, route}) => {
  const {tableNumber} = route.params;
  return (
    <View className="bg-white flex-1 p-5">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={30} color="#000" />
      </TouchableOpacity>
      <TextInput
          className=" border border-gray-400 rounded-xl p-3 pl-5 mt-10"
          placeholder="Room Number: "
          value={'Table Number: '+ tableNumber}
          editable={false}
        />
    </View>
  );
};

export default AdminEditRestaurant;
