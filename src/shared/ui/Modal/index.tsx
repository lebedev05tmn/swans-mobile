import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { useModalStore } from '@/src/shared/stores/useModalStore';
import Button from '@/src/shared/ui/Button'; 
import styles from './style';

const ModalComponent: React.FC = () => {
  const { isVisible, modalData, closeModal } = useModalStore();

  if (!isVisible || !modalData) return null;

  const handleOverlayPress = () => {
    if (modalData.closeOnOverlayClick) closeModal();
  };

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {modalData.icon && <View style={styles.icon}>{modalData.icon}</View>}
              {modalData.title && <Text style={styles.title}>{modalData.title}</Text>}
              {modalData.subTitle && <Text style={styles.subTitle}>{modalData.subTitle}</Text>}
              <View style={styles.buttonContainer}>
                {modalData.buttons?.map((btn, idx) => (
                  <Button
                    key={idx}
                    onPress={btn.onPress}
                    style={[styles.button, btn.containerStyle]}
                  >
                    <Text
                      style={[styles.buttonText, btn.textStyle]}
                    >
                      {btn.title}
                    </Text>
                  </Button>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;
