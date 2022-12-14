import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../views/screens/Welcome';
import IntroScreen from '../views/screens/IntroScreen';
import Register from '../views/screens/Register';
import Signin from '../views/screens/Signin';
import AdminSideNavigator from './AdminSideNavigator';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const WelcomeRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen
          name="AdminSideNavigator"
          component={AdminSideNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeRouter;
