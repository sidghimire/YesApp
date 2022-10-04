import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleMenu from '../../../components/ToogleMenu';
const Restaurant = ({navigation}) => {
  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <ToggleMenu navigation={navigation}/>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Restaurant
        </Text>
      </View>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-l-xl p-3 pl-5"
          placeholder="Table Number: "
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
        Table List
      </Text>
      <View className="flex flex-row h-20">
        <TouchableOpacity
          activeOpacity={0.7}
          className="border border-gray-300 rounded-xl flex-1 m-2">
          <View className="mx-auto my-auto flex flex-row">
            <Text>1</Text>
            <Icon
              name="star"
              size={15}
              color="#FFD700"
              style={{marginLeft: 5}}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">2</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">3</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">4</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row h-20">
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">5</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">6</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">7</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">8</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row h-20">
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">9</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">10</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">11</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-gray-300 rounded-xl flex-1 m-2">
          <Text className="mx-auto my-auto">12</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
      onPress={()=>navigation.navigate("AddTable")}
        activeOpacity={0.7}
        className="absolute bg-white rounded-full bottom-6 right-6">
        <Icon name="add-circle" size={80} color="#fa594e" />
      </TouchableOpacity>
    </View>
  );
};

export default Restaurant;
