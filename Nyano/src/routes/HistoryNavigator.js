import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from '../views/admin/screens/History/History';
const Stack = createNativeStackNavigator();
const HistoryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};

export default HistoryNavigator;
