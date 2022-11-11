import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
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
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const Employees = ({navigation}) => {
  const [searchText, setSearchText] = useState();
  const [roomData, setRoomData] = useState([]);
  const [roomData2, setRoomData2] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchArray = text => {
    setSearchText(text);
    let len = text.length;
    const arr = [];
    roomData2.forEach(doc => {
      if (doc[1].name.substring(0, len).toLowerCase() == text.toLowerCase()) {
        arr.push(doc);
      }
    });
    setRoomData(arr);
  };

  const getUserData = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref2 = collection(db, 'userProfile');
    const q = query(ref2, where('companyCode', '==', companyCode));
    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach(doc => {
      if (doc.data()['post'] != 'admin') {
        data.push([doc.id, doc.data()]);
      }
    });
    setRoomData(data);
    setRoomData2(data);
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <ToggleMenu navigation={navigation} />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Employees
        </Text>
      </View>
      <View className="flex flex-row bg-gray-100 rounded-xl p-1 pl-5 mb-5 mt-10">
        <Icon
          name="search-outline"
          size={20}
          color="#bfbfbf"
          style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 10}}
        />
        <TextInput
          value={searchText}
          onChangeText={text => searchArray(text)}
          placeholder="Search for room number: "
          className="flex-1"
        />
      </View>
      <Text className="text-black font-light text-2xl mt-2 ml-2 mb-5">
        User List
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getUserData} />
        }>
        <View className="flex flex-col">
          {roomData.map(data => {
            return (
              <View className="border border-gray-300 rounded-xl m-1 p-5 flex flex-row">
                <Text className=" my-auto flex-1">{data[1].name}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('UpdateEmployees', {userData: data})
                  }>
                  <Icon name="body-outline" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Employees;
