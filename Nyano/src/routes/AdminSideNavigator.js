import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AdminDashboard from '../views/admin/screens/AdminDashboard';
import RestroMenu from '../views/admin/screens/RestroMenu';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import CompanyName from '../components/CompanyName';
import Rooms from '../views/admin/screens/Rooms';
import Restaurant from '../views/admin/screens/Restaurant';
import RestaurantStack from './RestaurantStack';
import RoomStack from './RoomStack';
import ManageUserStack from './ManageUserStack';
import MenuUserStack from './MenuUserStack';
import {signOut, getAuth} from 'firebase/auth';

const auth = getAuth();
const Drawer = createDrawerNavigator();

const AdminSideNavigator = () => {
  const CustomSidebar = props => {
    return (
      <View className="p-5 flex flex-col h-full ">
        <Text className="text-2xl text-black tracking-widest mb-10">
          Categories
        </Text>
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
          <Text className="text-black my-auto text-base ml-7">Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex flex-row my-3"
          onPress={() => props.navigation.navigate('RoomStack')}>
          <Icon name="bed" size={22} color="#3f3d56" />
          <Text className="text-black my-auto text-base ml-7">Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
          <Icon name="fast-food" size={22} color="#3f3d56" />
          <Text className="text-black my-auto text-base ml-7">Kitchen</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
          <Icon name="archive" size={22} color="#3f3d56" />
          <Text className="text-black my-auto text-base ml-7">
            Stock Management
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex flex-row my-3"
          onPress={() => props.navigation.navigate('MenuUserStack')}>
          <Icon name="grid" size={22} color="#3f3d56" />
          <Text className="text-black my-auto text-base ml-7">Menu</Text>
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
        <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
          <Icon name="desktop" size={22} color="#3f3d56" />
          <Text className="text-black my-auto text-base ml-7">Hardware</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
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
        <TouchableOpacity activeOpacity={0.7} className="flex flex-row my-3">
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
          className="flex flex-row my-4 pt-5 border-t-2 border-t-gray-200">
          <Icon name="log-out-outline" size={22} color="#3f3d56" />
          <Text className="text-black my-auto text-base ml-7">Logout</Text>
        </TouchableOpacity>
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
    </Drawer.Navigator>
  );
};

export default AdminSideNavigator;
