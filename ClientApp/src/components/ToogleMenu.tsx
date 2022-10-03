import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ToggleMenu = ({navigation}) => {
  return (
    <Icon
      name="menu"
      size={30}
      color="#000"
      onPress={() => navigation.toggleDrawer()}
    />
  );
};

export default ToggleMenu;
