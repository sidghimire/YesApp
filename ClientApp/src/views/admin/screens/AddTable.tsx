import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

const AddTable = () => {
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <Icon name="chevron-back" size={30} color="#000" />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Add Table
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Table Number: "
        />
      </View>
     
      <View className="flex flex-row mt-16">
        <TouchableOpacity className='bg-black rounded-full flex-1 p-4'>
          <Text className='text-white text-center tracking-widest'>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTable;
