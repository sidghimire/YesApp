import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';

const AddRoom = ({navigation}) => {
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Add Room
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Room Number: "
        />
      </View>
      <View className="border border-gray-400 rounded-xl mt-5 ">
        <Picker style={{fontSize: 10}}>
          <Picker.Item label="Type of room" value="" color="#afafaf" />
          <Picker.Item label="Premium" value="java" color="#000" />
          <Picker.Item label="Regular" value="js" color="#000" />
        </Picker>
      </View>
      <View className="flex flex-row mt-5">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Price: "
        />
      </View>
      <View className="flex flex-row mt-16">
        <TouchableOpacity className="bg-black rounded-full flex-1 p-4">
          <Text className="text-white text-center tracking-widest">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRoom;
