import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  fetchExercises,
  fetchExercisesForWorkoutId,
} from '../../../service/ExerciseService';
import {ExerciseCreateCard} from '../exerciseCreateCard/ExerciseCreateCard';
import {WorkoutStatus} from '../../../model/Workout';
import {ExerciseCard} from '../exerciseCard/ExerciseCard';
type ExerciseListProps = {
  workoutId: number;
  workoutStatus: WorkoutStatus | undefined;
};

export const ExerciseList: React.FC<ExerciseListProps> = ({
  workoutId,
  workoutStatus,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const exercises = await fetchExercisesForWorkoutId(workoutId);
        setExercises(exercises);
        console.log(exercises);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    }

    fetchData();
  }, []);

  const isWorkoutInProgress = workoutStatus === WorkoutStatus.IN_PROGRESS;
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {exercises.map((exercise) => {
          return (
            <ExerciseCard
              key={exercise.id}
              exerciseId={exercise.id}
              exerciseConfigId={exercise.exercise_config_id}
            />
          );
        })}
         {isWorkoutInProgress && <ExerciseCreateCard workoutId={workoutId} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: 100,
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
