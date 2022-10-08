import React from 'react'
import RestroUser from '../screens/RestroUser'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
const Stack=createNativeStackNavigator()
const RestroUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='RestroUser' component={RestroUser}/>
    </Stack.Navigator>
  )
}

export default RestroUserStack