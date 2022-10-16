import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import RoomUser from '../screens/RoomUser'
import AssignRoom from '../screens/AssignRoom'
import ReserveRoom from '../screens/ReserveRoom'
import OpenOccupiedRoom from '../screens/OpenOccupiedRoom'
const Stack=createNativeStackNavigator()
const RoomUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='RoomUser' component={RoomUser}/>
        <Stack.Screen name='AssignRoom' component={AssignRoom}/>
        <Stack.Screen name='ReserveRoom' component={ReserveRoom}/>
        <Stack.Screen name='OpenOccupiedRoom' component={OpenOccupiedRoom}/>
    </Stack.Navigator>
  )
}

export default RoomUserStack