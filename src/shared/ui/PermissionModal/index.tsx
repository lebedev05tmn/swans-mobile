import { Linking, Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

const PermissionModal = () => {
    const openSettings = () => {
        Linking.openSettings();
    };

    return (
        <Modal
            transparent={false}
            animationType="fade"
            onRequestClose={() => {}}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.title}>ребуется доступ к геолокации</Text>
                <Text style={styles.message}>
                    Для работы приложения необходимо разрешение на доступ к
                    вашей геолокации. Без этого функционал будет ограничен.
                </Text>

                <TouchableOpacity style={styles.button} onPress={openSettings}>
                    <Text style={styles.buttonText}>
                        Разрешить в настройках
                    </Text>
                </TouchableOpacity>

                <Text style={styles.hint}>
                    После предоставления доступа перезапустите приложение.
                </Text>
            </View>
        </Modal>
    );
};

export default PermissionModal;
