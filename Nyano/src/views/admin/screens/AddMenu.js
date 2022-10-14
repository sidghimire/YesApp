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
import LoadingIcon from '../../../components/LoadingIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const AddMenu = ({navigation}) => {
  const [roomNumber, setRoomNumber] = useState();
  const [type, setType] = useState();
  const [category, setCategory] = useState([]);
  const [foodName, setFoodName] = useState();
  const [price, setPrice] = useState();
  const [companyCode, setCompanyCode] = useState();

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
  const getCompanyCode=async()=>{
    const code=await AsyncStorage.getItem('companyCode')
    setCompanyCode(code)
  }
  const uploadValue = async() => {
    if(type!="" && foodName!="" && price!=""){
      const ref=collection(db, "hotelMenu",'foodList',companyCode)
      
      await addDoc(ref,{
        foodName: foodName,
        price: price,
        category: type,
      })
    }
    navigation.goBack()
  };

  useEffect(() => {
    getCategory();
    getCompanyCode();
  }, []);

  if (category.length == 0) {
    return <LoadingIcon />;
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
        <View className="flex flex-row mt-16">
          <TouchableOpacity
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