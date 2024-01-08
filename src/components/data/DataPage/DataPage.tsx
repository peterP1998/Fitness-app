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
import DataWorkout from '../DataWorkout/DataWorkout';
import {PageTitle} from '../../common/pageTitle/PageTitle';
//const {useRealm, useQuery} = realmContext;
export default function DataPage() {
  return (
    <SafeAreaView>
      <PageTitle title={'Workout data'} /> 
      <DataWorkout />
    </SafeAreaView>
  );
}
