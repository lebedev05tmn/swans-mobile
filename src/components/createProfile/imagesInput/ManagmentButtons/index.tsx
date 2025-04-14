import Button from '@/src/shared/ui/Button';
import { Pencil, Plus, Trash2 } from 'lucide-react-native';
import { FC } from 'react';
import { View } from 'react-native';
import styles from './style';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';
import useImagesStore from '@/src/shared/stores/useImagesStore';
import * as ImagePicker from 'expo-image-picker';
import useThrottle from '@/src/shared/hooks/useThrottle';
import { THROTTLE_TIME } from '@/src/shared/config/config';

const ManagmentButtons: FC = () => {
    const { deleteImage, setImage, setErrorMessage, replaceImage } =
        useCreateProfileStore((state) => state.actions);
    const { setCurrentImageIndex } = useImagesStore((state) => state.actions);
    const currentImageIndex = useImagesStore(
        (state) => state.currentImageIndex,
    );
    const imagesCounter = useCreateProfileStore(
        (state) => state.form.images.length,
    );

    const pickImage = async () => {
        setErrorMessage('');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setCurrentImageIndex(imagesCounter);
        }
    };

    const handleDelete = useThrottle(() => {
        deleteImage(currentImageIndex);
        setErrorMessage('');
        setCurrentImageIndex(currentImageIndex - 1);
    }, THROTTLE_TIME);
    const editImage = async () => {
        setErrorMessage('');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            replaceImage(currentImageIndex, result.assets[0].uri);
        }
    };

    return (
        <View style={styles.managmentButtons}>
            <Button style={styles.managmentButton} onPress={handleDelete}>
                <Trash2 color={'#FF4E51'} size={30} />
            </Button>

            <Button style={styles.managmentButton} onPress={pickImage}>
                <Plus color={'#0066FF'} size={34} />
            </Button>

            <Button style={styles.managmentButton} onPress={editImage}>
                <Pencil color={'#FFB303'} size={25} />
            </Button>
        </View>
    );
};

export default ManagmentButtons;
