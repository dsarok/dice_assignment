import {View, Text} from 'react-native';
import React from 'react';

export default function Chips({category,backgroundColor}) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 7,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:2,
        flexWrap:'wrap',
        marginHorizontal:4,
        marginBottom:2,
        backgroundColor:backgroundColor
      }}>
      <Text style={{fontWeight: 'bold'}}>{category}</Text>
    </View>
  );
}
