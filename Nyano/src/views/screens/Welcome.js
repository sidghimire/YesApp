import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import CompanyName from '../../components/CompanyName';
const Welcome = () => {
  return (
    <View className="w-full bg-white flex-1">
      <View className="my-auto">
        <View className='mx-auto'>
          <CompanyName size={36} />
        </View>
        <ActivityIndicator size="large" color="#0000ff" className="my-10" />
      </View>
    </View>
  );
};
export default Welcome;
