import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import ToggleMenu from '../../../components/ToogleMenu';
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
} from 'firebase/firestore/lite';
import {ScrollView} from 'react-native-gesture-handler';
const db = getFirestore();
const auth = getAuth();

const OrderRow = props => {
  const {data, index, key} = props;
  return (
    <View key={key} className="flex flex-row mx-auto">
      <View className="flex flex-row ">
        <View className="w-1/6 bg-gray-100 py-1">
          <Text className="text-sm text-center">{index + 1}</Text>
        </View>
        <View className="w-2/6 py-1 border-0 ">
          <Text className="text-sm text-center">{data[0]}</Text>
        </View>
        <View className="w-1/6 py-1 ">
          <Text className="text-sm text-center">{data[1]}</Text>
        </View>
        <View className="w-2/6 py-1">
          <Text className="text-sm text-center">{data[2]}</Text>
        </View>
      </View>
    </View>
  );
};

const MakeOrder = ({route, navigation}, props) => {
  const {tableNumber, roomId} = route.params;
  const [foodName, setFoodName] = useState();
  const [foodList, setFoodList] = useState([]);
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [orderList, setOrderList] = useState([]);

  const [refreshing, setRefreshing] = useState(true);
  const [checkExists, setCheckExists] = useState();
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
    setRefreshing(false);
  };
  const updateFoodName = text => {
    setFoodName(text);
  };
  const checkExistsFunction = text => {
    setCheckExists(text);
  };
  const RegisterOneOrder = async () => {
    let basicPrice;
    if (checkExists == true) {
      const companyCode = await AsyncStorage.getItem('companyCode');
      const ref = collection(db, 'hotelMenu', 'foodList', companyCode);
      const q = query(ref, where('foodName', '==', foodName));
      const snapshot = await getDocs(q);
      snapshot.forEach(datas => {
        const data = datas.data();
        basicPrice = parseFloat(data.price);
      });
    } else {
      basicPrice = price;
    }
    if (basicPrice == '' || basicPrice == 0) {
    } else {
      const li = orderList;
      const data = [foodName, quantity, basicPrice];

      setOrderList([...orderList, data]);
    }
  };
  useEffect(() => {
    getMenuData();
  }, []);
  useEffect(() => {}, [orderList]);
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Make Order
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
      <View className="flex flex-col my-6">
        <Text className="text-black font-light text-xl mx-2 mb-5">Order</Text>

        <NativeSearchSelect
          placeholder="Search Food"
          data={foodList}
          updateFoodName={updateFoodName}
          checkExists={checkExistsFunction}
        />
        <TextInput
          className=" border border-gray-400 rounded-xl p-3 pl-5 text-black mt-3"
          placeholder="Quantity "
          keyboardType="numeric"
          value={quantity}
          onChangeText={text => setQuantity(text)}
        />
        {checkExists ? (
          <></>
        ) : (
          <View className="flex flex-row ol mt-3">
            <TextInput
              className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
              placeholder="Price: "
              keyboardType="numeric"
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <TouchableOpacity
          className="bg-green-700 p-3 rounded-full w-10 ml-auto mt-3"
          onPress={RegisterOneOrder}>
          <Icon
            name="add"
            size={16}
            color="#fff"
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          />
        </TouchableOpacity>
        <View className="flex flex-col mt-10 border border-gray-100">
          <View className="flex flex-row border border-gray-200">
            <View className="flex flex-row">
              <View className="w-1/6 bg-gray-100">
                <Text className="text-base text-center">Sn.</Text>
              </View>
              <View className="w-2/6">
                <Text className="text-base text-center">Food Name:</Text>
              </View>
              <View className="w-1/6">
                <Text className="text-base text-center">Quantity</Text>
              </View>
              <View className="w-2/6 bg">
                <Text className="text-base text-center">Price</Text>
              </View>
            </View>
          </View>
          {orderList.length == 0 ? (
            <></>
          ) : (
            <ScrollView className="h-48">
              {orderList.map((data, index) => {
                return <OrderRow key={index} data={data} index={index} />;
              })}
            </ScrollView>
          )}
        </View>
        <View className="flex flex-row mt-10">
          <TouchableOpacity className="flex-1 p-4 mr-2 rounded-xl bg-green-700">
            <Text className="mx-auto my-auto text-white font-light">
              Send To Kitchen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 p-4 ml-2 rounded-xl border border-green-700">
            <Text className="mx-auto my-auto text-green-700 font-light">
              Reserve
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MakeOrder;
