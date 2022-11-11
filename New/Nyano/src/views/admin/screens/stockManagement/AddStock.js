import {View, Text, TouchableOpacity, TextInput, Switch} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VendorSearchSelect from '../../../../packages/VendorSearchSelect';
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();
const AddStock = ({navigation}) => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [vendorList, setVendorList] = useState();
  const [stockList, setStockList] = useState();
  const [selectedVendor, setSelectedVendor] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [reset, setReset] = useState(false);
  const [stockReset, setStockReset] = useState(false);
  const [checkExists, setCheckExists] = useState(false);
  const [stockCheckExists, setStockCheckExists] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error Check');
  const [searching, setSearching] = useState(false);

  const updateProductName = text => {
    setSelectedProduct(text);
  };
  const updateVendorName = text => {
    setSelectedVendor(text);
  };
  const checkExistsFunction = text => {
    setCheckExists(text);
  };
  const stockCheckExistsFunction = text => {
    setStockCheckExists(text);
  };

  const add = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    setShowError(false);
    setSearching(true);
    if (
      selectedProduct != '' &&
      quantity != '' &&
      price != '' &&
      selectedVendor != ''
    ) {
      setLoading(true);
      {
        const ref = collection(db, 'stock', companyCode, 'total');
        const q = query(
          ref,
          where('name', '==', selectedProduct.toLowerCase()),
        );
        const snapshot = await getDocs(q);
        let count = 0;
        snapshot.forEach(async docs => {
          {
            count = count + 1;
            const prev = parseInt(docs.data()['quantity']);
            const q2 = parseInt(quantity);
            const ref = doc(db, 'stock', companyCode, 'total', docs.id);
            const qty = prev + q2;
            await updateDoc(ref, {quantity: qty});
          }
        });
        if (count == 0) {
          const ref = collection(db, 'stock', companyCode, 'total');
          const snapshot = await addDoc(ref, {
            name: selectedProduct.toLowerCase(),
            quantity,
            selectedVendor: selectedVendor.toLowerCase(),
          });
        }
      }

      if (stockCheckExists == false) {
        {
          const ref = collection(db, 'stockList', companyCode, 'list');
          const snapshot = await addDoc(ref, {
            name: selectedProduct.toLowerCase(),
            category: '',
          });
        }
      }
      if (checkExists == false) {
        {
          const ref = collection(db, 'vendor', companyCode, 'vendorsInfo');
          const snapshot = await addDoc(ref, {
            name: selectedVendor.toLowerCase(),
            address: '',
            phone: '',
          });
        }
      }
      if (toggle) {
        const ref2 = collection(db, 'finance', companyCode, 'credit');
        const snapshot = await addDoc(ref2, {
          name: selectedProduct.toLowerCase(),
          quantity,
          price,
          selectedVendor: selectedVendor.toLowerCase(),
        });
      }
      const ref = collection(db, 'stock', companyCode, 'items');
      const snapshot = await addDoc(ref, {
        name: selectedProduct.toLowerCase(),
        quantity,
        price,
        selectedVendor: selectedVendor.toLowerCase(),
      });

      navigation.reset({
        index: 0,
        routes: [{name: 'StockNavigator'}],
      });
    } else {
      setSearching(false);
      setShowError(true);
      setErrorMsg('Please fill in all input');
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
  const getStockList = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'stockList', companyCode, 'list');
    const snapshot = await getDocs(ref);
    const arr = [];
    snapshot.forEach(docs => {
      const doc = docs.data();
      arr.push([docs.id, doc]);
    });
    setStockList(arr);
  };
  useEffect(() => {
    getVendorList();
    getStockList();
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
      <View className="mt-5">
        <VendorSearchSelect
          placeholder="Product Name"
          data={stockList}
          updateName={updateProductName}
          checkExists={stockCheckExistsFunction}
          reset={stockReset}
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
      <View className="mt-5 flex flex-col">
        <DangerError msg={errorMsg} visibility={showError} />
        <LoadingMsg visibility={searching} />
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
