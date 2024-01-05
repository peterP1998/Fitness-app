import {SafeAreaView, View, StyleSheet, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WorkoutCard} from './manageWorkout/WorkoutCard';
import {fetchWorkouts} from '../../../service/WorkoutService';
import {fetchExercises} from '../../../service/ExerciseService';
import {Workout} from '../../../model/Workout';
import {PageTitle} from '../../common/pageTitle/PageTitle';

type PreviousWorkoutPageProps = {};

export const PreviousWorkoutsPage: React.FC<
PreviousWorkoutPageProps
> = ({}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const fetchedWorkouts = await fetchWorkouts();
      setWorkouts(fetchedWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <PageTitle title={'Workouts'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, flexDirection: 'column'}}>
        {workouts.map(workout => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            fetchWorkouts={fetchData}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  workoutTitle: {
    margin: 10,
    fontSize: 36,
    color: 'black',
  },
});
