import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import RoomUser from '../screens/RoomUser'
import AssignRoom from '../screens/AssignRoom'
const Stack=createNativeStackNavigator()
const RoomUserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='RoomUser' component={RoomUser}/>
        <Stack.Screen name='AssignRoom' component={AssignRoom}/>
    </Stack.Navigator>
  )
}

export default RoomUserStack