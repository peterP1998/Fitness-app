import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ExerciseCreateCard} from '../exerciseCreateCard/ExerciseCreateCard';
import {fetchExerciseFullInformationForExerciseId} from '../../../service/ExerciseConfigService';
import {useNavigation} from '@react-navigation/native';
import {AddSetToExercise} from '../../sets/SetsCreation/CreateExerciseSet';
import {addSetToExercise} from '../../../service/ExerciseSetService';
import {exerciseImages} from '../../../../config/ExerciseImagesConfig';

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
          exerciseConfigId,
        );
        setExercise(exercise);
      } catch (error) {
        console.error('Error fetching exercise:', error);
      }
    }

    fetchData();
  }, []);

  const exerciseImage = '../../../assets/' + exerciseImages['Push-Ups'];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          (navigation as any).navigate('ExerciseDetails', {
            exerciseConfigId: exerciseConfigId,
            exerciseId: exerciseId,
            exerciseName: exercise?.name,
          });
        }}
        style={{flex: 1}}>
        <Text style={{color: 'white', textAlign: 'center', marginTop: 40}}>
          {exercise?.name}
        </Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          overflow: 'hidden',
          borderTopEndRadius: 10,
          borderBottomEndRadius: 10,
        }}>
        <ImageBackground
          style={{flex: 1}}
          source={exerciseImages[exercise?.name ?? 'Bicep Curls']}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '5%',
    borderWidth: 1,
    height: 100,
    borderRadius: 10,
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#008080',
  },
});
