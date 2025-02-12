import { View, Pressable } from 'react-native';
import styles from './style';
import { Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import useCreateProfileStore from '@/src/shared/stores/createProfile/store';
import ImageSlider from '@/src/shared/ui/ImageSlider';
import ManagmentButtons from './ManagmentButtons';

const ImagesInput = () => {
    const { setImage, setErrorMessage } = useCreateProfileStore(
        (state) => state.actions,
    );
    const images = useCreateProfileStore((state) => state.form.images);

    const pickImage = async () => {
        setErrorMessage('');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
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

export default ImagesInput;
