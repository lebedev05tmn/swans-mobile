import { useRef, useEffect } from 'react';
import {
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import styles from './style';
import useImagesStore from '../../stores/ImagesStore';

const windowWidth = Dimensions.get('window').width * 0.86;

type ImageSliderProps = {
    images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const currentImageIndex = useImagesStore(
        (state) => state.currentImageIndex,
    );
    const { setCurrentImageIndex } = useImagesStore((state) => state.actions);
    const flatListRef = useRef<FlatList>(null);

    const handlePress = (event: any) => {
        const touchX = event.nativeEvent.locationX;

        let newIndex;
        if (touchX < windowWidth / 2) {
            newIndex =
                currentImageIndex > 0
                    ? currentImageIndex - 1
                    : images.length - 1;
        } else {
            newIndex =
                currentImageIndex < images.length - 1
                    ? currentImageIndex + 1
                    : 0;
        }

        setCurrentImageIndex(newIndex);
    };

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: currentImageIndex,
            animated: true,
        });
    }, [currentImageIndex]);

    if (!images || images.length === 0) return null;

    return (
        <View style={styles.container}>
            {images.length > 1 && (
                <View style={styles.indicatorContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                {
                                    backgroundColor:
                                        currentImageIndex === index
                                            ? '#FFFFFF'
                                            : '#A3A3A3',
                                },
                            ]}
                        />
                    ))}
                </View>
            )}

            <TouchableOpacity
                style={styles.touchableArea}
                activeOpacity={1}
                onPress={handlePress}
            >
                <FlatList
                    ref={flatListRef}
                    data={images}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                    getItemLayout={(_, index) => ({
                        length: windowWidth,
                        offset: windowWidth * index,
                        index,
                    })}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ImageSlider;
