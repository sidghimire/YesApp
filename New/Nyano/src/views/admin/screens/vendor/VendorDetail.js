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
  collection,
  getDoc,
  getDocs,
  getFirestore,
  where,
  query,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
const db = getFirestore();
const VendorDetail = ({navigation, route}) => {
  const {vendorId, vendorData} = route.params;
  const [show, setShow] = useState(false);
  const [creditList, setCreditList] = useState([]);
  const [totalCost, setTotalCost] = useState();

  const deleteRecord = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');

    const ref = doc(db, 'vendor', companyCode, 'vendorsInfo', vendorId);
    const ref2 = collection(db, 'vendor', companyCode, 'vendorsHistory');
    await addDoc(ref2, {vendorId, vendorData});

    const ref3 = collection(db, 'finance', companyCode, 'credit');
    const q = query(ref3, where('selectedVendor', '==', vendorData.name));
    const snapshot = await getDocs(q);
    snapshot.forEach(async docs => {
      const doc1 = docs.data();
      const ref3 = collection(db, 'finance', companyCode, 'creditHistory');
      const ref4 = doc(db, 'finance', companyCode, 'credit', docs.id);
      await addDoc(ref3, {vendorId, doc1});
      await deleteDoc(ref4);
    });
    await deleteDoc(ref);

    navigation.reset({
      index: 0,
      routes: [{name: 'VendorStack'}],
    });
  };

  const getVendorCredit = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'finance', companyCode, 'credit');
    const q = query(ref, where('selectedVendor', '==', vendorData.name));
    const snapshot = await getDocs(q);
    const arr = [];
    let total = 0;
    snapshot.forEach(docs => {
      const doc = docs.data();
      arr.push([docs.id, doc]);
      total = total + parseFloat(doc.price) * parseFloat(doc.quantity);
    });
    setTotalCost(total);
    setCreditList(arr);
  };

  const payByFull = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'finance', companyCode, 'credit');
    const ref2 = collection(db, 'finance', companyCode, 'creditHistory');
    const q = query(ref, where('selectedVendor', '==', vendorData.name));
    const snapshot = await getDocs(q);
    const arr = [];
    snapshot.forEach(async docs => {
      const doc1 = docs.data();
      const ref3 = doc(db, 'finance', companyCode, 'credit', docs.id);
      await addDoc(ref2, {vendorId, doc1});
      await deleteDoc(ref3);
    });

    navigation.reset({
      index: 0,
      routes: [{name: 'VendorStack'}],
    });
  };
  useEffect(() => {
    getVendorCredit();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Vendor Detail
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          value={vendorData.name}
          editable={false}
        />
      </View>
      <View className="flex flex-row mt-2">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          value={vendorData.address}
          editable={false}
        />
      </View>
      <View className="flex flex-row mt-2">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          value={vendorData.phone}
          editable={false}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShow(!show)}
        className="flex flex-row  mx-2 mt-5">
        <Text className="text-black font-light text-xl">Order</Text>
        {show ? (
          <Icon
            name="caret-up-outline"
            style={{marginTop: 'auto', marginLeft: 10}}
            size={20}
            color="#000"
          />
        ) : (
          <Icon
            name="caret-down-outline"
            style={{marginTop: 'auto', marginLeft: 10}}
            size={20}
            color="#000"
          />
        )}
      </TouchableOpacity>
      {show ? (
        <>
          <View className="flex flex-row mt-5">
            <View className="flex flex-row border border-gray-100">
              <View className="w-1/6 bg-gray-100 py-2">
                <Text className="text-base text-center">Sn.</Text>
              </View>
              <View className="w-2/6 py-2">
                <Text className="text-base text-center">Food Name:</Text>
              </View>
              <View className="w-1/6 py-2 border-gray-100">
                <Text className="text-base text-center">Quantity</Text>
              </View>
              <View className="w-2/6 py-2">
                <Text className="text-base text-center">Price</Text>
              </View>
            </View>
          </View>
          <ScrollView className="">
            {creditList.map((data, index) => {
              return (
                <View className="flex flex-row">
                  <View className="w-1/6 bg-gray-100 py-2">
                    <Text className="text-base text-center">{index + 1}</Text>
                  </View>
                  <View className="w-2/6 py-2">
                    <Text className="text-base text-center">
                      {data[1].name}
                    </Text>
                  </View>
                  <View className="w-1/6 py-2">
                    <Text className="text-base text-center">
                      {data[1].quantity}
                    </Text>
                  </View>
                  <View className="w-2/6 bg py-2">
                    <Text className="text-base text-center">
                      {data[1].price}
                    </Text>
                  </View>
                </View>
              );
            })}
            <View className="flex flex-row mt-5">
              <View className="flex flex-row border border-gray-100">
                <View className="w-1/6 py-2"></View>
                <View className="w-2/6 py-2"></View>
                <View className="w-1/6 py-2 border-gray-100">
                  <Text className="text-base text-center">Total</Text>
                </View>
                <View className="w-2/6 py-2">
                  <Text className="text-base text-center">Rs. {totalCost}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              className="flex-1 p-4 mr-2 rounded-xl bg-green-700"
              onPress={payByFull}>
              <Text className="mx-auto my-auto text-white font-light">Pay</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      ) : (
        <></>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        className=" p-5 absolute z-40 right-5 bottom-5 bg-red-700 rounded-full"
        onPress={() => deleteRecord()}>
        <Icon name="trash-bin" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default VendorDetail;
