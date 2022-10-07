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
import {createUserWithEmailAndPassword, getAuth,updateProfile} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
const auth = getAuth();

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const CreateAccount = ({navigation}) => {
    if (email != '' && password != '' && username != '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async(user) => {
          setEmail('');
          setPassword('');
          setUsername('');
          updateProfile(auth.currentUser,{
            displayName:username
          })
          await AsyncStorage.setItem('userUid',user.user.uid)
          await AsyncStorage.setItem('displayName',username)
          await AsyncStorage.setItem('email',user.user.email)
        })
        .catch(error => {
          setError(true);
          setErrorMsg(error.code);
          setEmail('');
          setPassword('');
          setUsername('');
        });
    } else {
      setError(true);
      setErrorMsg('Empty');
      setEmail('');
      setPassword('');
      setUsername('');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="h-full">
          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-10 ml-5"
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={40} color="#3f3d56" />
          </TouchableOpacity>
          <View>
            <Text className="text-5xl tracking-widest text-gray-700 text-left font-extrabold mx-7 mt-10 mb-5">
              Let's get you in
            </Text>
            <Text className="text-gray-600 text-3xl mx-7 tracking-widest text-left font-lighter mt-8 mb-8">
              New here?{'\n'}
              Jump right in!
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
            <TextInput
              className="border p-4 rounded-xl my-3"
              style={{borderColor: '#3f3d56'}}
              placeholderTextColor="#6f6f6f"
              placeholder="Full Name"
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>
          <View className="flex flex-col mt-auto">
            <View className="flex flex-row mx-auto pb-5">
              <Text className="mx-2">Already Have An Account? </Text>
              <TouchableOpacity
                className="mx-2"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Signin')}>
                <Text className="tracking-widest font-medium">Sign in</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={CreateAccount}
              activeOpacity={0.8}
              className=" rounded-xl h-16 mx-7 mb-7"
              style={{backgroundColor: '#3F3D56'}}>
              <Text className="mx-auto my-auto text-white font-light tracking-widest">
                Register
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
              {errorMsg == 'auth/email-already-in-use' ? (
                <Text className="text-red-600 my-auto mx-auto">
                  Empty Already Exists!
                </Text>
              ) : (
                <></>
              )}
              {errorMsg == 'auth/weak-password' ? (
                <Text className="text-red-600 my-auto mx-auto">
                  Password Must Be Atleast 8 characters Long
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
export default Register;
