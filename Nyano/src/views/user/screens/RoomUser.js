import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ToggleMenu from '../../../components/ToogleMenu';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = getFirestore();
const auth = getAuth();

const RoomUser = ({navigation}) => {
  const [emptyRoom, setEmptyRoom] = useState([]);
  const [reserveRoom, setReserveRoom] = useState([]);
  const [bookedRoom, setBookedRoom] = useState([]);
  const [occupiedRoom, setOccupiedRoom] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReservedRoom = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'bookings', companyCode, 'reservation');
    const snapshot = await getDocs(ref);
    const arr = [];
    snapshot.forEach(docs => {
      const doc = docs.data();
      arr.push(doc.roomNumber);
    });
    setOccupiedRoom([...occupiedRoom, arr]);
    setReserveRoom([...reserveRoom, arr]);
  };
  const getBookedRoom = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'bookings', companyCode, 'checkIn');
    const snapshot = await getDocs(ref);
    const arr = [];
    snapshot.forEach(docs => {
      const doc = docs.data();
      arr.push(doc.roomNumber);
    });
    setBookedRoom([...bookedRoom, arr]);
    setOccupiedRoom([...occupiedRoom, arr]);
  };
  const getEmptyRoom = async () => {
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'roomAdminDB', companyCode, 'hotelRoom');
    let q = ref;
    if (occupiedRoom.length != 0) {
      q = query(ref, where('roomNumber', 'not-in', occupiedRoom));
    }
    const snapshot = await getDocs(q);
    const arr = [];
    snapshot.forEach(docs => {
      const doc = docs.data();
      const data = [doc.roomNumber];
      arr.push(doc.roomNumber);
    });
    setEmptyRoom(arr);
  };

  const loadAllRoom = () => {
    setBookedRoom([])
    setReserveRoom([])
    setOccupiedRoom([])
    getReservedRoom();
    getBookedRoom();
    getEmptyRoom();
  };

  useEffect(() => {
    loadAllRoom();
  }, []);

  return (
    <View className="bg-white flex-1 p-5">
      <View className="flex flex-row">
        <ToggleMenu navigation={navigation} />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Room
        </Text>
      </View>
      <Text className="text-black font-light text-2xl mt-5 ml-2 mb-2">
        Room List
      </Text>
      <ScrollView
      className="flex flex-col"
        refreshControl={
          <RefreshControl loading={loading} onRefresh={loadAllRoom} />
        }>
        <View className="flex flex-row pl-5" style={{flexWrap: 'wrap'}}>
          {emptyRoom.map(data => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AssignRoom', {
                    roomNumber: data,
                  });
                }}
                activeOpacity={0.7}
                className="border border-gray-300 rounded-xl w-16 h-16 m-2">
                <Text className="mx-auto my-auto">{data}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
      </ScrollView>
    </View>
  );
};

export default RoomUser;
