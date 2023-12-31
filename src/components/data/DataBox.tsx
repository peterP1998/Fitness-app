import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Box from '../common/box/box';
//const {useRealm, useQuery} = realmContext;
export default function DataBox() {
  const navigation = useNavigation();
  return (
    <Box
      title={'Workouts summaries. Comming soon'}
      imageSource={'data'}
      onPressButton={() => {
        (navigation as any).navigate('DataPage', {});
      }}
      hide={false}
    />
  );
}
