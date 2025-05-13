import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useModalStore } from '@/src/shared/stores/useModalStore';
import styles from './style';

const ModalComponent: React.FC = () => {
    const { isVisible, modalData, closeModal } = useModalStore();

    if (!isVisible || !modalData) return null;

    const handleOverlayPress = () => {
        if (modalData.closeOnOverlayClick) {
            closeModal();
        }
    };

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="fade"
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={handleOverlayPress}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.container}>
                            {modalData?.title ? (
                                <Text style={styles.text}>{modalData.title}</Text>
                            ) : (
                                <Text style={styles.text}>Модальное окно</Text>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};



export default ModalComponent;