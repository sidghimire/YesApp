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
} from 'firebase/firestore/lite';
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

const OccupiedOrder = ({route, navigation}, props) => {
  const {tableNumber, roomId} = route.params;
  const [tableData, setTableData] = useState();
  const [tableId, setTableId] = useState();
  const [loading, setLoading] = useState(true);
  const getOrderData = async () => {
    setLoading(true);
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'order', companyCode, 'restaurant');
    const q = query(ref, where('tableNumber', '==', tableNumber));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      const d = doc.data();
      const data = JSON.parse(d.data);
      setTableData(data);
      setTableId(doc.id);
    });
    setLoading(false);
  };
  const fun1=()=>{
    
    navigation.navigate('AddToRoom', {
      tableNumber: tableNumber,
      tableData:tableData,
      tableId:tableId
    })
  }
  useEffect(() => {
    getOrderData();
  }, []);


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
            Adjust Order
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
            let open = true;
            for (i = 0; i < data.length; i++) {
              price =
                price +
                parseFloat(data[i].quantity) * parseFloat(data[i].basicPrice);
            }
            return (
              <View className="my-4">
                <TouchableOpacity className="flex flex-row p-4 bg-orange-300 my-1 rounded">
                  <Text className="font-light text-black ">
                    Order No. :{index + 1}
                  </Text>
                  <Text className="font-light text-black ml-auto">
                    Rs. {price}
                  </Text>
                </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() =>{console.log(tableData);
              navigation.navigate('AddMoreOrder', {
                tableNumber: tableNumber,
                tableId: tableId,
                tableData:tableData
              })
            }
            }
            className=" p-4 mr-2 rounded-xl border border-green-700 mt-10">
            <Text className="mx-auto my-auto text-green-700 font-light">
              Add More Order
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row mt-20">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('CheckOutRestaurant', {
                  tableNumber: tableNumber,
                })
              }
              className="flex-1 p-4 mr-2 rounded-xl bg-green-700">
              <Text className="mx-auto my-auto text-white font-light">
                Checkout Restaurant
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>fun1()
                
              }
              className="flex-1 p-4 ml-2 rounded-xl border border-green-700">
              <Text className="mx-auto my-auto text-green-700 font-light">
                Add To Room
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default OccupiedOrder;
