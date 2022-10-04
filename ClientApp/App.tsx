import 'react-native-gesture-handler';
import {View, Text, LogBox} from 'react-native';
import React, {useState} from 'react';
import WelcomeRouter from './src/routes/WelcomeRouter';
import CompanyName from './src/components/CompanyName';

import './firebaseConfig';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth();
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
    return <Text>Company Name</Text>;
  }
  if (initilizing == 1) {
    return(<Text>Logged In</Text>);
  }
  if (initilizing == 0) {
    return (<WelcomeRouter/>);
  }
};

export default App;
