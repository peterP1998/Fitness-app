import React, { useEffect, useState } from 'react'
import { MuscleGroup } from '../../../model/MuscleGroup'
import { fetchMuscleGroups } from '../../../service/MuscleService'
import { View, Text, ScrollView, StyleSheet, Pressable, Modal, TouchableWithoutFeedback } from 'react-native'
import { fetchExerciseConfigsForMuscleGroup } from '../../../service/ExerciseConfigService'
import { useNavigation } from '@react-navigation/native'

type MuscleGroupsCategoryCardProps = {
    muscleId: number,
    workoutId: number,
    muscleName: string
}
export const MuscleGroupsCategoryCard: React.FC<
MuscleGroupsCategoryCardProps
> = ({muscleId, workoutId, muscleName}) => {

  const navigation = useNavigation()

  return (
    <View>
    <Pressable onPress={() => (navigation as any).navigate('ExerciseCreate', { workoutId: workoutId, muscleId: muscleId})}>
    <View style={styles.container}>
        <Text style={styles.text}> {muscleName} </Text>
    </View>
  </Pressable>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        padding: '3%',
        margin: '10%',
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    text: {
        alignSelf: 'center'
    },
  })
  