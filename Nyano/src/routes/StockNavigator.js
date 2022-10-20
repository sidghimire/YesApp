import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StockManagement from '../views/admin/screens/stockManagement/StockManagement';
import AddStock from '../views/admin/screens/stockManagement/AddStock';

const Stack = createNativeStackNavigator();
const StockNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StockManagement" component={StockManagement} />
      <Stack.Screen name="AddStock" component={AddStock} />
    </Stack.Navigator>
  );
};

export default StockNavigator;
