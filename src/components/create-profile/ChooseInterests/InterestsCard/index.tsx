import { FC, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import styles from './style';
import useCreateProfileStore from '@/src/shared/stores/useCreateProfileStore';

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
    interests,
    maxSelected,
}) => {
    const { addInterest, removeInterest } = useCreateProfileStore(
        (state) => state.actions,
    );
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    if (maxSelected === undefined) maxSelected = interests.length;

    const toggleInterest = (label: string) => {
        setSelectedInterests((prev) => {
            if (prev.includes(label)) {
                removeInterest(label);
                return prev.filter((interest) => interest !== label);
            } else if (prev.length < maxSelected) {
                addInterest(label);
                return [...prev, label];
            }
            return prev;
        });
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.interestsContainer}>
                {interests?.map(({ label, icon: Icon }) => {
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
                        >
                            <Icon
                                color={isSelected ? '#fff' : '#000'}
                                size={18}
                            />
                            <Text
                                style={[
                                    styles.interestText,
                                    isSelected && styles.selectedText,
                                ]}
                            >
                                {label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

export default InterestCard;
