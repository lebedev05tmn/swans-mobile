import React from 'react';
import { Text, View } from 'react-native';
import data from '@/datac.json';
import {
    useEmailAuthStore,
    TEmailAuthStore,
} from '@/src/shared/stores/useEmailAuthStore';
import styles from './style';

const Header: React.FC = () => {
    const currentIndex = useEmailAuthStore(
        (state: TEmailAuthStore) => state.currentIndex,
    );
    const step = data[currentIndex];

    if (!step) {
        return <Text style={styles.error}>Ошибка загрузки шага</Text>;
    }

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.subtitle}>{step.subtitle}</Text>
        </View>
    );
};

export default Header;
