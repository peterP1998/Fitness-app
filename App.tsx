import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { PreviousWorkoutsPage } from './components/workout/previousWorkouts/PreviousWorkoutsPage'
import { connectToDatabase } from './database/db'
import { WorkoutPage } from './components/workout/workoutPage/WorkoutPage'
import HomePage from './components/Homepage'
import { MuscleGroupsCategoryList } from './components/muscle/muscleCategoryList/MuscleGroupsCategoryList'
import { ExerciseCreate } from './components/exercise/exerciseCreate/ExerciseCreate'

const Stack = createNativeStackNavigator()
export const db = connectToDatabase()
export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="PreviousWorkoutsPage"
          component={PreviousWorkoutsPage}
        />
        <Stack.Screen name="WorkoutPage" component={WorkoutPage} />
        <Stack.Screen name="MuscleGroupsCategoryList" component={MuscleGroupsCategoryList} />
        <Stack.Screen name="ExerciseCreate" component={ExerciseCreate} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
  },
})
