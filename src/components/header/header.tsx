import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setModalVisible(!modalVisible);
    //;(navigation as any).navigate('PreviousWorkoutsPage')
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateToPreviousWorkoutsPage = () => {
    setModalVisible(false);
    (navigation as any).navigate('PreviousWorkoutsPage');
  };
  return (
    <SafeAreaView style={styles.container}>
      <>
        <Pressable style={styles.iconcontainer} onPress={toggleDropdown}>
          <Icon name="list" style={styles.icon} />
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          style={styles.modal}
          onRequestClose={closeModal}
          onDismiss={closeModal}>
          <TouchableWithoutFeedback
            style={styles.touchableOpacity}
            onPressOut={e => {
              closeModal();
            }}>
            <SafeAreaView style={styles.modalView}>
              <View style={styles.modalContent}>
                <Pressable
                  style={styles.buttonContainer}
                  onPress={navigateToPreviousWorkoutsPage}>
                  <Text style={{fontSize: 32}}>Previous Workouts</Text>
                </Pressable>
              </View>
              <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  width: '90%',
                  alignSelf: 'center',
                }}
              />
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </Modal>

        <Text style={styles.text}>Fitness Tracker</Text>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15,
    maxHeight: '5%',
  },
  icon: {
    flex: 1,
    fontSize: 32,
  },
  iconcontainer: {
    flex: 1,
    fontSize: 32,
  },
  text: {
    alignContent: 'center',
    flex: 3,
    fontSize: 25,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 49,
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'baseline',
    backgroundColor: 'white',
    width: '50%',
  },
  modalText: {
    flex: 5,
    fontSize: 32,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    fontSize: 32,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: 'Gray',
  },
  closeIcon: {
    fontSize: 32,
  },
  touchableOpacity: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
});
