import NextButton from '@/src/components/createProfile/nextButton';
import dataCreateProfileContent, {
    TContentComponent,
} from '@/src/shared/data/createProfile/data';
import { View, Text, Pressable } from 'react-native';
import styles from './style';
import ChooseInterests from '../chooseInterests';
import { FC } from 'react';
import createProfileStore from '@/src/shared/stores/createProfile/store';

const Slide: FC<TContentComponent> = ({
    title,
    description,
    input,
    countinueButton,
    skipButton,
    textAlign,
}) => {
    const errorMessage = createProfileStore((state) => state.errorMessage);
    const next = createProfileStore((state) => state.actions.next);

    return (
        <View>
            <Text style={[styles.title, textAlign]}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {input}
            {
                <View style={styles.textWrap}>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
            }
            {countinueButton && <NextButton />}
            {skipButton && (
                <Pressable onPress={next}>
                    <Text style={styles.skipButton}>Пропустить</Text>
                </Pressable>
            )}
        </View>
    );
};

const createProfileBodyComponents: JSX.Element[] = [
    ...dataCreateProfileContent.map((item) => (
        <Slide key={item.id} {...item} />
    )),
    <ChooseInterests />,
];

export default createProfileBodyComponents;
