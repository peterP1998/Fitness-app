import React from 'react';
import {View, Text} from 'react-native';
import {PreviousWorkoutLists} from './PreviousWorkoutsList';

export const PreviousWorkoutsPage = () => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <PreviousWorkoutLists />
    </View>
  );
};
