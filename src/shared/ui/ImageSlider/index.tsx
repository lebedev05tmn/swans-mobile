import React, { useState, useRef } from 'react';
import {
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import styles from './style';

const displayWidth = Dimensions.get('window').width;

type ImageSliderProps = {
    images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handlePress = (event: any) => {
        const touchX = event.nativeEvent.locationX;

        setCurrentIndex((prevIndex) => {
            let newIndex;
            if (touchX < displayWidth / 2) {
                newIndex = prevIndex > 0 ? prevIndex - 1 : images.length - 1;
            } else {
                newIndex = prevIndex < images.length - 1 ? prevIndex + 1 : 0;
            }

            flatListRef.current?.scrollToIndex({
                index: newIndex,
                animated: true,
            });
            return newIndex;
        });
    };

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
                                        currentIndex === index
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
                        length: displayWidth * 0.86,
                        offset: displayWidth * 0.86 * index,
                        index,
                    })}
                />
            </TouchableOpacity>
        </View>
    );
};



export default ImageSlider;
