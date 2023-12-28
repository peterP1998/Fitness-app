import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ParamListBase,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getWorkoutById} from '../../../service/WorkoutService';
import {ExerciseList} from '../../exercise/exerciseList/ExerciseList';
import {Workout, WorkoutStatus} from '../../../model/Workout';

type RootStackParamList = {
  WorkoutPage: {workoutId: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'WorkoutPage'>;

type RouteParams = {
  workoutId: number;
};
export const WorkoutPage = () => {
  const route = useRoute();
  const {workoutId}: RouteParams = route.params as RouteParams;

  const [workout, setWorkout] = useState<Workout>();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedWorkout = await getWorkoutById(workoutId);
        setWorkout(fetchedWorkout);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    }

    fetchData();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.workoutName}> {workout?.name} </Text>
      <View style={styles.calendarStyle}>
        <Icon name="calendar" size={25} color={'black'} />
        <Text style={{fontSize: 20}}> {workout?.startdate} </Text>
      </View>
      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          width: '90%',
          alignSelf: 'center',
        }}
      />
      <ExerciseList workoutId={workoutId} workoutStatus={workout?.status} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  workoutName: {
    fontSize: 30,
    margin: '3%',
  },
  calendarStyle: {
    margin: '5%',
    flexDirection: 'row',
  },
});
