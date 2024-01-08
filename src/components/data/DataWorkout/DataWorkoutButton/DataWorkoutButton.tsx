import {Pressable, StyleSheet, Text, View} from 'react-native';

type DataWorkoutButtonProps = {
  text: string;
  onPress: () => void;
};

export const DataWorkoutButton: React.FC<DataWorkoutButtonProps> = ({
  text,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text> {text} </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});
