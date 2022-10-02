import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const Signin = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className='' style={{justifyContent:'space-around'}}>
          <TouchableOpacity activeOpacity={0.7} className="mt-10 ml-5">
            <Icon name="chevron-back-outline" size={40} color="#3f3d56" />
          </TouchableOpacity>
          <View className="my-10">
            <Text className="text-5xl tracking-widest text-gray-700 text-left font-extrabold mx-7 mt-10">
              Let's sign you in.
            </Text>
            <Text className="text-gray-600 text-3xl mx-7 tracking-widest text-left font-lighter mt-8">
              Welcome Back.{'\n'}
              You've been missed!
            </Text>
          </View>
          <View className="m-7 mt-0">
            <TextInput
              className="border p-4 rounded-xl my-3"
              style={{borderColor: '#3f3d56'}}
              placeholderTextColor="#6f6f6f"
              placeholder="Email"
            />
            <TextInput
              className="border p-4 rounded-xl my-3"
              style={{borderColor: '#3f3d56'}}
              placeholderTextColor="#6f6f6f"
              placeholder="Password"
            />
          </View>
          <View className="flex flex-col mt-32">
            <View className="flex flex-row mx-auto pb-5">
              <Text className="mx-2">Don't have an account? </Text>
              <TouchableOpacity className="mx-2" activeOpacity={0.8}>
                <Text className="tracking-widest font-medium">Register</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className=" rounded-xl h-16 mx-7 mb-7"
              style={{backgroundColor: '#3F3D56'}}>
              <Text className="mx-auto my-auto text-white font-light tracking-widest">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Signin;
