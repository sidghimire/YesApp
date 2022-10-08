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


const db = getFirestore();
const auth = getAuth();

const RestroUser = ({navigation}) => {
  const [companyId, setCompanyId] = useState();
  const [tableData, setTableData] = useState([]);
  const getTableData = async () => {
    const companyCode=await AsyncStorage.getItem('companyCode')
    const ref2 = collection(db, 'companyProfile');
    const q2 = query(ref2, where('code', '==', companyCode));
    const receivedData2 = await getDocs(q2);

    receivedData2.forEach(async doc => {
      const ref = collection(db, 'tableAdminDB');
      const q = query(ref, where('companyId', '==', doc.id));
      const snapshot = await getDocs(q);
      let data = [];
      snapshot.forEach(doc => {
        data.push([doc.id, doc.data()]);
      });
      setTableData(data);
    });
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
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-l-xl p-3 pl-5"
          placeholder="Table Number: "
        />
        <TouchableOpacity className="bg-black rounded-r-xl p-3 w-16 ">
          <Icon
            name="search"
            size={20}
            color="#fff"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        </TouchableOpacity>
      </View>
      <Text className="text-black font-light text-2xl mt-5 ml-2 mb-2">
        Table List
      </Text>
      <View className="flex flex-row pl-5" style={{flexWrap: 'wrap'}}>
        {tableData.map(data => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              className="border border-gray-300 rounded-xl w-16 h-16 m-2">
              <Text className="mx-auto my-auto">{data[1].tableNumber}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddRoom')}
        activeOpacity={0.7}
        className="absolute bg-white rounded-full bottom-6 right-6">
        <Icon name="add-circle" size={80} color="#fa594e" />
      </TouchableOpacity>
    </View>
  );
};

export default RestroUser;