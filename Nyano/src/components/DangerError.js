import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const DangerError = ({visibility, msg}) => {
  if (visibility) {
    return (
      <View className=" bg-red-400 p-3 rounded tracking-tighter">
        <View className="mx-auto flex flex-row">
          <Icon name="alert-circle" color={'#fff'} size={20} />
          <Text className=" text-white my-auto mx-5">{msg}</Text>
        </View>
      </View>
    );
  }
};

export default DangerError;
