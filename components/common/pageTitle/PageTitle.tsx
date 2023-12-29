import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

type PageTitleProps = {
  title: string;
  isDeletable?: boolean;
  deleteFunction?: () => {};
};

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  isDeletable,
  deleteFunction,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center', // Center items vertically
        margin: '3%',
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicon name="arrow-back" size={40} />
      </Pressable>
      <View style={{marginLeft: '5%', width: '65%'}}>
        <Text style={styles.workoutName}>{title}</Text>
      </View>
      {isDeletable && (
        <Pressable
          style={{justifyContent: 'flex-end'}}
          onPress={() => deleteFunction && deleteFunction()}>
          <Icon name="trash" size={30} color={'gray'} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  workoutName: {
    fontSize: 30,
    textAlign: 'center', // Center text horizontally
  },
});
