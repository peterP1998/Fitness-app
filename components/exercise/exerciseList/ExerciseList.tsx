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
      {isWorkoutInProgress && (
        <View>
          <ExerciseCreateCard workoutId={workoutId} />
          <View
            style={{
              borderColor: 'black',
              borderWidth: 1,
              width: '90%',
              alignSelf: 'center',
            }}
          />
        </View>
      )}
      <View style={styles.container}>
        {exercises.map(exercise => {
          return (
            <ExerciseCard
              key={exercise.id}
              exerciseId={exercise.id}
              exerciseConfigId={exercise.exercise_config_id}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
    paddingBottom: 10,
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
