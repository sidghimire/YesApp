import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LoadingIcon from '../../../components/LoadingIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NativeSearchSelect from '../../../packages/NativeSearchSelect';

import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore/lite';
import {StackActions} from '@react-navigation/native';
const db = getFirestore();
const auth = getAuth();

const OccupiedOrder = ({route, navigation}, props) => {
  const {tableNumber, roomId} = route.params;
  const [tableData, setTableData] = useState();
  const [tableId, setTableId] = useState();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState('0');
  const [discount, setDiscount] = useState('0');

  const getOrderData = async () => {
    setLoading(true);
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'order', companyCode, 'restaurant');
    const q = query(ref, where('tableNumber', '==', tableNumber));
    const snapshot = await getDocs(q);
    let menuData;
    snapshot.forEach(doc => {
      const d = doc.data();
      const data = JSON.parse(d.data);
      setTableData(data);
      menuData = data;
      setTableId(doc.id);
    });
    let price = 0;
    menuData.forEach(data => {
      let i = 0;
      for (i = 0; i < data.length; i++) {
        price =
          price + parseFloat(data[i].quantity) * parseFloat(data[i].basicPrice);
      }
    });
    setTotal(price);
    setLoading(false);
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const checkOutRestaurant = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = doc(db, 'order', companyCode, 'restaurant', tableId);
    const snapshot = await getDoc(ref);
    const data = snapshot.data();
    const ref2 = collection(db, 'history', companyCode, 'restaurant');
    await addDoc(ref2, data);
    await deleteDoc(ref);
    navigation.reset({
      index: 0,
      routes: [{name: 'RestroUser'}],
    });
  };

  if (tableData == null) {
    return (
      <View className="my-auto mx-auto">
        <LoadingIcon />
      </View>
    );
  } else {
    return (
      <View className="flex-1 bg-white p-5">
        <View className="flex flex-row">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
            Checkout Section
          </Text>
        </View>
        <View className="flex flex-row ol mt-10">
          <TextInput
            className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
            placeholder="Room Number: "
            value={'Table No. ' + tableNumber}
            editable={false}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getOrderData} />
          }
          className="flex flex-col my-6">
          <Text className="text-black font-light text-xl mx-2 mb-5">Order</Text>
          {tableData.map((data, index) => {
            let i = 0;
            let price = 0;
            for (i = 0; i < data.length; i++) {
              price =
                price +
                parseFloat(data[i].quantity) * parseFloat(data[i].basicPrice);
            }

            return (
              <View className="flex flex-row p-4 bg-orange-300 my-1 rounded">
                <Text className="font-light text-black ">
                  Order No. :{index + 1}
                </Text>
                <Text className="font-light text-black ml-auto">
                  Rs. {price}
                </Text>
              </View>
            );
          })}
          <View className="flex flex-row p-4 bg-gray-600 mt-10 rounded">
            <View className="flex-1">
              <Text className="font-light text-white ml-auto mr-5">Cost:</Text>
            </View>
            <Text className="font-light text-white ml-auto">Rs. {total}</Text>
          </View>
          <View className="flex flex-row p-4 py-1 bg-gray-600 mt-2 rounded">
            <View className="flex-1">
              <Text className="font-light text-white ml-auto mr-5 my-auto">
                Discount
              </Text>
            </View>
            <TextInput
              keyboardType="numeric"
              placeholder="Amount"
              placeholderTextColor={'#cfcfcf'}
              className=" text-gray-200  h-9 rounded"
              onChangeText={text => setDiscount(parseInt(text))}
              value={discount}
            />
          </View>
          <View className="flex flex-row p-4 bg-green-600 mt-2 rounded">
            <View className="flex-1">
              <Text className="font-light text-white ml-auto mr-5">Total:</Text>
            </View>
            <Text className="font-light text-white ml-auto">
              Rs. {total - discount}
            </Text>
          </View>

          <View className="flex flex-row mt-44 ">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => checkOutRestaurant()}
              className="flex-1 p-4 rounded-xl bg-green-700">
              <Text className="mx-auto my-auto text-white font-light">Pay</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default OccupiedOrder;
