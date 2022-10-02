import {Text} from 'react-native';
import React from 'react';
interface Props {
  size: number;
}
const CompanyName: React.FC<Props> = ({size}: Props) => {
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
