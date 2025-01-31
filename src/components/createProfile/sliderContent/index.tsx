import NextButton from '@/src/components/createProfile/nextButton';
import dataCreateProfileContent, {
    TContentComponent,
} from '@/src/shared/data/createProfile/data';
import { View, Text } from 'react-native';
import styles from './style';
import ChooseInterests from '../chooseInterests';

const createProfileBodyComponents: JSX.Element[] = dataCreateProfileContent.map(
    (item: TContentComponent) => {
        return (
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                {item.input}
                {item.countinueButton && <NextButton />}
            </View>
        );
    },
);

createProfileBodyComponents.push(<ChooseInterests />);

export const page = createProfileBodyComponents.length;

export default createProfileBodyComponents;



