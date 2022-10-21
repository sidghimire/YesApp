import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

import {getFirestore, updateDoc, doc} from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DangerError from '../../../../components/DangerError';
import LoadingMsg from '../../../../components/LoadingMsg';

const db = getFirestore();

const UpdateEmployees = ({navigation, route}) => {
  const {userData} = route.params;
  const [name, setName] = useState('');
  const [type, setType] = useState(userData[1].post);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Error Check');
  const [searching, setSearching] = useState(false);
  const updatePost = async () => {
    setShowError(false);
    setSearching(true);
    if (type != '') {
      const companyCode = await AsyncStorage.getItem('companyCode');

      const ref = doc(db, 'userProfile', userData[0]);

      setLoading(true);
      const snapshot = await updateDoc(ref, {
        post: type.toLowerCase(),
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'EmployeeNavigator'}],
      });
    } else {
      setSearching(false);
      setShowError(true);
      setErrorMsg('Please fill in all input');
    }
  };
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Update Employees
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Name: "
          value={userData[1].name}
          editable={false}
        />
      </View>
      <View className="flex flex-row mt-3">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Name: "
          value={userData[1].address}
          editable={false}
        />
      </View>
      <View className="flex flex-row mt-3">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Name: "
          value={userData[1].phone}
          editable={false}
        />
      </View>
      <View className="border border-gray-400 rounded-xl mt-5 ">
        <Picker
          style={{fontSize: 8}}
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
          <Picker.Item label="Company Role" value="" color="#afafaf" />
          <Picker.Item label="Admin" value="admin" color="#000" />
          <Picker.Item label="Waiter" value="waiter" color="#000" />
          <Picker.Item label="Front Desk" value="frontdesk" color="#000" />
          <Picker.Item label="Cook" value="cook" color="#000" />
          <Picker.Item label="Employee" value="employee" color="#000" />
        </Picker>
      </View>
      <View className="mt-5 flex flex-col">
        <DangerError msg={errorMsg} visibility={showError} />
        <LoadingMsg visibility={searching} />
      </View>
      <View className="flex flex-row mt-5">
        <TouchableOpacity
          disabled={loading}
          onPress={updatePost}
          className="flex-1 bg-orange-600 rounded-xl p-4 mt-5 ">
          <Text className="text-center text-white font-light ">
            Update Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateEmployees;
