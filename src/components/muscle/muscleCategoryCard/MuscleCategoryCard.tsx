import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Body, {BodyPart} from 'react-native-body-highlighter'; // Wrapping Body component in the import block

type MuscleGroupsCategoryCardProps = {
  muscleId: number;
  workoutId: number;
  muscleName: string;
};

export const MuscleGroupsCategoryCard: React.FC<
  MuscleGroupsCategoryCardProps
> = ({muscleId, workoutId, muscleName}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        (navigation as any).navigate('ExerciseCreate', {
          workoutId: workoutId,
          muscleId: muscleId,
        })
      }>
      <View style={styles.container}>
        <Image
          style={styles.imageBackground}
          source={imageMuscleGroupMap[muscleName]}
        />
        <Text style={styles.text}> {muscleName} </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    padding: '3%',
    margin: '5%',
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    height: 100, // Increased height to accommodate text below the image
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center', // Align items in the center
  },
  imageBackground: {
    width: '100%',
    height: '80%', // Adjust the image height as needed
    resizeMode: 'cover',
  },
  text: {
    marginTop: 'auto', // Push the text to the bottom
    textAlign: 'center',
  },
});

type MuscleGroupImages = {
  [key in string]: any;
};

const imageMuscleGroupMap: MuscleGroupImages = {
  SHOULDERS: require('../../../../assets/muscle-groups/shoulder.png'),
  CHEST: require('../../../../assets/muscle-groups/chest.png'),
  TRICEPS: require('../../../../assets/muscle-groups/biceps.png'), // FIX ME TODO
  CORE: require('../../../../assets/muscle-groups/core.png'),
  BACK: require('../../../../assets/muscle-groups/back.png'),
  LEGS: require('../../../../assets/muscle-groups/legs.png'),
  CALVES: require('../../../../assets/muscle-groups/calves.png'),
  BICEPS: require('../../../../assets/muscle-groups/biceps.png'),
};
