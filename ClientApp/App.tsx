import React, {useState} from 'react';
import {LogBox, View, Text} from 'react-native';
import WelcomeRouter from './src/routes/WelcomeRouter';
import {NavigationContainer} from '@react-navigation/native';
import './firebase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import CompanyName from './src/components/CompanyName';

const auth = getAuth();

const LoggedIn = () => {
  auth.signOut()

  return <Text>Hi</Text>;
};
const App = () => {
  LogBox.ignoreAllLogs();
  const [initilizing, setInitializing] = useState(-1);
  onAuthStateChanged(auth, user => {
    if (user) {
      setInitializing(1);
    } else {
      setInitializing(0);
    }
  });
  if (initilizing == -1) {
    return (
      <View className="mx-auto my-auto">
        <CompanyName size={30} />
      </View>
    );
  }
  if (initilizing == 1) {
    return <LoggedIn />;
  }
  if (initilizing == 0) {
    return (
      <NavigationContainer>
        <WelcomeRouter />
      </NavigationContainer>
    );
  }
};

export default App;
