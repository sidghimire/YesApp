import React from 'react'
import RestroUser from '../screens/RestroUser'
import MakeOrder from '../screens/MakeOrder'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import OccupiedOrder from '../screens/OccupiedOrder'
import AddMoreOrder from '../screens/AddMoreOrder'
const Stack=createNativeStackNavigator()
const RestroUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='RestroUser' component={RestroUser}/>
        <Stack.Screen name='MakeOrder' component={MakeOrder}/>
        <Stack.Screen name='OccupiedOrder' component={OccupiedOrder}/>
        <Stack.Screen name='AddMoreOrder' component={AddMoreOrder}/>

    </Stack.Navigator>
  )
}

export default RestroUserStack