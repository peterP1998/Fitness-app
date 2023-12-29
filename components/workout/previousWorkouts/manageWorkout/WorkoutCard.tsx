import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Workout} from '../../../../model/Workout';
import {useNavigation} from '@react-navigation/native';

type WorkoutCardProps = {
  workout: Workout;
};

export const WorkoutCard: React.FC<WorkoutCardProps> = ({workout}) => {
  const navigation = useNavigation();

  const navigateToWorkoutPage = async () => {
    (navigation as any).navigate('WorkoutPage', {workoutId: workout.id});
  };

  const handleFinishClick = () => {
    // Action to be performed when "Finish" is clicked
    console.log('Workout Finished!');
  };

  return workout !== null ? (
    <Pressable onPress={navigateToWorkoutPage}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image
              style={{width: 80, height: 80, borderRadius: 40}}
              source={require('../../../../assets/fitness-man.jpg')}
            />
          </View>
          <View style={styles.textContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.text}>{workout.name}</Text>
              <Pressable style={{}} onPress={handleFinishClick}>
                <Text style={styles.finishButton}>Finish</Text>
              </Pressable>
            </View>
            <Icon name="trash" size={30} color={'black'} />
          </View>
        </View>
        <View style={styles.infoRow}>
          <Icon name="clock-o" size={20} color={'black'} />
          <Text style={styles.infoText}>{workout.length} minutes</Text>
          <Text style={styles.statusText}>{workout.status}</Text>
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
  },
  row: {
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    paddingLeft: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
    paddingBottom: '2%',
    textAlign: 'center',
  },
  finishButton: {
    fontSize: 14,
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3213,
    textAlign: 'center',
    borderColor: 'black',
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    paddingBottom: '1%',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    paddingLeft: '2%',
  },
  statusText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 10,
  },
});
