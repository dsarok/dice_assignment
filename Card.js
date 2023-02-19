import {View, Text, Image} from 'react-native';
import React from 'react';

export default function Card({
  description,
  repo_name,
  imageUrl,
  stars,
  language,
  score
}) {
  return (
    <View
      style={{
        height: 200,
        borderWidth: 3,
        borderRadius: 16,
        marginHorizontal: '2%',
        paddingHorizontal: 25,
        paddingVertical: 13,
        marginBottom: 4,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 0,
          marginBottom: 20,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <Text
          style={{fontWeight: 'bold', fontSize: 20, maxWidth: '70%'}}
          numberOfLines={2}>
          {repo_name}
        </Text>
        <Image
          source={{uri: imageUrl}}
          style={{height: 40, width: 40, borderRadius: 25}}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 17}} numberOfLines={3}>
          {description || 'No Description Provided'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>☆{stars}</Text>
        <Text style={{fontSize: 20}}>lang:{language}</Text>
        <Text style={{fontSize: 20}}>score:{score}</Text>
      </View>
    </View>
  );
}
