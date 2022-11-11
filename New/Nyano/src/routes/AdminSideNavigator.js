import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AdminDashboard from '../views/admin/screens/AdminDashboard';
import RestroMenu from '../views/admin/screens/RestroMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import RestaurantStack from './RestaurantStack';
import RoomStack from './RoomStack';
import ManageUserStack from './ManageUserStack';
import MenuUserStack from './MenuUserStack';
import VendorStack from './VendorStack';
import StockNavigator from './StockNavigator';
import {signOut, getAuth} from 'firebase/auth';
import StockListNavigator from './StockListNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  doc,
  getDocs,
  getFirestore,
  where,
  collection,
  query,
} from 'firebase/firestore/lite';
import HistoryNavigator from './HistoryNavigator';
import EmployeesRouter from './EmployeesRouter';

const auth = getAuth();
const Drawer = createDrawerNavigator();

const db = getFirestore();

const AdminSideNavigator = () => {
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
      setCompanyCode(companyCode1);
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
              <Text className="text-white text-base font-medium">Code:</Text>
              <Text className="text-gray-100 text-base font-light ml-auto">
                {companyCode}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          className="flex flex-col p-5 mb-1"
          showsVerticalScrollIndicator={false}>
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
            onPress={() => props.navigation.navigate('RestaurantStack')}>
            <Icon name="pizza" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">
              Restaurant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('RoomStack')}>
            <Icon name="bed" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Rooms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('StockNavigator')}>
            <Icon name="duplicate" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">
              Stock Management
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('MenuUserStack')}>
            <Icon name="fast-food" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Food Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
            <Icon name="color-fill" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">
              Housekeeping
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
            <Icon name="newspaper" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">
              Finance Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('VendorStack')}
            activeOpacity={0.7}
            className="flex flex-row my-3">
            <Icon name="business" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Vendors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('StockListNavigator')}
            activeOpacity={0.7}
            className="flex flex-row my-3">
            <Icon name="archive" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">StockList</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EmployeeNavigator')}
            activeOpacity={0.7}
            className="flex flex-row my-3">
            <Icon name="briefcase" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Employees</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('ManageUserStack')}>
            <Icon name="person" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">
              Manage Users
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex flex-row my-3"
            onPress={() => props.navigation.navigate('HistoryNavigator')}>
            <Icon name="compass" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">History</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
            <Icon name="cog" size={22} color="#3f3d56" />
            <Text className="text-black my-auto text-base ml-7">Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => auth.signOut()}
            activeOpacity={0.7}
            className="flex flex-row my-4 pt-5 border-t-2 border-t-gray-200 mb-10">
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

      <Drawer.Screen name="RestaurantStack" component={RestaurantStack} />
      <Drawer.Screen name="RestroMenu" component={RestroMenu} />
      <Drawer.Screen name="RoomStack" component={RoomStack} />
      <Drawer.Screen name="ManageUserStack" component={ManageUserStack} />
      <Drawer.Screen name="MenuUserStack" component={MenuUserStack} />
      <Drawer.Screen name="VendorStack" component={VendorStack} />
      <Drawer.Screen name="StockNavigator" component={StockNavigator} />
      <Drawer.Screen name="StockListNavigator" component={StockListNavigator} />
      <Drawer.Screen name="HistoryNavigator" component={HistoryNavigator} />
      <Drawer.Screen name="EmployeeNavigator" component={EmployeesRouter} />
    </Drawer.Navigator>
  );
};

export default AdminSideNavigator;
