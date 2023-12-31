import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
type ConfirmationDialogProps = {
  confirmationText: string;
  functionToBeFired: (id: number) => void;
  visible: boolean;
  handleCancel: () => void;
  idOfEntity: number;
};
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  confirmationText,
  functionToBeFired,
  visible,
  handleCancel,
  idOfEntity
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
      style={styles.modal}
      onDismiss={handleCancel}>
      <TouchableWithoutFeedback
        style={styles.touchableOpacity}
        onPressOut={e => {
          handleCancel();
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textCreateWorkout}> {confirmationText} </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable style={styles.button} onPress={() => functionToBeFired(idOfEntity)}>
                <Text style={styles.buttonText}> Yes </Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
    borderColor: 'black',
    margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderBottomWidth: 1,
    margin: 20,
  },
  textCreateWorkout: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 1,
    elevation: 3,
    backgroundColor: 'white',
    borderColor: 'black',
    margin: '1%',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
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
