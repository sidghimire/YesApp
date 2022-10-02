import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import First from '../../../assets/images/first.png';
import Icon from 'react-native-vector-icons/Ionicons';
const IntroScreen = () => {
  return (
    <View className="flex-1 bg-white">
      <TouchableOpacity activeOpacity={0.7} className='absolute m-5'>
        <Icon name="chevron-back-outline" size={40} color="#3f3d56" />
      </TouchableOpacity>
      <Image source={First} className="w-72 h-72 mx-auto mt-20" />
      <View className="my-16">
        <Text className="text-5xl tracking-widest text-gray-700 text-center font-bold">
          Enterprise team
        </Text>
        <Text className="text-gray-700 tracking-widest text-5xl text-center font-bold">
          collaboration
        </Text>
        <Text className="text-gray-600 text-sm tracking-widest text-center font-lighter mt-8">
          Bring together your files, your tools,{'\n'} projectsand people.
          Including a new {'\n'}mobile and desktop application
        </Text>
      </View>
      <View className="mt-auto m-10 bg-gray-200 rounded-xl flex flex-row">
        <TouchableOpacity
          activeOpacity={0.8}
          className=" rounded-xl w-1/2 h-16"
          style={{backgroundColor: '#3F3D56'}}>
          <Text className="mx-auto my-auto text-white font-light tracking-widest">
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          className=" rounded-xl w-1/2 h-16">
          <Text className="mx-auto my-auto text-black font-light tracking-widest">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IntroScreen;
