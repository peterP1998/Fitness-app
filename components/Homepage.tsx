import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Header from './header/header';
import WorkoutCreate from './workout/create/WorkoutCreate';
import WorkoutContinue from './workout/continue/WorkoutContinue';

export default function HomePage() {
  return (
    <SafeAreaView style={styles.containerView}>
      <Header />
      <WorkoutCreate />
      <WorkoutContinue />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
