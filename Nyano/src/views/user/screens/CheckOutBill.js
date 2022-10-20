import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIcon from '../../../components/LoadingIcon';
const db = getFirestore();
const auth = getAuth();

const OrderRow = props => {
  const {data, index} = props;

  return (
    <View key={index} className="flex flex-row mx-auto">
      <View className="flex flex-row px-5">
        <View className="w-1/6 bg-gray-100 py-1">
          <Text className="text-sm text-center">{index + 1}</Text>
        </View>
        <View className="w-2/6 py-1 border-0 ">
          <Text className="text-sm text-center">{data.foodName}</Text>
        </View>
        <View className="w-1/6 py-1 ">
          <Text className="text-sm text-center">{data.quantity}</Text>
        </View>
        <View className="w-2/6 py-1">
          <Text className="text-sm text-right">{data.basicPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const CheckOutBill = ({navigation, route}) => {
  const {roomNumber} = route.params;
  const [publicInfo, setPublicInfo] = useState();
  const [tableData, setTableData] = useState([]);
  const [roomData, setRoomData] = useState();
  const [numDays, setNumDays] = useState(1);
  const [total, setTotal] = useState('0');
  const [show, setShow] = useState(false);

  const getAssignedData = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'assigned', companyCode, 'room');
    const q = query(ref, where('roomNumber', '==', roomNumber));
    const snapshot = await getDocs(q);
    let menuData;
    snapshot.forEach(docs => {
      const doc = docs.data();
      const data = JSON.parse(doc.data);
      menuData = data;
      setTableData(data);
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
  };

  const getReserveData = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'bookings', companyCode, 'checkIn');
    const q = query(ref, where('roomNumber', '==', roomNumber));
    const snapshot = await getDocs(q);
    snapshot.forEach(datas => {
      const data = datas.data();
      setPublicInfo(data);
      let diff_time = data.checkOut.seconds - data.checkIn.seconds;
      let diff_days = parseInt(diff_time / (3600 * 24));
      if (diff_days == 0) {
        setNumDays(1);
      } else {
        setNumDays(diff_days);
      }
    });

    const ref2 = collection(db, 'roomAdminDB', companyCode, 'hotelRoom');
    const q2 = query(ref2, where('roomNumber', '==', roomNumber));
    const snapshot2 = await getDocs(q2);
    snapshot2.forEach(docs => {
      const doc = docs.data();
      setRoomData(doc);
    });
  };
  useEffect(() => {
    getReserveData();
    getAssignedData();
  }, []);
  if (publicInfo == null || roomData == null) {
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
            Bill And Checkout
          </Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View className="flex flex-row mt-10">
            <TextInput
              className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
              value={'Room Number: ' + roomNumber}
              editable={false}
            />
          </View>
          <View className="flex flex-row mt-5">
            <TextInput
              className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
              value={'Name: ' + publicInfo.customerName}
              editable={false}
            />
          </View>
          <Text className="text-black font-light text-xl mx-2 my-5">
            Hotel Cost
          </Text>
          <View className="flex flex-row p-4 bg-gray-300 my-1 rounded">
            <Text className="font-light text-black ">{roomData.type} Room</Text>
            <Text className="font-light text-black mx-auto ">
              x {numDays} days
            </Text>
            <Text className="font-light text-black ml-auto">
              Rs. {roomData.price} /night
            </Text>
          </View>
          <View className="flex flex-row p-4 border rounded-xl border-orange-200 my-1">
            <Text className="font-light text-black ml-auto ">
              Total Room Cost:
            </Text>

            <Text className="font-light text-black ml-auto">
              Rs. {parseInt(roomData.price) * numDays}
            </Text>
          </View>
          <View className="flex flex-row p-4 border rounded-xl border-orange-200 my-1 ">
            <Text className="font-light text-black ml-auto ">
              Total Food Cost:
            </Text>

            <Text className="font-light text-black ml-auto">Rs. {total}</Text>
          </View>
          <View className="flex flex-row p-4 bg-orange-500 my-1 rounded">
            <Text className="font-light text-white ml-auto ">Grand Total:</Text>

            <Text className="font-light text-white ml-auto">
              Rs. {total + parseInt(roomData.price) * numDays}
            </Text>
          </View>
          <View className="flex flex-row mt-10">
            <TouchableOpacity className="flex-1 p-4 mr-2 rounded-xl bg-red-700">
              <Text className="mx-auto my-auto text-white font-light">
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShow(!show)}
            className="flex flex-row  mx-2 mt-5">
            <Text className="text-black font-light text-xl">Order</Text>
            <Icon
              name="caret-down-outline"
              style={{marginTop: 'auto', marginLeft: 10}}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          {show ? (
            <>
              {tableData.map((data, index) => {
                let i = 0;
                let price = 0;
                let open = true;
                for (i = 0; i < data.length; i++) {
                  price =
                    price +
                    parseFloat(data[i].quantity) *
                      parseFloat(data[i].basicPrice);
                }
                return (
                  <View className="my-4">
                    <View className="flex flex-row p-4 bg-gray-200 my-1 rounded">
                      <Text className="font-light text-black ">
                        Order No. :{index + 1}
                      </Text>
                      <Text className="font-light text-black ml-auto">
                        Rs. {price}
                      </Text>
                    </View>
                    {open ? (
                      <>
                        {data.map((datas, index) => (
                          <OrderRow data={datas} index={index} />
                        ))}
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    );
  }
};

export default CheckOutBill;
