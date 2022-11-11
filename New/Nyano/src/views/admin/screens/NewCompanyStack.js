import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import GetNewCompanyInfo1 from './GetNewCompanyInfo1'

const Stack=createNativeStackNavigator()
const NewCompanyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='GetNewCompanyInfo1' component={GetNewCompanyInfo1}/>
    </Stack.Navigator>
  )
}

export default NewCompanyStack