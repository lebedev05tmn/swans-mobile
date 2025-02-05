import { View, Image } from 'react-native';
import styles from './style';
import { Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import createProfileStore from '@/src/shared/stores/createProfile/store';
import { TapGestureHandler } from 'react-native-gesture-handler';

const ImageSlider = () => {
    const { setImages } = createProfileStore((state) => state.actions);
    const images = createProfileStore((state) => state.form.images);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImages(result.assets[0].uri);
        }
    };

    return images.length === 0 ? (
        <TapGestureHandler onActivated={pickImage}>
            <View style={styles.container}>
                <Camera size={48} color={'#6D6D6D'} onPress={pickImage} />
            </View>
        </TapGestureHandler>
    ) : (
        <Image source={{ uri: images[0] }} style={styles.image} />
    );
};

export default ImageSlider;
