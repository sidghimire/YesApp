import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  addDoc,
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  setDoc
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();
const db = getFirestore();

const JoinWithCode = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [code, setCode] = useState();
  const joinWithCode = async () => {
    const codeRef = collection(db, 'companyProfile');
    const q = query(codeRef, where('code', '==', code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach(async doc => {
        const name=await AsyncStorage.getItem('displayName')
        const email=await AsyncStorage.getItem('email')
        const address=await AsyncStorage.getItem('address')
        const phone=await AsyncStorage.getItem('phone')

        const companyData = doc.data();
        const companyCode = companyData.code;
        const applyRef = collection(db, 'applyJob');
        const snap = await addDoc(applyRef, {
          company: companyCode,
          applicant: auth.currentUser.uid,
          email:email,
          address:address,
          name:name,
          phone:phone
        });
      });

      setMessage('Wait For The Company Response');
    } else {
      setMessage("Company code doesn't exist.");
    }
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
          Join With{'\n'}6-digit Code
        </Text>
      </View>
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Company Code"
        value={code}
        onChangeText={text => setCode(text)}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        className=" rounded-xl h-16 mb-7 mt-8"
        style={{backgroundColor: '#3F3D56'}}
        onPress={joinWithCode}>
        <Text className="mx-auto my-auto text-white font-light tracking-widest">
          Join Company
        </Text>
      </TouchableOpacity>
      {message == 'Wait For The Company Response' ? (
        <View className="border-green-600 border-2 rounded-xl p-5 bg-green-100 ">
          <Text className="text-center font-light text-black">{message}</Text>
        </View>
      ) : (
        <></>
      )}
      {message == "Company code doesn't exist." ? (
        <View className="border-red-600 border-2 rounded-xl p-5 bg-red-100 ">
          <Text className="text-center font-light text-black">{message}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default JoinWithCode;
