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
import Box from '../../common/box/box';
import {
  fetchWorkouts,
  getAllWorkoutsInProgress,
} from '../../../service/WorkoutService';
import {Workout} from '../../../model/Workout';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function WorkoutContinue() {
  const navigation = useNavigation()
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused()
    useEffect(() => {
    async function fetchData() {
      try {
        const fetchedWorkouts = await getAllWorkoutsInProgress();
        setWorkouts(fetchedWorkouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    }

    fetchData();
  }, [isFocused]);

  return workouts.length === 0 ? (
    <Box
      title={'No Workouts In Progress'}
      imageSource={'continueWorkout'}
      onPressButton={() => {}}
      hide={false}
    />
  ) : (
    <Box
      title={'Continue Workout'}
      imageSource={'continueWorkout'}
      onPressButton={() => { (navigation as any).navigate('WorkoutPage',{
        workoutId: workouts[0].id,
      } )}}
      hide={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
    maxHeight: '20%',
    margin: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
