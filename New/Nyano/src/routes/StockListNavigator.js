import {View, Text} from 'react-native';
import React from 'react';
import StockList from '../views/admin/screens/StockList/StockList';
import AddStockList from '../views/admin/screens/StockList/AddStockList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StockListDetail from '../views/admin/screens/StockList/StockListDetail';
const Stack = createNativeStackNavigator();

const StockListNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StockList" component={StockList} />
      <Stack.Screen name="AddStockList" component={AddStockList} />
      <Stack.Screen name="StockListDetail" component={StockListDetail} />
    </Stack.Navigator>
  );
};

export default StockListNavigator;
