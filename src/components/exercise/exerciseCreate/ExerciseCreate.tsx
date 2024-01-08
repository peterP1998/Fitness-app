import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {fetchExerciseConfigsForMuscleGroup} from '../../../service/ExerciseConfigService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {addExerciseForWorkout} from '../../../service/ExerciseService';
import {SearchBar} from '@rneui/themed';
import {PageTitle} from '../../common/pageTitle/PageTitle';
import {Icon, Button} from '@rneui/themed';
import {exerciseImages} from '../../../../config/ExerciseImagesConfig';

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
  const [searchedConfigs, setSearchedConfigs] = useState<ExerciseConfig[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const exerciseConfigs = await fetchExerciseConfigsForMuscleGroup(
          muscleId,
        );
        setExerciseConfigs(exerciseConfigs);
        setSearchedConfigs(exerciseConfigs);
      } catch (error) {
        console.error('Error fetching exercise configs:', error);
      }
    }

    fetchData();
  }, []);

  const [search, setSearch] = useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
    if (search.trim().length === 0) {
      setSearchedConfigs(exerciseConfigs);
    } else {
      setSearchedConfigs(exerciseConfigs.filter(x => x.name.includes(search)));
    }
  };

  console.log(exerciseConfigs);

  return (
    <SafeAreaView>
      <PageTitle title={'Exercises for muscle groups'} />
      <View style={{width: '90%', alignSelf: 'center'}}>
        <SearchBar
          placeholder="Search for exercise..."
          onChangeText={updateSearch}
          value={search}
          platform={'ios'}
          searchIcon={Platform.OS === 'ios' ? {name: 'search'} : undefined}
          clearIcon={Platform.OS === 'ios' ? {name: 'close-circle'} : undefined}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {searchedConfigs.map(exercise => {
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
                  <Image
                    style={{
                      width: 100,
                      height: 60,
                      alignSelf: 'center',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    source={exerciseImages[exercise?.name ?? 'Bicep Curls']}
                    resizeMode="cover"
                  />
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
    margin: '10%',
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    height: 100,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
