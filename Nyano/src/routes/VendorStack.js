import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Vendor from '../views/admin/screens/vendor/Vendor';
import AddVendor from '../views/admin/screens/vendor/AddVendor';
import VendorDetail from '../views/admin/screens/vendor/VendorDetail';
const Stack = createNativeStackNavigator();
const VendorStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Vendor" component={Vendor} />
      <Stack.Screen name="AddVendor" component={AddVendor} />
      <Stack.Screen name="VendorDetail" component={VendorDetail} />
    </Stack.Navigator>
  );
};

export default VendorStack;
