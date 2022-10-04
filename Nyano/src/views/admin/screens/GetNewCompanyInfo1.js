import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const GetNewCompanyInfo1 = ({navigation}) => {
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
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Company Registration Number"
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Owner Name"
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Email"
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Phone Numer"
      />
      <TextInput
        className="border p-4 rounded-xl my-3"
        style={{borderColor: '#3f3d56'}}
        placeholderTextColor="#6f6f6f"
        placeholder="Address"
      />
      <TouchableOpacity
        activeOpacity={0.8}
        className=" rounded-xl h-16 mb-7 mt-8"
        style={{backgroundColor: '#3F3D56'}}>
        <Text className="mx-auto my-auto text-white font-light tracking-widest">
          Create Company Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetNewCompanyInfo1;
