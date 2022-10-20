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
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const Restaurant = ({navigation}) => {
  const [searchText, setSearchText] = useState();
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchArray = text => {
    setSearchText(text);
    let len = text.length;
    const arr = [];
    tableData2.forEach(doc => {
      if (
        doc[1].tableNumber.substring(0, len).toLowerCase() == text.toLowerCase()
      ) {
        arr.push(doc);
      }
    });
    setTableData(arr);
  };

  const getTableData = async () => {
    setLoading(true);
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'tableAdminDB', companyCode, 'hotelTable');
    const snapshot = await getDocs(ref);
    let data = [];
    snapshot.forEach(doc => {
      data.push([doc.id, doc.data()]);
    });
    setTableData(data);
    setTableData2(data);
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
          placeholder="Search for table number: "
          className="flex-1"
        />
      </View>
      <Text className="text-black font-light text-2xl mt-5 mb-10 ml-2 ">
        Table List
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getTableData} />
        }>
        <View className="flex flex-row pl-5" style={{flexWrap: 'wrap'}}>
          {tableData.map(data => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AdminEditRestaurant', {
                    tableNumber: data[1].tableNumber,
                  })
                }
                activeOpacity={0.7}
                className="border border-gray-300 rounded-xl w-16 h-16 m-2">
                <Text className="mx-auto my-auto">{data[1].tableNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddTable')}
        activeOpacity={0.7}
        className="absolute bg-white rounded-full bottom-6 right-6">
        <Icon name="add-circle" size={80} color="#fa594e" />
      </TouchableOpacity>
    </View>
  );
};

export default Restaurant;
