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
import Icon from 'react-native-vector-icons/Ionicons';

const db = getFirestore();
const auth = getAuth();

const AddToRoom = ({navigation, route}) => {
  const {tableNumber,tableData,tableId} = route.params;
  const [emptyRoom, setEmptyRoom] = useState([]);
  const [reserveRoom, setReserveRoom] = useState([]);
  const [bookedRoom, setBookedRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const getReservedRoom = async () => {
    setLoading(true);
    const occupiedRoom = [];

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Assign To Room
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
            <View
              className="flex flex-row pl-5 mt-10"
              style={{flexWrap: 'wrap'}}>
              {bookedRoom.map(data => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AssignToRoom', {
                        roomNumber: data,
                        tableNumber:tableNumber,
                        tableData:tableData,
                        tableId:tableId
                      })
                    }
                    activeOpacity={0.7}
                    className="bg-green-600 rounded-xl w-16 h-16 m-2">
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

export default AddToRoom;
