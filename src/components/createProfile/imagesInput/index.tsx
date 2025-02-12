import { View, Pressable } from 'react-native';
import styles from './style';
import { Camera, Pencil, Plus } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import createProfileStore from '@/src/shared/stores/createProfile/store';
import ImageSlider from '@/src/shared/ui/ImageSlider';
import Button from '@/src/shared/ui/Button';
import { Trash2 } from 'lucide-react-native';
import { FC } from 'react';

const ImagesInput = () => {
    const { setImages, setErrorMessage } = createProfileStore(
        (state) => state.actions,
    );
    const images = createProfileStore((state) => state.form.images);

    const pickImage = async () => {
        setErrorMessage('');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImages(result.assets[0].uri);
        }
    };

    return images.length === 0 ? (
        <Pressable onPress={pickImage}>
            <View style={styles.container}>
                <Camera size={48} color={'#6D6D6D'} onPress={pickImage} />
            </View>
        </Pressable>
    ) : (
        <View style={styles.container}>
            <ImageSlider images={images} />
            <ManagmentButtons pickImage={pickImage} />
        </View>
    );
};

type TManagmentButtons = { pickImage: () => void };

const ManagmentButtons: FC<TManagmentButtons> = ({pickImage}) => {
    return (
        <View style={styles.managmentButtons}>
            <Button style={styles.managmentButton}>
                <Trash2 color={'#FF4E51'} size={30} />
            </Button>

            <Button style={styles.managmentButton} onPress={pickImage}>
                <Plus color={'#0066FF'} size={34} />
            </Button>

            <Button style={styles.managmentButton}>
                <Pencil color={'#FFB303'} size={25} />
            </Button>
        </View>
    );
};

export default ImagesInput;
