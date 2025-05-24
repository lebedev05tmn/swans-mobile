import React, { FC } from 'react';
import { Text } from 'react-native';
import styles from './style';

type TTitle = {
    text: string;
};

const Title: FC<TTitle> = ({ text }) => {
    return <Text style={styles.title}>{text}</Text>;
};

export default Title;
