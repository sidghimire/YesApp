import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AdminDashboard from '../views/admin/screens/AdminDashboard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import RestroUserStack from '../views/user/routes/RestroUserStack';
import {getAuth, signOut} from 'firebase/auth';
import RoomUserStack from '../views/user/routes/RoomUserStack';
const Drawer = createDrawerNavigator();

const auth = getAuth();

const UserSideNavigation = () => {
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
          onPress={() => props.navigation.navigate('RestroUserStack')}>
          <Icon name="pizza" size={22} color="#3f3d56" />
          <Text className="text-black my-auto text-base ml-7">Restaurant</Text>
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
