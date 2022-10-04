import {View, Text} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getFirestore, getDoc, doc} from 'firebase/firestore/lite';
import Welcome from '../views/screens/Welcome';
import AdminSideNavigator from '../routes/AdminSideNavigator';
import GetProfileStack from './GetProfileStack';
import {Context} from '../components/Context';

const db = getFirestore();
const auth = getAuth();
const StatusChecker = () => {
  const [initializing, setInitializing] = useState(-1);
  const checkIfExists = async () => {
    const ref = doc(db, 'userProfile', auth.currentUser.uid);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if ('companyCode' in data) {
        setInitializing(1);
      } else {
        setInitializing(0);
      }
    } else {
      setInitializing(0);
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
};

export default StatusChecker;
