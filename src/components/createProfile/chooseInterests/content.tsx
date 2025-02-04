import Point from '@/src/components/createProfile/chooseInterests/Point';
import data from '@/src/shared/data/createProfile/interests';
import type { TData } from '@/src/shared/data/createProfile/interests';
import { StyleSheet, Text, View } from 'react-native';
import { Heart } from 'lucide-react-native';
import { MapPin } from 'lucide-react-native';

enum Icons {
    HEART = 'heart',
    PIN = 'pin',
}

const IconsComponents: Record<string, JSX.Element> = {
    [Icons.HEART]: <Heart fill="#000000" size={12} />,
    [Icons.PIN]: <MapPin fill="#000000" size={12} />,
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
        fontWeight: '600',
        fontFamily: 'MontserratAlternates_600SemiBold',
        color: '#444444',
        fontSize: 12,
        lineHeight: 15,
        textAlign: 'center',
    },
    content: {
        gap: 10,
    },
});

const content: JSX.Element[] = data.map((item: TData, cardIndex: number) => {
    return (
        <View key={`card-${cardIndex}`} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.pointsWrap}>
                {item.points.map((point, pointIndex) => {
                    return (
                        <Point key={`point-${pointIndex}`}>
                            {IconsComponents[point.icon]}
                            <Text>{point.text}</Text>
                        </Point>
                    );
                })}
            </View>
        </View>
    );
});

const ChooseInterestsContent = () => {
    return <View style={styles.content}>{content}</View>;
};

export default ChooseInterestsContent;
