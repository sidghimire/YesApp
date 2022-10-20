import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Rooms from '../views/admin/screens/Room/Rooms';
import AddRoom from '../views/admin/screens/Room/AddRoom';
import RoomDetails from '../views/admin/screens/Room/RoomDetails';
const Stack = createNativeStackNavigator();
const RoomStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="RoomDetails" component={RoomDetails} />
      <Stack.Screen name="AddRoom" component={AddRoom} />
    </Stack.Navigator>
  );
};

export default RoomStack;
