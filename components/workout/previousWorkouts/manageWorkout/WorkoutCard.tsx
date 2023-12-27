import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ViewWeek } from '@mui/icons-material'
import { useNavigation } from '@react-navigation/native'
import { Workout } from '../../../../model/Workout'

type WorkoutCardProps = {
  workout: Workout
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const navigation = useNavigation()

  const navigateToWorkoutPage = async () => {
    ;(navigation as any).navigate('WorkoutPage', { workoutId: workout.id })
  }

  return workout !== null ? (
    <Pressable onPress={navigateToWorkoutPage}>
      <View style={styles.container}>
        <Text style={styles.text}>{workout.name}</Text>
        <View style={{ flexDirection: 'row', paddingLeft: '2%' }}>
          <Icon
            name="rocket"
            size={20}
            color={'black'}
            style={{ flex: 1, alignContent: 'flex-start' }}
          ></Icon>
          <Text
            style={{
              flex: 5,
              alignContent: 'flex-start',
              fontSize: 18,
              color: 'black',
            }}
          >
            {workout.length} minutes
          </Text>
        </View>
      </View>
    </Pressable>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: '2%',
    height: 100,
    margin: '3%',
    alignSelf: 'center',
    width: '90%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#f0f0ff',
    borderColor: 'black',
  },
  text: {
    flex: 1,
    fontSize: 30,
    alignSelf: 'center',
    fontFamily: 'sans-serif',
    color: 'black',
    padding: '2%',
  },
  iconcontainer: {
    alignItems: 'center',
  },
  secondColumn: {
    flex: 1,
  },
})
