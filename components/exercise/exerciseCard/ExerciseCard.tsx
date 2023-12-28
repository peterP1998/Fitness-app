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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [exerciseDetailsVisible, setExerciseDetailsVisible] = useState(false);
  const [numberOfReps, setNumberOfReps] = useState('');
  const [weight, setWeight] = useState('');
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

  useEffect(() => {
    // TODO add validation
  }, [weight, numberOfReps]);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
    setExerciseDetailsVisible(false);
    setWeight('');
    setNumberOfReps('');
  };

  const addSetToExerciseFunc = () => {
    console.log(exercise?.id)
    addSetToExercise(parseInt(numberOfReps), parseInt(weight), exerciseId);
    setDialogVisible(false);
    setWeight('');
    setNumberOfReps('');
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dialogVisible}
        onRequestClose={handleCancel}
        style={styles.modal}
        onDismiss={handleCancel}>
        <TouchableWithoutFeedback
          style={styles.touchableOpacity}
          onPressOut={e => {
            handleCancel();
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textCreateWorkout}>Add set to exercise</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNumberOfReps}
                value={numberOfReps}
                placeholder="Number of reps"
                textAlign="center"
              />
              <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Weight"
                textAlign="center"
              />
              <Pressable style={styles.button} onPress={addSetToExerciseFunc}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={exerciseDetailsVisible}
        onRequestClose={handleCancel}
        style={styles.modal}
        onDismiss={handleCancel}>
        <TouchableWithoutFeedback
          style={styles.touchableOpacity}
          onPressOut={e => {
            handleCancel();
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ExerciseDetails
                exerciseConfigId={exerciseConfigId}
                exerciseId={exerciseId}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable
        onPress={() => {
          setExerciseDetailsVisible(true);
        }}
        style={{alignContent: 'flex-start', padding: 5, flex: 1}}>
        <Text> {exercise?.name} </Text>
      </Pressable>
      <View style={{borderColor: 'black', borderTopWidth: 1, flex: 1}} />
      <View style={{borderColor: 'black', flex: 1, alignContent: 'center'}}>
        <Pressable onPress={showDialog}>
          <Text> Add set to exercise </Text>
        </Pressable>
      </View>
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
  addIcon: {
    alignSelf: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderBottomWidth: 1,
    margin: 20,
  },
  textCreateWorkout: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'white',
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  touchableOpacity: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
});
