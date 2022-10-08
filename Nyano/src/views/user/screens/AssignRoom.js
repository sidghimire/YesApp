import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import ToggleMenu from '../../../components/ToogleMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addDoc, collection, getFirestore} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const AssignRoom = ({route, navigation}) => {
  const {roomNumber, roomId} = route.params;
  const [date, setDate] = useState('Date');
  const [mode, setMode] = useState('date');
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [checkOut, setCheckOut] = useState(new Date());
  const [checkIn, setCheckIn] = useState(new Date());

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [citizenship, setCitizenship] = useState();

  const checkInUser = async() => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'bookings', companyCode, 'checkIn');
    await addDoc(ref, {
      roomNumber: roomNumber,
      customerName: name,
      customerPhone: phone,
      customerIdentity: citizenship,
      checkIn: checkIn,
      checkOut: checkOut,
    });
  };
  const reserveRoom = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'bookings', companyCode, 'reservation');
    await addDoc(ref, {
      roomNumber: roomNumber,
      customerName: name,
      customerPhone: phone,
      customerIdentity: citizenship,
      checkIn: checkIn,
      checkOut: checkOut,
    });
  };

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Assign Room
        </Text>
      </View>
      <View className="flex flex-row ol mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5 text-black"
          placeholder="Room Number: "
          value={roomNumber}
          editable={false}
        />
      </View>
      <View className="flex flex-col my-6">
        <Text className="text-black font-light text-xl mx-2 mb-5">
          Customer Profile
        </Text>
        <TextInput
          className=" border border-gray-400 rounded-xl p-3 pl-5 text-black my-2"
          placeholder="Customer Name:"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          className=" border border-gray-400 rounded-xl p-3 pl-5 text-black my-2"
          placeholder="Customer Phone:"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          className=" border border-gray-400 rounded-xl p-3 pl-5 text-black my-2"
          placeholder="Citizenship/Identification:"
          value={citizenship}
          onChangeText={text => setCitizenship(text)}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowCheckIn(true)}
          className=" border border-gray-400 rounded-xl p-3 py-4 pl-5 text-black my-2 flex flex-row">
          <Text className=" my-auto text-black font-light">Check In Date</Text>
          <Text className="ml-auto my-auto">
            {checkIn.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showCheckIn ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={checkIn}
            mode={mode}
            is24Hour={true}
            onChange={(event, selectedDate) => {
              setCheckIn(selectedDate);
              setShowCheckIn(false);
            }}
          />
        ) : (
          <></>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowCheckOut(true)}
          className=" border border-gray-400 rounded-xl p-3 py-4 pl-5 text-black my-2 flex flex-row">
          <Text className=" my-auto text-black font-light">Check Out Date</Text>

          <Text className="ml-auto my-auto">
            {checkOut.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showCheckOut ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={mode}
            is24Hour={true}
            onChange={(event, selectedDate) => {
              setCheckOut(selectedDate);
              setShowCheckOut(false);
            }}
          />
        ) : (
          <></>
        )}

        <View className="flex flex-row mt-10">
          <TouchableOpacity
            className="flex-1 p-4 mr-2 rounded-xl bg-green-700"
            onPress={checkInUser}>
            <Text className="mx-auto my-auto text-white font-light">
              Check in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 p-4 ml-2 rounded-xl border border-green-700"
            onPress={reserveRoom}>
            <Text className="mx-auto my-auto text-green-700 font-light">
              Reserve
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AssignRoom;
