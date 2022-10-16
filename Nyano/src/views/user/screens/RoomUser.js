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
  const [loading, setLoading] = useState(true);
  const getReservedRoom = async () => {
    setLoading(true);
    const occupiedRoom = [];
    {
      const companyCode = await AsyncStorage.getItem('companyCode');
      const ref = collection(db, 'bookings', companyCode, 'reservation');
      const snapshot = await getDocs(ref);
      const arr = [];
      snapshot.forEach(docs => {
        const doc = docs.data();
        arr.push(doc.roomNumber);
        occupiedRoom.push(doc.roomNumber);
      });
      setReserveRoom(arr);
    }
    {
      const companyCode = await AsyncStorage.getItem('companyCode');
      const ref = collection(db, 'bookings', companyCode, 'checkIn');
      const snapshot = await getDocs(ref);
      const arr = [];
      snapshot.forEach(docs => {
        const doc = docs.data();
        arr.push(doc.roomNumber);
        occupiedRoom.push(doc.roomNumber);
      });
      setBookedRoom(arr);
    }
    {
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
        arr.push(data);
      });
      setEmptyRoom(arr);
    }
    setLoading(false);
  };

  const loadAllRoom = () => {
    setBookedRoom([]);
    setReserveRoom([]);
    getReservedRoom();
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

      <ScrollView
        className="flex flex-col"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadAllRoom} />
        }>
        {loading ? (
          <></>
        ) : (
          <>
            <Text className="text-black font-light text-xl mt-5 ml-2 mb-2">
              Empty Room
            </Text>
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
                    className="border border-gray-700 rounded-xl w-16 h-16 m-2">
                    <Text className="mx-auto text-black my-auto">{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text className="text-black font-light text-xl mt-5 ml-2 mb-2">
              Occupied Room
            </Text>
            <View className="flex flex-row pl-5" style={{flexWrap: 'wrap'}}>
              {bookedRoom.map(data => {
                return (
                  <TouchableOpacity
                  onPress={()=>navigation.navigate('OpenOccupiedRoom',{roomNumber: data})}
                    activeOpacity={0.7}
                    className="bg-green-600 rounded-xl w-16 h-16 m-2">
                    <Text className="mx-auto text-white my-auto">{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text className="text-black font-light text-xl mt-5 ml-2 mb-2">
              Reserved Room
            </Text>
            <View className="flex flex-row pl-5" style={{flexWrap: 'wrap'}}>
              {reserveRoom.map(data => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ReserveRoom', {
                        roomNumber: data,
                      });
                    }}
                    activeOpacity={0.7}
                    className=" bg-yellow-600 rounded-xl w-16 h-16 m-2">
                    <Text className="mx-auto text-white my-auto">{data}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default RoomUser;
