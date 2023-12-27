import { View, StyleSheet, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerciseCreateCard } from '../exerciseCreateCard/ExerciseCreateCard'
import { fetchExerciseFullInformationForExerciseId } from '../../../service/ExerciseConfigService'
import { useNavigation } from '@react-navigation/native'

type ExerciseCardProps = {
  exerciseId: number,
  exerciseConfigId: number
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exerciseId, exerciseConfigId }) => {

  const [exercise, setExercise] = useState<ExerciseConfig>()
  const navigation = useNavigation()
  useEffect(() => {
    async function fetchData() {
      try {
        const exercise = await fetchExerciseFullInformationForExerciseId(exerciseId)
        setExercise(exercise)
        console.log(exercise)
      } catch (error) {
        console.error('Error fetching exercise:', error)
      }
    }

    fetchData()
  })
  return (
    <View style={styles.container}>
      <Text style={{alignContent:'flex-start', padding: 5, flex: 1}}> {exercise?.name} </Text>
      <View style={{borderColor: 'black', borderTopWidth: 1, flex: 1}}></View>
      <View style={{borderColor: 'black', flex: 1, alignContent: 'center'}}> 
        <Text> Add set to exercise </Text>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: '3%',
    margin: '5%',
    borderWidth: 1,
    borderRadius: 10,
    flexBasis: '40%',
    height: 100,
    flexDirection: 'column'
  },
  addIcon: {
    alignSelf: 'center',
  },
})
