import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {PreviousWorkoutsPage} from './src/components/workout/previousWorkouts/PreviousWorkoutsPage';
import {connectToDatabase} from './src/database/db';
import {WorkoutPage} from './src/components/workout/workoutPage/WorkoutPage';
import HomePage from './src/components/Homepage';
import {MuscleGroupsCategoryList} from './src/components/muscle/muscleCategoryList/MuscleGroupsCategoryList';
import {ExerciseCreate} from './src/components/exercise/exerciseCreate/ExerciseCreate';
import {ExerciseDetails} from './src/components/exercise/exerciseDetails/ExerciseDetails';
import Navigation from './src/navigation/Navigation';

const Stack = createNativeStackNavigator();
export const db = connectToDatabase();

db.executeSql('PRAGMA foreign_keys = ON');

export default function App() {
  return <Navigation />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
  },
});
