import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {getAuth, signOut} from 'firebase/auth';

const auth = getAuth();

const AccountType = ({navigation}) => {
  return (
    <View className="flex h-full flex-col p-5 pt-12  bg-white">
      <View className="mt-10 px-5">
        <Text className="text-black font-extrabold text-5xl">
          Choose {'\n'}Account Type
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('JoinCompanyStack')}
        activeOpacity={0.7}
        className="rounded-xl bg-blue-900 p-5 mt-16">
        <Text className="text-center text-white font-light">
          Join a Company
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('NewCompanyStack')}
        activeOpacity={0.7}
        className="rounded-xl border-blue-900 border-2 p-5 mt-16">
        <Text className="text-center text-blue-900 font-light">
          Create A New Company Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-black rounded w-20 p-4 mt-auto"
        onPress={() => auth.signOut()}>
        <Text className="text-white font-bold my-auto mx-auto">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountType;
