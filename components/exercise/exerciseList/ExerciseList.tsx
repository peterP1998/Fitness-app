import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  fetchExercises,
  fetchExercisesForWorkoutId,
} from '../../../service/ExerciseService'
import { ExerciseCreateCard } from '../exerciseCreateCard/ExerciseCreateCard'
import { WorkoutStatus } from '../../../model/Workout'
import { ExerciseCard } from '../exerciseCard/ExerciseCard'
type ExerciseListProps = {
  workoutId: number
  workoutStatus: WorkoutStatus | undefined
}

export const ExerciseList: React.FC<ExerciseListProps> = ({
  workoutId,
  workoutStatus,
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const exercises = await fetchExercisesForWorkoutId(workoutId)
        setExercises(exercises)
        console.log(exercises)
      } catch (error) {
        console.error('Error fetching workouts:', error)
      }
    }

    fetchData()
  }, [])

  const isWorkoutInProgres = workoutStatus === WorkoutStatus.IN_PROGRESS
  return (
    <View style={styles.container}>
      {exercises.map((exercise) => {
        return <ExerciseCard key={exercise.id} exerciseId={exercise.id} exerciseConfigId={exercise.exercise_config_id}/>
      })}

      {isWorkoutInProgres && <ExerciseCreateCard workoutId={workoutId} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  workoutName: {
    fontSize: 30,
    margin: '3%',
  },
  calendarStyle: {
    margin: '5%',
    flexDirection: 'row',
  },
})
