import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import LoadingIcon from '../../../../components/LoadingIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();
const auth = getAuth();

const AddMenu = ({navigation}) => {
  const [roomNumber, setRoomNumber] = useState();
  const [type, setType] = useState('');
  const [category, setCategory] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error Check');
  const [searching, setSearching] = useState(false);

  const getCategory = async () => {
    const ref = doc(db, 'menu', 'menuCategory');
    const receiveData = await getDoc(ref);
    if (receiveData.exists()) {
      let categoryList = [];
      const categoryArray = [];
      categoryList = receiveData.data();
      let lenCategory = Object.keys(categoryList).length;
      for (let i = 0; i < lenCategory; i++) {
        categoryArray.push(categoryList[i]);
      }
      setCategory(categoryArray);
    }
  };

  const uploadValue = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    setShowError(false);
    setSearching(true);
    if (type != '' && foodName != '' && price != '') {
      const ref = collection(db, 'hotelMenu', companyCode, 'foodList');
      const q = query(ref, where('foodName', '==', foodName.toLowerCase()));
      const snapshot2 = await getDocs(q);
      let size = 0;
      snapshot2.forEach(docs => {
        size = size + 1;
      });
      if (size == 0) {
        setLoading(true);
        await addDoc(ref, {
          foodName: foodName.toLowerCase(),
          price: price,
          category: type,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'MenuUser'}],
        });
      } else {
        setSearching(false);
        setShowError(true);
        setErrorMsg('Room Already Exists');
      }
    } else {
      setSearching(false);
      setShowError(true);
      setErrorMsg('Please fill in all input');
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  if (category.length == 0) {
    return (
      <View className="bg-white flex-1">
        <View className="my-auto">
          <LoadingIcon />
        </View>
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
            Add Menu
          </Text>
        </View>

        <View className="flex flex-row">
          <View className="border border-gray-400 rounded-xl mt-5 flex-1 ">
            <Picker
              style={{fontSize: 10}}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="Category" value="" color="#afafaf" />
              {category.map(cat => {
                if (cat != '') {
                  return (
                    <Picker.Item
                      label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                      value={cat}
                      color="#000"
                    />
                  );
                }
              })}
            </Picker>
          </View>
        </View>

        <View className="flex flex-col">
          <TextInput
            className=" border border-gray-400 mt-5 rounded-xl p-3 pl-5"
            placeholder="Food Name: "
            value={foodName}
            onChangeText={text => setFoodName(text)}
          />
        </View>
        <View className="flex flex-col">
          <TextInput
            keyboardType="numeric"
            className=" border border-gray-400 mt-5 rounded-xl p-3 pl-5"
            placeholder="Price: "
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </View>
        <View className="mt-5 flex flex-col">
          <DangerError msg={errorMsg} visibility={showError} />
          <LoadingMsg visibility={searching} />
        </View>
        <View className="flex flex-row mt-16">
          <TouchableOpacity
            disabled={loading}
            activeOpacity={0.7}
            className="bg-black rounded-full flex-1 p-4"
            onPress={uploadValue}>
            <Text className="text-white text-center tracking-widest">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default AddMenu;
