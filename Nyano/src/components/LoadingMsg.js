import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const LoadingMsg = ({visibility}) => {
  if (visibility) {
    return (
      <View className=" bg-green-700 p-3 rounded tracking-tighter">
        <Text className="text-white mx-auto text-sm">Wait.....</Text>
      </View>
    );
  }
};

export default LoadingMsg;
