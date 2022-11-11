import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuUser from '../views/admin/screens/Menu/MenuUser';
import AddMenu from '../views/admin/screens/Menu/AddMenu';
const Stack = createNativeStackNavigator();
const MenuUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MenuUser" component={MenuUser} />
      <Stack.Screen name="AddMenu" component={AddMenu} />
    </Stack.Navigator>
  );
};

export default MenuUserStack;
