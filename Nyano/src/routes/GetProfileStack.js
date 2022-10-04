import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AccountType from '../views/screens/AccountType'
import NewCompanyStack from '../views/admin/screens/NewCompanyStack'
import JoinCompanyStack from '../views/admin/screens/JoinCompanyStack'
const Stack=createNativeStackNavigator()
const GetProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AccountType" component={AccountType}/>
        <Stack.Screen name="NewCompanyStack" component={NewCompanyStack}/>
        <Stack.Screen name="JoinCompanyStack" component={JoinCompanyStack}/>
    </Stack.Navigator>
  )
}

export default GetProfileStack