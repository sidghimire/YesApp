import {Text} from 'react-native';
import React from 'react';

const CompanyName = ({size}) => {
  return (
    <Text
      className="text-black tracking-tighter"
      style={{
        fontFamily: 'Kodchasan-SemiBold',
        fontSize: size,
      }}>
      Nyano
    </Text>
  );
};
export default CompanyName;
