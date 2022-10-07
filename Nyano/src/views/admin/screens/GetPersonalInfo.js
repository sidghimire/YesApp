import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationAction} from '@react-navigation/native';
import {getFirestore, setDoc, doc} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();
const db = getFirestore();

const GetPersonalInfo = ({navigation}) => {
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const joinWithCode = async () => {
    const codeRef = doc(db, 'userProfile', auth.currentUser.uid);
    const displayName = await AsyncStorage.getItem('displayName');
    if (address != '' && phone != '' && displayName != '') {
      const snap = await setDoc(codeRef, {
        name: displayName,
        address: address,
        phone: phone,
      });
      await AsyncStorage.setItem("address",address)
      await AsyncStorage.setItem("phone",phone)
      navigation.reset({
        index: 0,
        routes: [{name: 'StatusChecker'}],
      });
    }
  };
  return (
    <View className="flex-1 p-7">
      <View className="mt-12">
        <Text className="text-black font-extrabold text-5xl mb-8">
          Complete Profile{'\n'}To Continue
        </Text>
      </View>

      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Phone Number"
        value={phone}
        keyboardType="numeric"
        onChangeText={text => setPhone(text)}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        className=" rounded-xl h-16 mb-7 mt-8"
        style={{backgroundColor: '#3F3D56'}}
        onPress={joinWithCode}>
        <Text className="mx-auto my-auto text-white font-light tracking-widest">
          Complete Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetPersonalInfo;
