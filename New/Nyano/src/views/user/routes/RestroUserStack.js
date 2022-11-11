import React from 'react';
import RestroUser from '../screens/RestroUser';
import MakeOrder from '../screens/MakeOrder';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OccupiedOrder from '../screens/OccupiedOrder';
import AddMoreOrder from '../screens/AddMoreOrder';
import CheckOutRestaurant from '../screens/CheckOutRestaurant';
import AddToRoom from '../screens/AddToRoom';
import AssignToRoom from '../screens/AssignToRoom';
const Stack = createNativeStackNavigator();
const RestroUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="RestroUser" component={RestroUser} />
      <Stack.Screen name="MakeOrder" component={MakeOrder} />
      <Stack.Screen name="OccupiedOrder" component={OccupiedOrder} />
      <Stack.Screen name="AddMoreOrder" component={AddMoreOrder} />
      <Stack.Screen name="CheckOutRestaurant" component={CheckOutRestaurant} />
      <Stack.Screen name="AddToRoom" component={AddToRoom} />
      <Stack.Screen name="AssignToRoom" component={AssignToRoom} />
    </Stack.Navigator>
  );
};

export default RestroUserStack;
