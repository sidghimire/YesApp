import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Employees from '../views/admin/screens/Employees/Employees';
import UpdateEmployees from '../views/admin/screens/Employees/UpdateEmployees';
const Stack = createNativeStackNavigator();
const EmployeesRouter = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Employees" component={Employees} />
      <Stack.Screen name="UpdateEmployees" component={UpdateEmployees} />
    </Stack.Navigator>
  );
};

export default EmployeesRouter;
