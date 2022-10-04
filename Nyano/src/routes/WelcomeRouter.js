import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../views/screens/Welcome';
import IntroScreen from '../views/screens/IntroScreen';
import Register from '../views/screens/Register';
import Signin from '../views/screens/Signin';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
const WelcomeRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="IntroScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeRouter;
