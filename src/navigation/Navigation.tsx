import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from '../components/Homepage';
import {PreviousWorkoutsPage} from '../components/workout/previousWorkouts/PreviousWorkoutsPage';
import {ExerciseCreate} from '../components/exercise/exerciseCreate/ExerciseCreate';
import {WorkoutPage} from '../components/workout/workoutPage/WorkoutPage';
import {MuscleGroupsCategoryList} from '../components/muscle/muscleCategoryList/MuscleGroupsCategoryList';
import {ExerciseDetails} from '../components/exercise/exerciseDetails/ExerciseDetails';
import DataPage from '../components/data/DataPage/DataPage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'white'},
        }}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="PreviousWorkoutsPage"
          component={PreviousWorkoutsPage}
        />
        <Stack.Screen name="WorkoutPage" component={WorkoutPage} />
        <Stack.Screen
          name="MuscleGroupsCategoryList"
          component={MuscleGroupsCategoryList}
        />
        <Stack.Screen name="ExerciseCreate" component={ExerciseCreate} />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
        <Stack.Screen name="DataPage" component={DataPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
