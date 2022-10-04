import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth();

const Signin = ({navigation}) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginAccount = () => {
    if (email != '' && password != '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(user => {
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          setError(true);
          setErrorMsg(error.code);
          setEmail('');
          setPassword('');
        });
    } else {
      setError(true);
      setErrorMsg('Empty');
      setEmail('');
      setPassword('');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="h-full">
          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-10 ml-5"
            onPress={() => navigation.goBack()}>
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
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              className="border p-4 rounded-xl my-3"
              style={{borderColor: '#3f3d56'}}
              placeholderTextColor="#6f6f6f"
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View className="flex flex-col mt-20">
            <View className="flex flex-row mx-auto pb-5">
              <Text className="mx-2">Don't have an account? </Text>
              <TouchableOpacity
                className="mx-2"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Register')}>
                <Text className="tracking-widest font-medium">Register</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={loginAccount}
              activeOpacity={0.8}
              className=" rounded-xl h-16 mx-7 mb-7"
              style={{backgroundColor: '#3F3D56'}}>
              <Text className="mx-auto my-auto text-white font-light tracking-widest">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          {error == false ? (
            <></>
          ) : (
            <View className="w-5/6 border border-red-600 p-4 mx-auto rounded bg-red-100 flex flex-row">
              <Icon
                style={{textAlign: 'center'}}
                name="close-circle"
                color="#D70032"
                size={25}
              />
              {errorMsg == 'Empty' ? (
                <Text className="text-red-600 my-auto mx-auto">
                  One/Two Field Is Empty
                </Text>
              ) : (
                <></>
              )}
              {errorMsg == 'auth/wrong-password' ? (
                <Text className="text-red-600 my-auto mx-auto">
                  Wrong Password! Try Again
                </Text>
              ) : (
                <></>
              )}
              {errorMsg == 'auth/invalid-email' ? (
                <Text className="text-red-600 my-auto mx-auto">
                  Account with that email doesn't exist
                </Text>
              ) : (
                <></>
              )}
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Signin;
