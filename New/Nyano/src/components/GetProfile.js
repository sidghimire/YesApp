import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, setDoc, getFirestore} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
const db = getFirestore();
const auth = getAuth();

const GetProfile = ({navigation}) => {
  const [userBlood, setUserBlood] = useState('');
  const [fullName, setFullName] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userBlood');
      if (value !== null) {
        setUserBlood(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const nextScreen = async () => {
    const user = auth.currentUser;
    if (
      userBlood != '' &&
      fullName != '' &&
      age != '' &&
      location != '' &&
      frequency != ''
    ) {
      await setDoc(doc(db, 'userProfile', user.uid), {
        fullName: fullName,
        age: age,
        location: location,
        frequency: frequency,
        userBlood: userBlood,
      }).then(async res => {
        try {
          await AsyncStorage.setItem('fullName', fullName);
          await AsyncStorage.setItem('age', age);
          await AsyncStorage.setItem('frequency', location);
          await AsyncStorage.setItem('location', frequency);
          await AsyncStorage.setItem('userBlood', userBlood);
          getLocalStorage();
        } catch (e) {
          console.log(e);
        }
        navigation.reset({
          index: 0,
          routes: [{name: 'DashboardTab'}],
        });
      });
    }
  };

  return (
    <View className="flex h-full flex-col p-5 pt-12  bg-white">
      <View className="mt-10 px-5">
        <Text className="text-black font-extrabold text-5xl">
          Complete {'\n'}Your Profile
        </Text>
      </View>
      <View className="px-4 flex flex-col">
        <TextInput
          className="border p-4 rounded-xl my-3"
          style={{borderColor: '#3f3d56'}}
          placeholderTextColor="#6f6f6f"
          placeholder="Full Name: "
          value={age}
          onChangeText={text => setAge(text)}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={nextScreen}
        className="w-5/6 rounded-full p-5 mt-28 mx-auto"
        style={{backgroundColor: '#EB7B7E'}}>
        <Text className="text-center text-white font-bold text-xl">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetProfile;
