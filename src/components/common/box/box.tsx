import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {Image} from 'react-native';

type BoxPropTypes = {
  onPressButton: () => void;
  imageSource: string;
  title: string;
  hide?: boolean;
};
type BoxImages = {
  [key in string]: any;
};

const imageSources: BoxImages = {
  data: require('../../../../assets/data.jpeg'),
  workout: require('../../../../assets/fitness-man.jpg'),
  continueWorkout: require('../../../../assets/running-man.jpeg'),
  // Add more image sources as needed
};
export default function Box(props: BoxPropTypes) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={imageSources[props.imageSource]}
        style={styles.image}>
        <View style={styles.content}>
          {!props?.hide && (
            <Pressable
              style={styles.iconcontainer}
              onPress={props.onPressButton}>
              <Text style={styles.text}>{props.title}</Text>
            </Pressable>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: '20%',
    margin: 15,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderWidth: 2, // Border width
    borderColor: 'black', // Border color
    borderRadius: 20, // Border radius
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    padding: 10,
    textAlign: 'center',
    color: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  iconcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
