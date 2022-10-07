import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const AddTable = ({navigation}) => {
  const [tableNumber, setTableNumber] = useState();
  const [companyId, setCompanyId] = useState();
  const addTable = async () => {
    if (tableNumber != '') {
      const ref = collection(db, 'tableAdminDB');

      const ref2 = collection(db, 'companyProfile');
      const q2 = query(ref2, where('admin', '==', auth.currentUser.uid));
      const receivedData2 = await getDocs(q2);
      receivedData2.forEach(doc => {
        setCompanyId(doc.id);
      });
      console.log(tableNumber)
      const snapshot = await addDoc(ref, {
        admin: auth.currentUser.uid,
        tableNumber: tableNumber,
        companyId: companyId,
      });
      navigation.goBack();
    }
  };
  return (
    <View className="flex-1 bg-white p-5">
      <TouchableOpacity className="flex flex-row">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text className="text-black font-extrabold text-3xl my-auto mx-auto">
          Add Table
        </Text>
      </TouchableOpacity>
      <View className="flex flex-row mt-10">
        <TextInput
          className="flex-1 border border-gray-400 rounded-xl p-3 pl-5"
          placeholder="Table Number: "
          value={tableNumber}
          onChangeText={text => setTableNumber(text)}
        />
      </View>

      <View className="flex flex-row mt-16">
        <TouchableOpacity
          className="bg-black rounded-full flex-1 p-4"
          onPress={addTable}>
          <Text className="text-white text-center tracking-widest">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTable;
