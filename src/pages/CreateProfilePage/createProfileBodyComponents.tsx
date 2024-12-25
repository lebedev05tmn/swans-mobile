import AboutTextInput from '@/src/components/createProfilePage/aboutTextInput';
import ButtonChoice from '@/src/components/createProfilePage/choiceButton';
import CountinueButton from '@/src/components/createProfilePage/nextButton';
import DateInput from '@/src/components/createProfilePage/dateInput';
import NameInput from '@/src/components/createProfilePage/nameInput';
import PlaceInput from '@/src/components/createProfilePage/placeInput';
import { StyleSheet, View, Text } from 'react-native';

type TContentComponent = {
    title: string;
    description: string;
    input: JSX.Element;
    countinueButton: boolean;
};

const dataCreateProfileContent: TContentComponent[] = [
    {
        title: 'Привет, давай знакомиться',
        description: 'Будь собой при выборе имени, привлекает больше внимания.',
        input: <NameInput />,
        countinueButton: true,
    },
    {
        title: 'Где живем, там и ищем',
        description: 'Выбери свой город, чтобы найти ближайщих соулмейтов',
        input: <PlaceInput />,
        countinueButton: true,
    },
    {
        title: 'Выбери дату рождения',
        description: 'Используй настояющую, ее потом поменять нельзя',
        input: <DateInput />,
        countinueButton: true,
    },
    {
        title: 'Стань солцем среди планет',
        description: 'Сделай свой "слоган", который выделит тебя среди всех',
        input: <AboutTextInput />,
        countinueButton: true,
    },
    {
        title: 'Последний этап регистрации',
        description: 'Выберите пол',
        input: <ButtonChoice />,
        countinueButton: false,
    },
];

const styles = StyleSheet.create({
    title: {
        fontFamily: 'MontserratAlternates_700Bold',
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 34,
        color: '#FFFFFF',
        marginBottom: 14,
    },
    description: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 22,
        color: '#FFFFFF',
        marginBottom: 12,
    },
});

const createProfileBodyComponents: JSX.Element[] = dataCreateProfileContent.map(
    (item: TContentComponent) => {
        return (
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                {item.input}
                {item.countinueButton && <CountinueButton />}
            </View>
        );
    },
);

export default createProfileBodyComponents;
