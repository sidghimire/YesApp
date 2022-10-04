import React, {useState} from 'react';
import {Text, LogBox} from 'react-native';
import './firebase';
import Welcome from './src/views/screens/Welcome';
import Signin from './src/views/screens/Signin';
import Register from './src/views/screens/Register';
import IntroScreen from './src/views/screens/IntroScreen';
import WelcomeRouter from './src/routes/WelcomeRouter';
import StatusChecker from './src/routes/StatusChecker';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {NavigationContainer} from '@react-navigation/native';

const auth = getAuth();

const App = () => {
  //auth.signOut()
  LogBox.ignoreAllLogs();
  onAuthStateChanged(auth, user => {
    if (user) {
      setInitializing(1);
    } else {
      setInitializing(0);
    }
  });
  const [initializing, setInitializing] = useState(0);
  if (initializing == -1) {
    return <Welcome />;
  }
  if (initializing == 1) {
    return (
      <NavigationContainer>
        <StatusChecker />
      </NavigationContainer>
    );
  }
  if (initializing == 0) {
    return <WelcomeRouter />;
  }
};

export default App;
