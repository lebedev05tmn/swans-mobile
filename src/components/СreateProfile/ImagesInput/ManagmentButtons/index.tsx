import Button from '@shared/ui/Button';
import { Pencil, Plus, Trash2 } from 'lucide-react-native';
import { FC } from 'react';
import { View } from 'react-native';
import styles from './style';
import useCreateProfileStore from '@stores/useCreateProfileStore';
import useImagesStore from '@stores/useImagesStore';
import { launchImageLibrary } from 'react-native-image-picker';

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

        let result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (
            !result.didCancel &&
            Array.isArray(result.assets) &&
            result.assets.length > 0
        ) {
            setImage(result.assets[0].uri!);
            setCurrentImageIndex(imagesCounter);
        }
    };

    const editImage = async () => {
        setErrorMessage('');

        let result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });

        if (
            !result.didCancel &&
            Array.isArray(result.assets) &&
            result.assets.length > 0
        ) {
            setImage(result.assets[0].uri!);
        }
    };

    const handlePress = () => {
        deleteImage(currentImageIndex);
        setErrorMessage('');
        setCurrentImageIndex(currentImageIndex - 1);
    };

    return (
        <View style={styles.managmentButtons}>
            <Button
                style={styles.managmentButton}
                onPress={handlePress}
            >
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
