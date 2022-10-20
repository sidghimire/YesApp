import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import RoomUser from '../screens/RoomUser'
import AssignRoom from '../screens/AssignRoom'
import ReserveRoom from '../screens/ReserveRoom'
import OpenOccupiedRoom from '../screens/OpenOccupiedRoom'
import CheckOutBill from '../screens/CheckOutBill'
const Stack=createNativeStackNavigator()
const RoomUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='RoomUser' component={RoomUser}/>
        <Stack.Screen name='AssignRoom' component={AssignRoom}/>
        <Stack.Screen name='ReserveRoom' component={ReserveRoom}/>
        <Stack.Screen name='OpenOccupiedRoom' component={OpenOccupiedRoom}/>
        <Stack.Screen name='CheckOutBill' component={CheckOutBill}/>
    </Stack.Navigator>
  )
}

export default RoomUserStack