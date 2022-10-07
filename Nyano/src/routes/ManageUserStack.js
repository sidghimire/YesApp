import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ManageUsers from '../views/admin/screens/ManageUsers'
const Stack=createNativeStackNavigator()
const ManageUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='ManageUsers' component={ManageUsers}/>
    </Stack.Navigator>
  )
}

export default ManageUserStack