import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {fetchExerciseConfigsForMuscleGroup} from '../../../service/ExerciseConfigService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {addExerciseForWorkout} from '../../../service/ExerciseService';

type ExerciseCreateProps = {
  workoutId: number;
  muscleId: number;
};
type RootStackParamList = {
  ExerciseCreate: {workoutId: string; muscleId: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'ExerciseCreate'>;

type RouteParams = {
  workoutId: number;
  muscleId: number; // Assuming workoutId is a string, adjust the type if necessary
  // Add other parameters if there are any
};
export const ExerciseCreate = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute();
  const {workoutId, muscleId}: RouteParams = route.params as RouteParams;

  const [exerciseConfigs, setExerciseConfigs] = useState<ExerciseConfig[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const exerciseConfigs = await fetchExerciseConfigsForMuscleGroup(
          muscleId,
        );
        setExerciseConfigs(exerciseConfigs);
      } catch (error) {
        console.error('Error fetching exercise configs:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {exerciseConfigs.map(exercise => {
          return (
            <View key={exercise.id}>
              <Pressable
                onPress={() => {
                  addExerciseForWorkout(workoutId, exercise.id);
                  (navigation as any).navigate('WorkoutPage', {
                    workoutId: workoutId,
                  });
                }}>
                <View style={styles.container}>
                  <Text style={styles.text}> {exercise.name} </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

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
    alignSelf: 'center',
  },
});
