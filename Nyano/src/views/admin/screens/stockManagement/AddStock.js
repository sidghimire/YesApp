import {View, Text, TouchableOpacity, TextInput, Switch} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VendorSearchSelect from '../../../../packages/VendorSearchSelect';

const db = getFirestore();
const AddStock = ({navigation}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [vendorList, setVendorList] = useState();
  const [selectedVendor, setSelectedVendor] = useState();
  const [checkExists, setCheckExists] = useState(false);
  const [reset, setReset] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateVendorName = text => {
    setSelectedVendor(text);
  };
  const checkExistsFunction = text => {
    setCheckExists(text);
  };

  const add = async () => {
    setLoading(true);
    const companyCode = await AsyncStorage.getItem('companyCode');

    if (name != '' && quantity != '' && price != '' && selectedVendor != '') {
      if (toggle) {
        const ref2 = collection(db, 'finance', companyCode, 'credit');
        const snapshot = await addDoc(ref2, {
          name,
          quantity,
          price,
          selectedVendor,
        });
      }
      const ref = collection(db, 'stock', companyCode, 'items');
      const snapshot = await addDoc(ref, {
        name,
        quantity,
        price,
        selectedVendor,
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'StockNavigator'}],
      });
    }
  };

  const getVendorList = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'vendor', companyCode, 'vendorsInfo');
    const snapshot = await getDocs(ref);
    const arr = [];
    snapshot.forEach(docs => {
      const doc = docs.data();
      arr.push([docs.id, doc]);
    });
    setVendorList(arr);
  };

  useEffect(() => {
    getVendorList();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Add Stock
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Product Name: "
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View className="flex flex-row mt-5">
        <TextInput
          keyboardType="numeric"
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Quantity: "
          value={quantity}
          onChangeText={text => setQuantity(text)}
        />
      </View>
      <View className="flex flex-row mt-5">
        <TextInput
          keyboardType="numeric"
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Price: "
          value={price}
          onChangeText={text => setPrice(text)}
        />
      </View>
      <View className="mt-5">
        <VendorSearchSelect
          placeholder="Search Vendor"
          data={vendorList}
          updateName={updateVendorName}
          checkExists={checkExistsFunction}
          reset={reset}
        />
      </View>
      <View className="flex flex-row mt-8">
        <Text className="text-black font-light text-2xl ml-2 mb-2 my-auto">
          Credit
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#40A372'}}
          thumbColor={toggle ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setToggle(!toggle)}
          value={toggle}
          className=" my-auto ml-10"
          style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
        />
      </View>

      <View className="flex flex-row mt-5">
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={loading}
          onPress={add}
          className="flex-1 bg-orange-600 rounded-xl p-4 mt-5 ">
          <Text className="text-center text-white font-light ">Add Stock</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddStock;
