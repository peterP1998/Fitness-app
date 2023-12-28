import {useEffect, useState} from 'react';
import {getSetsForExercise} from '../../../service/ExerciseSetService';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type ExerciseDetailsProps = {
  exerciseId: number;
  exerciseConfigId: number;
};

export const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({
  exerciseId,
  exerciseConfigId,
}) => {
  const [reps, setReps] = useState<ExerciseSet[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const reps = await getSetsForExercise(exerciseId);
        setReps(reps);
      } catch (error) {
        console.error('Error fetching reps:', error);
      }
    }

    fetchData();
  }, [exerciseId]);
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.headerCell}>Reps</Text>
        <Text style={styles.headerCell}>Weight</Text>
        <Text style={styles.headerCell}></Text>
      </View>
      {reps.map(repetition => (
        <View key={repetition.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{repetition.reps}</Text>
          <Text style={styles.tableCell}>{repetition.weight}</Text>
          <Icon name="trash" size={20} color={'black'} style={styles.tableCell}/>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    table: {
      flexDirection: 'column',
      borderColor: 'black',
      margin: 10,
      width: 200
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: 'black',
      padding: 5,
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
  });