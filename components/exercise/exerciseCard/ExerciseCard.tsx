import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ExerciseCreateCard} from '../exerciseCreateCard/ExerciseCreateCard';
import {fetchExerciseFullInformationForExerciseId} from '../../../service/ExerciseConfigService';
import {useNavigation} from '@react-navigation/native';
import {AddSetToExercise} from '../../sets/SetsCreation/CreateExerciseSet';
import {addSetToExercise} from '../../../service/ExerciseSetService';
import {ExerciseDetails} from '../exerciseDetails/ExerciseDetails';

type ExerciseCardProps = {
  exerciseId: number;
  exerciseConfigId: number;
};

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exerciseId,
  exerciseConfigId,
}) => {
  const [exercise, setExercise] = useState<ExerciseConfig>();
  const navigation = useNavigation();
  useEffect(() => {
    async function fetchData() {
      try {
        const exercise = await fetchExerciseFullInformationForExerciseId(
          exerciseId,
        );
        setExercise(exercise);
      } catch (error) {
        console.error('Error fetching exercise:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          (navigation as any).navigate('ExerciseDetails', {
            exerciseConfigId: exerciseConfigId,
            exerciseId: exerciseId,
          });
        }}
        style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text> {exercise?.name} </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '3%',
    margin: '5%',
    borderWidth: 1,
    borderRadius: 10,
    flexBasis: '40%',
    height: 100,
    flexDirection: 'column',
  },
});
