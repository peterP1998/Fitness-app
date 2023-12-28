import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {Image} from 'react-native';
import Box from '../../common/box/box';
import {addWorkout, fetchWorkouts} from '../../../service/WorkoutService';
import {useNavigation} from '@react-navigation/native';

type WorkoutCreateProps = {};

const WorkoutCreate: React.FC<WorkoutCreateProps> = ({}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [nameOfWorkout, setNameOfWorkout] = useState('');

  const showDialog = () => setDialogVisible(true);

  const navigation = useNavigation();

  const handleCancel = () => {
    setDialogVisible(false);
    setNameOfWorkout('');
  };

  const createWorkout = async () => {
    const idOfCreatedWorkout = await addWorkout(nameOfWorkout);
    setNameOfWorkout('');
    setDialogVisible(false);
    (navigation as any).navigate('WorkoutPage', {
      workoutId: idOfCreatedWorkout,
    });
  };

  return (
    <>
      <Box
        title={'New Workout'}
        imageSource={'../../../assets/create-workout.jpg'}
        onPressButton={showDialog}
      />
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
              <Text style={styles.textCreateWorkout}>Create workout</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNameOfWorkout}
                value={nameOfWorkout}
                placeholder="Name of workout"
                textAlign="center"
              />
              <Pressable style={styles.button} onPress={createWorkout}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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

export default WorkoutCreate;
