import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleMenu from '../../../../components/ToogleMenu';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const db = getFirestore();
const auth = getAuth();

const ManageUsers = ({navigation}) => {
  const [admin, setAdmin] = useState();
  const [requestUsers, setRequestUsers] = useState([]);
  const [companyCode, setCompanyCode] = useState();
  const getAdminData = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    setCompanyCode(companyCode);
    const ref = collection(db, 'userProfile');
    const q = query(
      ref,
      where('companyCode', '==', companyCode),
      where('post', '==', 'admin'),
    );
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      setAdmin(doc.data().name);
    });
  };

  const makeEmployee = async (applicant, jobId) => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = doc(db, 'userProfile', applicant);
    await updateDoc(ref, {
      companyCode: companyCode,
      post: 'employee',
    });
    deleteRecord(applicant, jobId);
  };
  const deleteRecord = async (applicant, jobId) => {
    const ref = doc(db, 'applyJob', jobId);
    await updateDoc(ref, {
      enable: 'false',
    });
  };

  const getJoinRequests = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');

    const ref = collection(db, 'applyJob');
    const q = query(
      ref,
      where('company', '==', companyCode),
      where('enable', '==', 'true'),
    );
    const snap = await getDocs(q);
    let data = [];
    snap.forEach(async doc => {
      data.push([doc.id, doc.data()]);
    });
    setRequestUsers(data);
  };

  useEffect(() => {
    getAdminData();
    getJoinRequests();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <ToggleMenu navigation={navigation} />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Manage Users
        </Text>
      </View>
      <View className="flex flex-col mt-10">
        <Text className="text-black font-light text-2xl mb-2">
          CompanyCode:
        </Text>
        <View className="bg-gray-100 rounded-xl p-5">
          <Text>{companyCode}</Text>
        </View>
      </View>
      <View className="flex flex-col mt-10">
        <Text className="text-black font-light text-2xl mb-2">Admin:</Text>
        <View className="bg-gray-100 rounded-xl p-5">
          <Text>{admin}</Text>
        </View>
      </View>
      <View className="flex flex-col mt-6">
        <Text className="text-black font-light text-2xl mb-6">
          Join Requests:
        </Text>
        <ScrollView>
          {requestUsers.map(data => {
            return (
              <View className="bg-gray-100 rounded-xl p-5 flex flex-row my-3">
                <View className="flex-1 my-auto">
                  <Text className=" font-light text-black tracking-widest text-base">
                    {data[1].name}
                  </Text>
                  <View className="flex flex-row">
                    <Text
                      className="font-light text-black"
                      style={{fontSize: 12}}>
                      {data[1].phone}
                    </Text>
                    <Text
                      className="font-light text-black ml-2"
                      style={{fontSize: 12}}>
                      ( {data[1].address} )
                    </Text>
                  </View>
                </View>
                <Icon
                  name="checkmark-circle"
                  size={30}
                  color="#0E9956"
                  style={{marginRight: 10}}
                  onPress={() => makeEmployee(data[1].applicant, data[0])}
                />
                <Icon
                  name="close-circle"
                  size={30}
                  color="#CA1929"
                  onPress={() => deleteRecord(data[1].applicant, data[0])}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ManageUsers;
