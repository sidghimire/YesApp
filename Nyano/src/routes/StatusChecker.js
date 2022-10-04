import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAuth} from 'firebase/auth';
import {getFirestore, getDoc, doc} from 'firebase/firestore/lite';
import Welcome from '../views/screens/Welcome';
import AdminSideNavigator from '../routes/AdminSideNavigator';
import GetProfileStack from './GetProfileStack';
const db = getFirestore();
const auth = getAuth();
const StatusChecker = () => {
    const [initializing,setInitializing]=useState(-1)
  const checkIfExists = async () => {
    const ref = doc(db, 'user', auth.currentUser.uid);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      setInitializing(1)
    } else {
      setInitializing(0)
    }
  };
  useEffect(() => {
    checkIfExists();
  }, []);

  if(initializing==-1){
    return (<Welcome/>)
  }
  if(initializing==0){
    return (<GetProfileStack/>)
  }
  if(initializing==1){
    return (<AdminSideNavigator/>)
  }
};

export default StatusChecker;
