import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {MuscleGroupsCategoryList} from '../../muscle/muscleCategoryList/MuscleGroupsCategoryList';
import {useNavigation} from '@react-navigation/native';

type ExerciseCreateCardProps = {
  workoutId: number;
};

export const ExerciseCreateCard: React.FC<ExerciseCreateCardProps> = ({
  workoutId,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={{alignItems: 'center'}}
        onPress={() =>
          (navigation as any).navigate('MuscleGroupsCategoryList', {
            workoutId: workoutId,
          })
        }>
        <Icon name="add" size={60} color={'black'} style={styles.addIcon} />
      </Pressable>
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
  },
  addIcon: {
    alignSelf: 'center',
    alignContent: 'center',
  },
  calendarStyle: {
    margin: '5%',
    flexDirection: 'row',
  },
});
