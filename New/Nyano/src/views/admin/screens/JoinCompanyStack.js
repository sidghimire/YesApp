import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import JoinWithCode from './JoinWithCode'
const Stack=createNativeStackNavigator()
const JoinCompanyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='JoinWithCode' component={JoinWithCode}/>
    </Stack.Navigator>
  )
}

export default JoinCompanyStack