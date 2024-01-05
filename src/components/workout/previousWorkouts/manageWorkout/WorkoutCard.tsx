import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Workout} from '../../../../model/Workout';
import {useNavigation} from '@react-navigation/native';
import {deleteWorkout, finishWorkout} from '../../../../service/WorkoutService';
import {ConfirmationDialog} from '../../../common/confirmationDialog/ConfirmationDialog';

type WorkoutCardProps = {
  workout: Workout;
  fetchWorkouts: any;
};

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  fetchWorkouts,
}) => {
  const navigation = useNavigation();
  const [dialogDeleteVisible, setDialogDeleteVisible] = useState(false);
  const [finishDialogVisible, setFinishDialogVisible] = useState(false);

  const navigateToWorkoutPage = async () => {
    (navigation as any).navigate('WorkoutPage', {workoutId: workout.id});
  };

  const handleDeleteClick = (workoutId: number) => {
    deleteWorkout(workoutId);
    setDialogDeleteVisible(false);
    fetchWorkouts();
  };

  const handleFinishClick = (workoutId: number) => {
    finishWorkout(workoutId);
    setFinishDialogVisible(false);
    fetchWorkouts();
  };

  const isWorkoutInProgress = workout.status !== 'DONE';

  return workout !== null ? (
    <Pressable onPress={navigateToWorkoutPage}>
      <ConfirmationDialog
        functionToBeFired={handleDeleteClick}
        confirmationText={'Do you want to delete this workout'}
        visible={dialogDeleteVisible}
        handleCancel={() => {
          setDialogDeleteVisible(false);
        }}
        idOfEntity={workout.id}
      />
      <ConfirmationDialog
        functionToBeFired={handleFinishClick}
        confirmationText={'Do you want to finish this workout'}
        visible={finishDialogVisible}
        handleCancel={() => {
          setFinishDialogVisible(false);
        }}
        idOfEntity={workout.id}
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
              source={require('../../../../assets/fitness-man.jpg')}
            />
          </View>
          <View style={styles.textContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                display: 'flex',
              }}>
              <View style={{justifyContent: 'space-between', flex: 5}}>
                <Text style={styles.text}>{workout.name}</Text>
                {isWorkoutInProgress && (
                  <View style={{alignItems: 'center', height: '20%', flex: 1}}>
                    <Pressable
                      style={{
                        backgroundColor: '#a0d2eb',
                        width: '40%',
                        height: '80%',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#a0d2eb',
                      }}
                      onPress={() => {
                        setFinishDialogVisible(true);
                      }}>
                      <Text
                        style={{flex: 1, textAlign: 'center', color: 'white', fontSize: 17, paddingTop: 2}}>
                        Finish
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
              <View style={{marginRight: 4}}>
                <Pressable
                  onPress={() => {
                    setDialogDeleteVisible(true);
                  }}>
                  <Icon name="trash" size={30} color={'black'} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.infoColumn}>
          <View style={{flexDirection: 'row', marginBottom: '2%'}}>
            <Icon name="clock-o" size={20} color={'black'} />
            <Text style={styles.infoText}>{workout.length} minutes</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name={'circle'}
              size={20}
              color={isWorkoutInProgress ? '#a0d2eb' : '#98FB98'}
            />
            <Text style={styles.statusText}>{workout.status}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    padding: '2%',
    margin: '3%',
    alignSelf: 'center',
    width: '90%',
    borderColor: 'black',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    paddingLeft: '2%',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    flex: 1,
    color: 'black',
    paddingBottom: '2%',
    textAlign: 'left',
  },
  finishButton: {
    fontSize: 14,
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderColor: 'black',
    elevation: 3,
  },
  infoColumn: {
    flexDirection: 'column',
    paddingBottom: '1%',
    marginRight: 4,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    paddingLeft: '2%',
  },
  statusText: {
    fontSize: 16,
    paddingLeft: '2%',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
  },
});
