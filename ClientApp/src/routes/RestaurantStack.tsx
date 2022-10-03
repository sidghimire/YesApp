import React from 'react'
import Restaurant from '../views/admin/screens/Restaurant'
import AddTable from '../views/admin/screens/AddTable'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
const Stack=createNativeStackNavigator()
const RestaurantStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Restaurant' component={Restaurant}/>
        <Stack.Screen name='AddTable' component={AddTable}/>
    </Stack.Navigator>
  )
}

export default RestaurantStack