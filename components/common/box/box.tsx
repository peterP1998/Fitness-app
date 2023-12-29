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
  imageSource: String;
  title: String;
  hide?: boolean;
};

const imageSources = {
  image1: require('../../../assets/fitness-man.jpg'),
  image2: require('../../../assets/create-workout.jpg'),
  // Add more image sources as needed
};
export default function Box(props: BoxPropTypes) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imageSources.image1} style={styles.image}>
        <View style={styles.firstColumn}>
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
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderWidth: 2, // Border width
    borderColor: 'black', // Border color
    borderRadius: 20, // Border radius
    overflow: 'hidden',
  },
  arrow: {
    fontSize: 40,
    color: '#8acbde',
  },
  firstColumn: {
    flex: 2,
    alignContent: 'center',
  },
  text: {
    fontSize: 32,
    padding: 10,
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center', // Align text vertically within Pressable
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  iconcontainer: {
    alignItems: 'center',
  },
  secondColumn: {
    flex: 1,
  },
});
