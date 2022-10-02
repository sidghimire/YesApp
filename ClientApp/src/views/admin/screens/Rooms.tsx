import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Rooms = () => {
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <Icon name="menu" size={30} color="#000" />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Rooms
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-l-xl p-3 pl-5"
          placeholder="Room Number: "
        />
        <TouchableOpacity className="bg-black rounded-r-xl p-3 w-16 ">
          <Icon
            name="search"
            size={20}
            color="#fff"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          />
        </TouchableOpacity>
      </View>
      <Text className="text-black font-light text-2xl mt-5 ml-2 mb-2">
        Room List
      </Text>
      <View className="flex flex-row h-20">
        <TouchableOpacity activeOpacity={0.7} className="border border-gray-300 rounded-xl flex-1 m-2">
          <View className="mx-auto my-auto flex flex-row">
            <Text>201</Text>
            <Icon
              name="star"
              size={15}
              color="#FFD700"
              style={{marginLeft:5}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">202</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">203</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">204</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row h-20">
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">201</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">202</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">203</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">204</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row h-20">
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">201</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">202</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">203</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">204</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="absolute bg-white rounded-full bottom-6 right-6">
        <Icon name="add-circle" size={80} color="#fa594e" />
      </TouchableOpacity>
    </View>
  );
};

export default Rooms;
