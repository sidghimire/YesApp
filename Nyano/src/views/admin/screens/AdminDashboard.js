import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const AdminDashboard = ({navigation}) => {
  return (
    <View className='flex-1 bg-white p-5'>
      <Icon name="menu" size={30} color="#000" onPress={()=>navigation.toggleDrawer()} />
    </View>
  )
}

export default AdminDashboard