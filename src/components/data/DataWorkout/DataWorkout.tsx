import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DataWorkoutButton} from './DataWorkoutButton/DataWorkoutButton';
import {useEffect, useState} from 'react';
import {getWorkoutsTimePeriod} from '../../../service/WorkoutService';

export default function DataWorkout() {
  const [numberOfWorkoutsInPeriod, setNumberOfWorkoutsInPeriod] = useState(0);
  const [textToBeDisplayed, setTextToBeDisplayed] = useState('');

  const getWorkoutsInAPeriod = async (
    period: string,
    textToBeDisplayedParam: string,
  ) => {
    try {
      const numberOfWorkoutsInPeriod = await getWorkoutsTimePeriod(period);
      setNumberOfWorkoutsInPeriod(numberOfWorkoutsInPeriod);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
    setTextToBeDisplayed(textToBeDisplayedParam);
  };
  useEffect(() => {
    getWorkoutsInAPeriod('-7 days', 'Workouts in \n the last week');
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          width: '100%',
          height: 150,
        }}>
        <Text style={{fontSize: 30}}>
          {numberOfWorkoutsInPeriod} {textToBeDisplayed}
        </Text>
        <Image
          source={require('../../../../assets/man-train-hard.jpeg')}
          style={{
            width: 150,
            height: 150,
            alignSelf: 'flex-end',
            borderWidth: 1,
            borderRadius: 10,
            marginLeft: 10,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <DataWorkoutButton
          text={'1 week'}
          onPress={() => {
            getWorkoutsInAPeriod('-7 days', 'Workouts in \n the last week');
          }}
        />
        <DataWorkoutButton
          text={'1 month'}
          onPress={() => {
            getWorkoutsInAPeriod(
              '-1 month',
              'Workouts in \n the last \n month',
            );
          }}
        />
        <DataWorkoutButton
          text={'6 months'}
          onPress={() => {
            getWorkoutsInAPeriod(
              '-6 months',
              'Workouts in \n the last six \n months',
            );
          }}
        />
        <DataWorkoutButton
          text={'1 year'}
          onPress={() => {
            getWorkoutsInAPeriod('-1 year', 'Workouts in \n the last year');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    margin: 1,
  },

  buttons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
