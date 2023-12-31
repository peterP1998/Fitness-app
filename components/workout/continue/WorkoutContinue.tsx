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
//const {useRealm, useQuery} = realmContext;
export default function WorkoutContinue() {
  //const workouts = useQuery(Workout)
  //console.log(workouts)
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
  console.log(workouts.length);
  return workouts.length === 0 ? (
    <Box
      title={'No Workouts In Progress'}
      imageSource={'../../../assets/create-workout.jpg'}
      onPressButton={() => {}}
      hide={false}
    />
  ) : (
    <Box
      title={'Continue Workout'}
      imageSource={'../../../assets/create-workout.jpg'}
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
