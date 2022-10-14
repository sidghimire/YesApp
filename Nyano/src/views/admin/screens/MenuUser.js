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

const MenuUser = ({navigation}) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const getMenuData = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'hotelMenu', 'foodList', companyCode);
    const snapshot = await getDocs(ref);
    const foodArray = [];

    snapshot.forEach(datas => {
      const data = datas.data();
      foodArray.push(data);
    });
    setFoodList(foodArray);
  };

  useEffect(() => {
    getMenuData();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <ToggleMenu navigation={navigation} />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Menu
        </Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getMenuData} />
        }>
        <View className="flex flex-row bg-gray-100 mt-5 rounded-xl p-1 pl-5 mb-5">
          <Icon
            name="search-outline"
            size={20}
            color="#bfbfbf"
            style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 10}}
          />
          <TextInput className="  " placeholder="Search for a product: " />
        </View>
        <View className="flex flex-row" style={{flexWrap: 'wrap'}}>
          <View
            className="mx-auto flex flex-row w-full"
            style={{flexWrap: 'wrap'}}>
            {foodList.map(data => {
              return (
                <View className="w-1/3">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="border border-gray-300 rounded-xl w-24 h-24 mx-auto mt-5 p-4 flex flex-col">
                    <Text className="text-base font-medium">
                      {data.foodName}
                    </Text>
                    <Text className="font-light my-auto text-sm">{(data.category).charAt(0).toUpperCase() + (data.category).slice(1)}</Text>

                    <View className="flex flex-row mt-auto">
                      <Text className="font-light my-auto text-base">$</Text>
                      <Text className="text-base font-light my-auto ml-2">
                        {data.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddMenu')}
        activeOpacity={0.7}
        className="absolute bg-white rounded-full bottom-6 right-6">
        <Icon name="add-circle" size={80} color="#fa594e" />
      </TouchableOpacity>
    </View>
  );
};

export default MenuUser;
