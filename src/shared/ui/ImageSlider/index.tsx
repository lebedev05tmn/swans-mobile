import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import styles from './style';
import useImagesStore from '@stores/useImagesStore';

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

    const imagesLength = useMemo(() => images.length, [images]);

    const handlePress = useCallback(
        (event: any) => {
            const touchX = event.nativeEvent.locationX;
            const isLeftSide = touchX < windowWidth / 2;

            const newIndex = isLeftSide
                ? (currentImageIndex - 1 + imagesLength) % imagesLength
                : (currentImageIndex + 1) % imagesLength;

            setCurrentImageIndex(newIndex);
        },
        [currentImageIndex, imagesLength, setCurrentImageIndex],
    );

    useEffect(() => {
        flatListRef.current?.scrollToIndex({
            index: currentImageIndex,
            animated: true,
        });
    }, [currentImageIndex]);

    const renderItem = useCallback(
        ({ item }: { item: string }) => (
            <Image source={{ uri: item }} style={styles.image} />
        ),
        [],
    );

    const indicatorStyles = useMemo(
        () =>
            images.map((_, index) => [
                styles.indicator,
                {
                    backgroundColor:
                        currentImageIndex === index ? '#FFFFFF' : '#A3A3A3',
                },
            ]),
        [images, currentImageIndex],
    );

    const keyExtractor = useCallback(
        (_: string, index: number) => index.toString(),
        [],
    );

    const memoizedFlatList = useMemo(
        () => (
            <FlatList
                ref={flatListRef}
                data={images}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                getItemLayout={(_, index) => ({
                    length: windowWidth,
                    offset: windowWidth * index,
                    index,
                })}
            />
        ),
        [images, renderItem, keyExtractor],
    );

    const memoizedIndicators = useMemo(
        () => (
            <View style={styles.indicatorContainer}>
                {indicatorStyles.map((style, index) => (
                    <View key={index} style={style} />
                ))}
            </View>
        ),
        [indicatorStyles],
    );

    if (!imagesLength) return null;

    return (
        <View style={styles.container}>
            {imagesLength > 1 && memoizedIndicators}
            <TouchableOpacity
                style={styles.touchableArea}
                activeOpacity={1}
                onPress={handlePress}
            >
                {memoizedFlatList}
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(ImageSlider);
