import Point from '@/src/components/ChooseInterests/Point';
import data from './data';
import { StyleSheet, Text, View } from 'react-native';
import type { TData } from './data';
import { Heart } from 'lucide-react-native';
import { MapPin } from 'lucide-react-native';

enum Icons {
    HEART = 'heart',
    PIN = 'pin',
}

const IconsComponents: Record<string, JSX.Element> = {
    [Icons.HEART]: <Heart fill={'#000000'} size={12} />,
    [Icons.PIN]: <MapPin fill={'#000000'} size={12} />,
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        gap: 4,
    },
    pointsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: 6,
        columnGap: 11,
    },
    cardTitle: {
        fontWeight: 600,
        fontFamily: 'MontserratAlternates_600SemiBold',
        color: '#444444',
        fontSize: 12,
        lineHeight: 15,
    },
    content: {
        gap: 10,
    },
});

const content: JSX.Element[] = data.map((item: TData) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.pointsWrap}>
                {item.points.map((point) => {
                    return (
                        <Point>
                            {IconsComponents[point.icon]}
                            <Text>{point.text}</Text>
                        </Point>
                    );
                })}
            </View>
        </View>
    );
});

export const ChooseInterestsContent = () => {
    return (
        <View style={styles.content}>
            {content}
        </View>
    );
};
