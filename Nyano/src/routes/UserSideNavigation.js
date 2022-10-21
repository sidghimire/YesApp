import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AdminDashboard from '../views/admin/screens/AdminDashboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import RestroUserStack from '../views/user/routes/RestroUserStack';
import {getAuth, signOut} from 'firebase/auth';
import RoomUserStack from '../views/user/routes/RoomUserStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  doc,
  getDocs,
  getFirestore,
  where,
  collection,
  query,
} from 'firebase/firestore/lite';
const Drawer = createDrawerNavigator();

const auth = getAuth();
const db = getFirestore();

const UserSideNavigation = () => {
  const [name, setName] = useState();
  const [companyCode, setCompanyCode] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const getCompanyData = async () => {
    const name1 = await AsyncStorage.getItem('displayName');
    const email1 = await AsyncStorage.getItem('email');
    const companyCode1 = await AsyncStorage.getItem('companyCode');

    const ref = collection(db, 'companyProfile');
    const q = query(ref, where('code', '==', companyCode1));
    const snapshot = await getDocs(q);
    snapshot.forEach(docs => {
      const data = docs.data();
      setAddress(data.address);
      setName(data.companyName);
      setPhone(data.phoneNumber);
      setCompanyCode(auth.currentUser.displayName);
    });
  };
  useEffect(() => {
    getCompanyData();
  }, []);

  const CustomSidebar = props => {
    return (
      <View className=" flex flex-col h-full ">
        <View className="p-6 bg-blue-500 flex flex-col">
          <Text className="text-white text-3xl font-bold">{name}</Text>
          <Text className="text-white text-base font-light">{phone}</Text>
          <Text className="text-white text-base font-light">{address}</Text>
          <View className="flex flex-row">
            <View className="flex flex-row mt-6 flex-1 bg-blue-600 p-3 rounded-xl">
              <Text className="text-white text-base font-medium">Name:</Text>
              <Text className="text-gray-100 text-base font-light ml-auto">
                {companyCode}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView className="p-5">
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('AdminDashboard')}>
            <Icon name="grid" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('RestroUserStack')}>
            <Icon name="pizza" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">
              Restaurant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('RoomUserStack')}>
            <Icon name="bed" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Rooms</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
            <Icon name="color-fill" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">
              Housekeeping
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
            <Icon name="cog" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => auth.signOut()}
            activeOpacity={0.7}
            className="flex flex-row my-8 pt-5 border-t-2 border-t-gray-200">
            <Icon name="log-out-outline" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSidebar {...props} />}
      initialRouteName="AdminDashboard"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="AdminDashboard" component={AdminDashboard} />
      <Drawer.Screen name="RestroUserStack" component={RestroUserStack} />
      <Drawer.Screen name="RoomUserStack" component={RoomUserStack} />
    </Drawer.Navigator>
  );
};

export default UserSideNavigation;
