import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import { Context } from '../../../components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const GetNewCompanyInfo1 = ({navigation}) => {
  const [initializing,setInitializing]=useContext(Context)
  const [companyName, setCompanyName] = useState();
  const [registration, setRegistration] = useState();
  const [ownerName, setOwnerName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();

  const uploadCompanyProfile = async () => {
    const rand = Math.random().toString(16).substr(2, 8);
    const userRef = doc(db, 'userProfile', auth.currentUser.uid);
    await updateDoc(userRef, {
      companyCode: rand,
      post:'admin'
    });

    const companyRef = collection(db, 'companyProfile');
    await addDoc(companyRef, {
      companyName: companyName,
      registration: registration,
      ownerName: ownerName,
      address: address,
      admin: auth.currentUser.uid,
      phoneNumber: phoneNumber,
      code:rand
    });

    await AsyncStorage.setItem("companyCode",rand)
    await AsyncStorage.setItem("post","admin")

    setInitializing(1)
  };

  return (
    <View className="flex-1 p-7">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        className="absolute top-3 left-3">
        <Icon
          style={{textAlign: 'center'}}
          name="chevron-back-outline"
          color="#3f3d56"
          size={35}
        />
      </TouchableOpacity>
      <View className="mt-12">
        <Text className="text-black font-extrabold text-5xl mb-8">
          Complete {'\n'}Company Profile
        </Text>
      </View>
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Company Name"
        value={companyName}
        onChangeText={text => setCompanyName(text)}
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Company Registration Number"
        value={registration}
        onChangeText={text => setRegistration(text)}
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={text => setOwnerName(text)}
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Phone Numer"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        className=" rounded-xl h-16 mb-7 mt-20"
        style={{backgroundColor: '#3F3D56'}}
        onPress={uploadCompanyProfile}>
        <Text className="mx-auto my-auto text-white font-light tracking-widest">
          Create Company Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetNewCompanyInfo1;
