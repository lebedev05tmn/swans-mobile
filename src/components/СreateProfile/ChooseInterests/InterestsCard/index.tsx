import { FC, useState, useCallback, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import styles from './style';
import useCreateProfileStore from '@stores/useCreateProfileStore';

type TInterest = {
    label: string;
    icon: LucideIcon;
};

type TInterestCardProps = {
    title: string;
    interests: TInterest[];
    maxSelected?: number;
};

const InterestCard: FC<TInterestCardProps> = ({
    title,
    interests = [],
    maxSelected = interests.length,
}) => {
    const { addInterest, removeInterest } = useCreateProfileStore(
        (state) => state.actions,
    );
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const toggleInterest = useCallback(
        (label: string) => {
            setSelectedInterests((prev) => {
                const isSelected = prev.includes(label);
                if (isSelected) {
                    removeInterest(label);
                    return prev.filter((interest) => interest !== label);
                } else if (prev.length < maxSelected) {
                    addInterest(label);
                    return [...prev, label];
                }
                return prev;
            });
        },
        [maxSelected, removeInterest, addInterest],
    );

    const renderedInterests = useMemo(
        () =>
            interests.map(({ label, icon: Icon }) => {
                const isSelected = selectedInterests.includes(label);
                return (
                    <Pressable
                        key={label}
                        style={({ pressed }) => [
                            styles.interest,
                            isSelected && styles.selectedInterest,
                            pressed && styles.pressedStyle,
                        ]}
                        onPress={() => toggleInterest(label)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isSelected }}
                    >
                        <Icon
                            color={isSelected ? '#fff' : '#000'}
                            size={18}
                            accessible={false}
                        />
                        <Text
                            style={[
                                styles.interestText,
                                isSelected && styles.selectedText,
                            ]}
                            accessibilityLabel={label}
                        >
                            {label}
                        </Text>
                    </Pressable>
                );
            }),
        [interests, selectedInterests, toggleInterest],
    );

    if (!interests || interests.length === 0) {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>{title}</Text>
                <Text>Пока что здесь пусто :D</Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.interestsContainer}>{renderedInterests}</View>
        </View>
    );
};

export default InterestCard;
