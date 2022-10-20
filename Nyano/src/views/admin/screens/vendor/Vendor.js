import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import ToggleMenu from '../../../../components/ToogleMenu';
import {
  getDocs,
  getFirestore,
  query,
  collection,
} from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
const db = getFirestore();

const VendorRow = props => {
  const {data, navigation} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('VendorDetail', {
          vendorId: data[0],
          vendorData: data[1],
        })
      }
      className="flex-1 flex flex-row p-5 bg-gray-200 mt-1 rounded-xl">
      <View className="flex-1">
        <Text className="text-black font-light my-auto">{data[1]['name']}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-black font-light my-auto">
          ({data[1]['address']})
        </Text>
      </View>
      <TouchableOpacity style="ml-auto ">
        <Icon name="caret-forward-outline" size={22} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Vendor = ({navigation}) => {
  const [vendorList, setVendorList] = useState([]);
  const [vendorList2, setVendorList2] = useState([]);
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState();

  const searchArray = text => {
    setSearchText(text);
    let len = text.length;
    const arr = [];
    vendorList2.forEach(doc => {
      if (doc[1].name.substring(0, len).toLowerCase() == text.toLowerCase()) {
        arr.push(doc);
      }
    });
    setVendorList(arr);
  };

  const getVendorList = async () => {
    setLoading(true);
    const companyCode = await AsyncStorage.getItem('companyCode');
    const ref = collection(db, 'vendor', companyCode, 'vendorsInfo');
    const snapshot = await getDocs(ref);
    let arr = [];
    snapshot.forEach(docs => {
      const doc = docs.data();
      arr.push([docs.id, doc]);
    });
    setVendorList(arr);
    setVendorList2(arr);
    setLoading(false);
  };
  useEffect(() => {
    getVendorList();
  }, []);

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex flex-row">
        <ToggleMenu navigation={navigation} />
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Vendor
        </Text>
      </View>
      <View className="flex flex-row bg-gray-100 rounded-xl p-1 pl-5 mb-5 mt-10">
        <Icon
          name="search-outline"
          size={20}
          color="#bfbfbf"
          style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 10}}
        />
        <TextInput
          value={searchText}
          onChangeText={text => searchArray(text)}
          placeholder="Search for vendor: "
          className="flex-1"
        />
      </View>
      <ScrollView
        className="flex flex-col "
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getVendorList()}
          />
        }>
        {vendorList.map((data, index) => {
          return <VendorRow key={index} data={data} navigation={navigation} />;
        })}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        className="rounded p-5 absolute z-40 right-5 bottom-5"
        onPress={() => navigation.navigate('AddVendor')}>
        <Icon name="add-circle" size={70} color="#fa594e" />
      </TouchableOpacity>
    </View>
  );
};

export default Vendor;
