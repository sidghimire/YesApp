import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const VendorSearchSelect = props => {
  const {placeholder, data, updateName, checkExists, reset} = props;
  const [searchText, setSearchText] = useState('');
  const [available, setAvailable] = useState([]);
  const [exist, setExist] = useState();
  const getList = (text, data) => {
    let i;
    let arr = [];
    for (i = 0; i < data.length; i++) {
      let name = data[i][1].name;
      const small = text.toUpperCase();
      const lenSmall = small.length;
      let selected = name.substring(0, lenSmall).toUpperCase();
      if (small.length > selected.length) {
      } else {
        if (selected == small) {
          arr.push(name);
        }
      }
    }
    if (arr.length == 0) {
      setExist(false);
    } else {
      setExist(true);
    }
    setAvailable(arr);
  };
  const manageInput = (text, data) => {
    setSearchText(text);
    getList(text, data);
  };
  const changeReset = () => {
    setSearchText('');
  };

  useEffect(() => {
    updateName(searchText);
    checkExists(exist);
  }, [searchText, checkExists]);
  useEffect(() => {
    changeReset();
  }, [reset]);

  return (
    <View>
      <View className="flex flex-row border border-gray-400 rounded-xl pl-5 ">
        <TextInput
          placeholder={placeholder}
          onChangeText={text => manageInput(text, data)}
          value={searchText}
          className="flex-1"
        />
        <Icon
          name="caret-down-outline"
          color={'#9f9f9f'}
          size={16}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            marginLeft: 'auto',
            marginRight: 13,
          }}
        />
      </View>

      {searchText.length == 0 ? (
        <></>
      ) : (
        <>
          <ScrollView className="h-auto w-full">
            {available.map(text => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSearchText(text);
                    setAvailable([]);
                    updateName(text);
                    setExist(true);
                  }}
                  className="p-5 bg-gray-100 rounded-xl my-2">
                  <Text>{text} </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default VendorSearchSelect;
