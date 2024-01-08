import React, {useEffect, useState} from 'react';
import {MuscleGroup} from '../../../model/MuscleGroup';
import {fetchMuscleGroups} from '../../../service/MuscleService';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {MuscleGroupsCategoryCard} from '../muscleCategoryCard/MuscleCategoryCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {PageTitle} from '../../common/pageTitle/PageTitle';

type MuscleGroupsCategoryListProps = {
  workoutId: number;
};
type RootStackParamList = {
  MuscleGroupsCategoryList: {workoutId: string};
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  'MuscleGroupsCategoryList'
>;

type RouteParams = {
  workoutId: number; // Assuming workoutId is a string, adjust the type if necessary
  // Add other parameters if there are any
};
export const MuscleGroupsCategoryList = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute();
  const {workoutId}: RouteParams = route.params as RouteParams;
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const muscleGroups = await fetchMuscleGroups();
        setMuscleGroups(muscleGroups);
      } catch (error) {
        console.error('Error fetching muscle groups:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <SafeAreaView>
      <PageTitle title="Muscle groups" />
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {muscleGroups.map(muscle => {
          return (
            <View
              key={muscle.name}
              style={{flexBasis: '50%', alignSelf: 'center'}}>
              <MuscleGroupsCategoryCard
                muscleName={muscle.name}
                muscleId={muscle.id}
                workoutId={workoutId}
                key={muscle.name}
              />
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};
