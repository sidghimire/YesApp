import {View, Text} from 'react-native';
import React from 'react';
import AdminSideNavigator from './src/routes/AdminSideNavigator';
import AddRoom from './src/views/admin/screens/AddRoom';
import Restaurant from './src/views/admin/screens/Restaurant';
import AddTable from './src/views/admin/screens/AddTable';
import WelcomeRouter from './src/routes/WelcomeRouter';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <WelcomeRouter />
    </NavigationContainer>
  );
};

export default App;
