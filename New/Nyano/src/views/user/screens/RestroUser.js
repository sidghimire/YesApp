import {View, Text, TextInput, TouchableOpacity} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';

const db = getFirestore();
const auth = getAuth();

const RestroUser = ({navigation}) => {
  const [tableData, setTableData] = useState([]);
  const [occupiedTable, setOccupiedTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTableData = async () => {
    setLoading(true);
    const occupiedTable = [];
    {
      const companyCode = await AsyncStorage.getItem('companyCode');
      const ref = collection(db, 'order', companyCode, 'restaurant');
      const snapshot = await getDocs(ref);
      let data = [];
      snapshot.forEach(docs => {
        data.push([docs.id, docs.data()]);
        occupiedTable.push(docs.data().tableNumber);
      });
      setOccupiedTable(data);
    }
    {
      setLoading(true);
      const companyCode = await AsyncStorage.getItem('companyCode');
      const ref = collection(db, 'tableAdminDB', companyCode, 'hotelTable');
      let q = ref;
      if (occupiedTable.length != 0) {
        q = query(ref, where('tableNumber', 'not-in', occupiedTable));
      }
      const snapshot = await getDocs(q);
      let data = [];
      snapshot.forEach(doc => {
        data.push([doc.id, doc.data()]);
      });
      setTableData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <ToggleMenu navigation={navigation} />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Restaurant
        </Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getTableData} />
        }>
        <Text className="text-black font-light text-xl mt-5 ml-2 mb-2">
          Empty Table
        </Text>
        <View className="flex flex-row pl-5" style={{flexWrap: 'wrap'}}>
          {tableData.map(data => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MakeOrder', {
                    tableNumber: data[1].tableNumber,
                  });
                }}
                activeOpacity={0.7}
                className="border border-gray-300 rounded-xl w-16 h-16 m-2">
                <Text className="mx-auto my-auto">{data[1].tableNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text className="text-black font-light text-xl mt-5 ml-2 mb-2">
          Occupied Table
        </Text>
        <View className="flex flex-row pl-5" style={{flexWrap: 'wrap'}}>
          {occupiedTable.map(data => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OccupiedOrder', {
                    tableNumber: data[1].tableNumber,
                  });
                }}
                activeOpacity={0.7}
                className="bg-yellow-600 rounded-xl w-16 h-16 m-2">
                <Text className="mx-auto text-white my-auto">
                  {data[1].tableNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestroUser;
