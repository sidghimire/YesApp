import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const JoinWithCode = ({navigation}) => {
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
      />
      
      <TouchableOpacity
        activeOpacity={0.8}
        className=" rounded-xl h-16 mb-7 mt-8"
        style={{backgroundColor: '#3F3D56'}}>
        <Text className="mx-auto my-auto text-white font-light tracking-widest">
          Join Company
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinWithCode;
