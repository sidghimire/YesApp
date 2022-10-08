import {View, Text} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getFirestore, getDoc, doc} from 'firebase/firestore/lite';
import Welcome from '../views/screens/Welcome';
import AdminSideNavigator from '../routes/AdminSideNavigator';
import GetProfileStack from './GetProfileStack';
import {Context} from '../components/Context';
import GetPersonalInfo from '../views/admin/screens/GetPersonalInfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserSideNavigation from './UserSideNavigation';

const Stack = createNativeStackNavigator();
const db = getFirestore();
const auth = getAuth();
const StatusChecker = ({navigation}) => {
  const [initializing, setInitializing] = useState(-1);
  const checkIfExists = async () => {
    const ref = doc(db, 'userProfile', auth.currentUser.uid);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if ('name' in data) {
        if ('companyCode' in data) {
          if (data.post == 'employee') {
            setInitializing(3);
          } else if (data.post == 'admin') {
            setInitializing(1);
          }
        } else {
          setInitializing(0);
        }
      } else {
        setInitializing(2);
      }
    } else {
      setInitializing(2);
    }
  };
  useEffect(() => {
    checkIfExists();
  }, []);

  if (initializing == -1) {
    return <Welcome />;
  }
  if (initializing == 0) {
    return (
      <Context.Provider value={[initializing, setInitializing]}>
        <GetProfileStack />
      </Context.Provider>
    );
  }
  if (initializing == 1) {
    return <AdminSideNavigator />;
  }
  if (initializing == 3) {
    return <UserSideNavigation />;
  }
  if (initializing == 2) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="GetPersonalIfo" component={GetPersonalInfo} />
      </Stack.Navigator>
    );
  }
};

export default StatusChecker;
