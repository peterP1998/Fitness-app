import {useEffect, useState} from 'react';
import {
  addSetToExercise,
  deleteSetForExercise,
  getSetsForExercise,
} from '../../../service/ExerciseSetService';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {PageTitle} from '../../common/pageTitle/PageTitle';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import { ConfirmationDialog } from '../../common/confirmationDialog/ConfirmationDialog';

type RootStackParamList = {
  ExerciseDetails: {exerciseId: number; exerciseConfigId: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'ExerciseDetails'>;

type RouteParams = {
  exerciseId: number;
  exerciseConfigId: number;
  exerciseName: string;
};

export const ExerciseDetails = () => {
  const route = useRoute();
  const {exerciseId, exerciseConfigId, exerciseName}: RouteParams =
    route.params as RouteParams;
  const [reps, setReps] = useState<ExerciseSet[]>([]);
  const [exercise, setExercise] = useState<ExerciseConfig>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [numberOfReps, setNumberOfReps] = useState('');
  const [weight, setWeight] = useState('');

  async function fetchData() {
    try {
      const reps = await getSetsForExercise(exerciseId);
      setReps(reps);
    } catch (error) {
      console.error('Error fetching reps:', error);
    }
  }


  useEffect(() => {

    fetchData();
  }, [exerciseId]);

  const handleCancel = () => {
    setDialogVisible(false);
    setWeight('');
    setNumberOfReps('');
  };

  const addSetToExerciseFunc = () => {
    console.log(exercise?.id);
    addSetToExercise(parseInt(numberOfReps), parseInt(weight), exerciseId);
    fetchData();
    setDialogVisible(false);
    setWeight('');
    setNumberOfReps('');
  };

  const deleteSet = (id: number) => {
    deleteSetForExercise(id);
    fetchData();
  }
  return (
    <SafeAreaView>
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
      <PageTitle
        title={exerciseName}
        isDeletable={false}
      />
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.headerCell}>Reps</Text>
          <Text style={styles.headerCell}>Weight</Text>
          <Text style={styles.headerCell} />
        </View>
        {reps.map(repetition => (
            <View key={repetition.id}>
            <ConfirmationDialog
            functionToBeFired={deleteSet}
            confirmationText={'Do you want to delete this exercise set'}
            visible={deleteDialogVisible}
            handleCancel={() => {
                setDeleteDialogVisible(false);
            }}
            idOfEntity={repetition.id}
          />
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{repetition.reps}</Text>
            <Text style={styles.tableCell}>{repetition.weight}</Text>
            <View style={styles.tableCellForDeletion}>
            <Pressable onPress={() => setDeleteDialogVisible(true)}>
            <Icon
              name="trash"
              size={20}
              color={'black'}
              style={{alignSelf: 'center'}}
            />
            </Pressable>
            </View>
          </View>
          </View>
        ))}
         <View style={styles.tableRowForAdding}>
            <Pressable onPress={ () => {setDialogVisible(true)}}>
            <IoniIcon name="add" size={20} color={'black'} />
            </Pressable>
         </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
    borderColor: 'black',
    margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'black',
    padding: 5,
    borderBottomWidth: 1,
  },
  tableRowForAdding: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'black',
    padding: 5,
    borderBottomWidth: 1,
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableCellForDeletion: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'flex-end'
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
